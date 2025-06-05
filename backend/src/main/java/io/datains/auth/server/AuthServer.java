package io.datains.auth.server;

import cn.hutool.core.bean.BeanUtil;
import io.datains.auth.api.AuthApi;
import io.datains.auth.api.dto.CurrentRoleDto;
import io.datains.auth.api.dto.CurrentUserDto;
import io.datains.auth.api.dto.LoginDto;
import io.datains.auth.config.RsaProperties;
import io.datains.auth.entity.SysUserEntity;
import io.datains.auth.entity.TokenInfo;
import io.datains.auth.service.AuthUserService;
import io.datains.auth.util.JWTUtils;
import io.datains.auth.util.RedisService;
import io.datains.auth.util.RsaUtil;
import io.datains.auth.util.UserKey;
import io.datains.commons.utils.*;
import io.datains.controller.sys.request.SysUserCreateRequest;
import io.datains.exception.DataInsException;
import io.datains.i18n.Translator;
import io.datains.plugins.config.SpringContextUtil;
import io.datains.plugins.util.PluginUtils;
import io.datains.plugins.xpack.oidc.service.OidcXpackService;
import io.datains.qyy.service.CertificationService;
import io.datains.service.sys.SysUserService;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AuthServer implements AuthApi {

    @Value("${datains.init_password:DataIns123..}")
    private String DEFAULT_PWD;

    @Autowired
    private AuthUserService authUserService;

    @Autowired
    private SysUserService sysUserService;

    @Resource
    private RedisService redisService;

    @Resource
    private CertificationService certificationService;

    @Override
    public Object login(@RequestBody LoginDto loginDto) throws Exception {
        String key = RsaUtil.decryptByPrivateKey(RsaProperties.privateKey, loginDto.getUsername());
        String pwd = RsaUtil.decryptByPrivateKey(RsaProperties.privateKey, loginDto.getPassword());
        Integer loginType = loginDto.getLoginType();

        SysUserEntity user = authUserService.getUserByNameOrPhone(key);

        if (ObjectUtils.isEmpty(user)) {
            DataInsException.throwException(Translator.get("i18n_id_or_pwd_error"));
        }
        // 验证登录类型是否与用户类型相同
        if (!sysUserService.validateLoginType(user.getFrom(), loginType)) {
            DataInsException.throwException(Translator.get("i18n_id_or_pwd_error"));
        }

        if (user.getEnabled() == 0) {
            DataInsException.throwException("账号已被锁定,请联系管理员");
            //DataInsException.throwException(Translator.get("i18n_id_or_pwd_error"));
        }
        String realPwd = user.getPassword();
        // 私钥解密
        // md5加密
        pwd = CodingUtil.md5(pwd);
        if (!StringUtils.equals(pwd, realPwd)) {
            DataInsException.throwException(Translator.get("i18n_id_or_pwd_error"));
        }
        Map<String, Object> result = new HashMap<>();
        TokenInfo tokenInfo = TokenInfo.builder().userId(user.getUserId()).username(user.getUsername()).build();
        String token = JWTUtils.sign(tokenInfo, realPwd);
        // 记录token操作时间
        result.put("token", token);
        ServletUtils.setToken(token);
        authUserService.clearCache(user.getUserId());
        String s = redisService.get(UserKey.getById, "datains_" + user.getUserId().toString());
        if (StringUtils.isEmpty(s)) {
            boolean set = redisService.set(UserKey.getById, "datains_" + user.getUserId().toString(), token);
            System.err.println(set);
        }
        return result;
    }

    @Override
    public Object qyyLogin(String qyyToken) throws Exception {
        if (StringUtils.isEmpty(qyyToken)) {
            DataInsException.throwException("token不能为空");
        }
        //先去获取用户信息
        CertificationService.QyyUser qyyUser = certificationService.certification(qyyToken);
        String username = null;
        if (qyyUser.getSysRoleScenarios().getKey().equals("1")) {
            //超级管理员特殊处理
            username = "admin";
        }
        //判断账号
        qyyAutoCreateUser(qyyUser);
        //登录用户
        username = username == null ? "q_" + qyyUser.getId() : username;
        SysUserEntity user = authUserService.getUserByName(username);
        if (ObjectUtils.isEmpty(user)) {
            DataInsException.throwException("用户不存在");
        }
        String realPwd = user.getPassword();
        Map<String, Object> result = new HashMap<>();
        TokenInfo tokenInfo = TokenInfo.builder().userId(user.getUserId()).username(username).build();
        String token = JWTUtils.sign(tokenInfo, realPwd);
        // 记录token操作时间
        result.put("token", token);
        ServletUtils.setToken(token);
        authUserService.clearCache(user.getUserId());
        String s = redisService.get(UserKey.getById, "datains_" + user.getUserId().toString());
        if (StringUtils.isEmpty(s)) {
            boolean set = redisService.set2(UserKey.getById, "datains_" + user.getUserId().toString(), token);
        }
        return result;
    }

    private void qyyAutoCreateUser(CertificationService.QyyUser qyyUser) {
        String username = "q_" + qyyUser.getId();
        SysUserEntity user = authUserService.getUserByName(username);
        if (user != null) {
            //已有账号，更新账号信息
            SysUserCreateRequest request = new SysUserCreateRequest();
            BeanUtil.copyProperties(user, request);
            request.setRoleIds(Collections.singletonList(Long.valueOf(qyyUser.getSysRoleScenarios().getKey())));
            request.setNickName(qyyUser.getName());
            sysUserService.update(request);
            return;
        }
        //没有账号，开始创建
        SysUserCreateRequest request = new SysUserCreateRequest();
        request.setUsername("q_" + qyyUser.getId());
        request.setNickName(qyyUser.getName());
        request.setRoleIds(Collections.singletonList(Long.valueOf(qyyUser.getSysRoleScenarios().getKey())));
        request.setEnabled(1L);
        sysUserService.save(request);
    }

    public static void main(String[] args) {
        String s = CodingUtil.md5("123456");
        System.err.println(s);
    }

    @Override
    public CurrentUserDto userInfo() {
        CurrentUserDto userDto = (CurrentUserDto) SecurityUtils.getSubject().getPrincipal();
        if (ObjectUtils.isEmpty(userDto)) {
            String token = ServletUtils.getToken();
            Long userId = JWTUtils.tokenInfoByToken(token).getUserId();
            SysUserEntity user = authUserService.getUserById(userId);
            CurrentUserDto currentUserDto = BeanUtils.copyBean(new CurrentUserDto(), user);
            List<CurrentRoleDto> currentRoleDtos = authUserService.roleInfos(user.getUserId());
            List<String> permissions = authUserService.permissions(user.getUserId());
            currentUserDto.setRoles(currentRoleDtos);
            currentUserDto.setPermissions(permissions);
            return currentUserDto;
        }
        return userDto;
    }

    @Override
    public Boolean useInitPwd() {
        CurrentUserDto user = AuthUtils.getUser();
        if (null == user || 0 != user.getFrom()) {
            return false;
        }
        String md5 = CodingUtil.md5(DEFAULT_PWD);
        //return StringUtils.equals(AuthUtils.getUser().getPassword(), md5);
        return false;
    }

    @Override
    public String logout() {
        String token = ServletUtils.getToken();
        Long userId = null;
        if (isOpenOidc()) {
            HttpServletRequest request = ServletUtils.request();
            String idToken = request.getHeader("IdToken");
            if (StringUtils.isNotBlank(idToken)) {
                OidcXpackService oidcXpackService = SpringContextUtil.getBean(OidcXpackService.class);
                oidcXpackService.logout(idToken);
            }

        }
        if (StringUtils.isEmpty(token) || StringUtils.equals("null", token) || StringUtils.equals("undefined", token)) {
            return "success";
        }
        try {
            userId = JWTUtils.tokenInfoByToken(token).getUserId();
            authUserService.clearCache(userId);
        } catch (Exception e) {
            LogUtil.error(e);
            return "fail";
        }
        // CurrentUserDto user = AuthUtils.getUser();
        boolean set = redisService.delete(UserKey.getById, "datains_" + userId.toString());

        System.err.println("token注销" + set);
        return "success";
    }

    @Override
    public Boolean validateName(@RequestBody Map<String, String> nameDto) {
        String userName = nameDto.get("userName");
        if (StringUtils.isEmpty(userName))
            return false;
        SysUserEntity userEntity = authUserService.getUserByName(userName);
        return !ObjectUtils.isEmpty(userEntity);
    }

    @Override
    public boolean isOpenLdap() {
        Boolean licValid = PluginUtils.licValid();
        if (!licValid)
            return false;
        return authUserService.supportLdap();
    }

    @Override
    public boolean isOpenOidc() {
        Boolean licValid = PluginUtils.licValid();
        if (!licValid)
            return false;
        return authUserService.supportOidc();
    }

    @Override
    public boolean isPluginLoaded() {
        /*Boolean licValid = PluginUtils.licValid();
        if (!licValid)
            return false;
        return authUserService.pluginLoaded();*/

        //
      /*  System.err.println(PluginUtils.licValid());
      return PluginUtils.licValid();*/
        return true;
    }

    @Override
    public String getPublicKey() {
        return RsaProperties.publicKey;
    }

}
