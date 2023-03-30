package io.datains.auth.server;

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
import io.datains.controller.sys.request.LdapAddRequest;
import io.datains.exception.DataInsException;
import io.datains.i18n.Translator;
import io.datains.plugins.common.entity.XpackLdapUserEntity;
import io.datains.plugins.config.SpringContextUtil;
import io.datains.plugins.util.PluginUtils;
import io.datains.plugins.xpack.ldap.dto.request.LdapValidateRequest;
import io.datains.plugins.xpack.ldap.dto.response.ValidateResult;
import io.datains.plugins.xpack.ldap.service.LdapXpackService;
import io.datains.plugins.xpack.oidc.service.OidcXpackService;
import io.datains.service.sys.SysUserService;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static cn.hutool.crypto.CipherMode.encrypt;

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

    int i = 0;
    Integer userId = null;

    @Override
    public Object login(@RequestBody LoginDto loginDto) throws Exception {
        String username = RsaUtil.decryptByPrivateKey(RsaProperties.privateKey, loginDto.getUsername());
        String pwd = RsaUtil.decryptByPrivateKey(RsaProperties.privateKey, loginDto.getPassword());

        // 增加ldap登录方式
        Integer loginType = loginDto.getLoginType();
        boolean isSupportLdap = authUserService.supportLdap();
        if (loginType == 1 && isSupportLdap) {
            LdapXpackService ldapXpackService = SpringContextUtil.getBean(LdapXpackService.class);
            LdapValidateRequest request = LdapValidateRequest.builder().userName(username).password(pwd).build();
            ValidateResult<XpackLdapUserEntity> validateResult = ldapXpackService.login(request);
            if (!validateResult.isSuccess()) {
                DataInsException.throwException(validateResult.getMsg());
            }
            XpackLdapUserEntity ldapUserEntity = validateResult.getData();
            SysUserEntity user = authUserService.getLdapUserByName(username);
            if (ObjectUtils.isEmpty(user) || ObjectUtils.isEmpty(user.getUserId())) {
                LdapAddRequest ldapAddRequest = new LdapAddRequest();
                ldapAddRequest.setUsers(new ArrayList<XpackLdapUserEntity>() {
                    {
                        add(ldapUserEntity);
                    }
                });
                ldapAddRequest.setEnabled(1L);
                ldapAddRequest.setRoleIds(new ArrayList<Long>() {
                    {
                        add(2L);
                    }
                });
                sysUserService.validateExistUser(ldapUserEntity.getUsername(), ldapUserEntity.getNickname(),
                        ldapUserEntity.getEmail());
                sysUserService.saveLdapUsers(ldapAddRequest);
            }

            username = validateResult.getData().getUsername();
        }
        // 增加ldap登录方式

        SysUserEntity user = authUserService.getUserByName(username);

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

        // 普通登录需要验证密码
        if (loginType == 0 || !isSupportLdap) {
            // 私钥解密

            // md5加密
            pwd = CodingUtil.md5(pwd);

            if (!StringUtils.equals(pwd, realPwd)) {
                if (i == 0){
                    userId = user.getUserId().intValue();
                }
                if (user.getUserId().intValue()!=userId){
                    userId = user.getUserId().intValue();
                    i = 0;
                }
                i++;
                if (i==5){
                    authUserService.updateEnabled(user.getUserId().intValue());
                }
                DataInsException.throwException(Translator.get("i18n_id_or_pwd_error"));
            }
        }
        i = 0;
        Map<String, Object> result = new HashMap<>();
        TokenInfo tokenInfo = TokenInfo.builder().userId(user.getUserId()).username(username).build();
        String token = JWTUtils.sign(tokenInfo, realPwd);
        // 记录token操作时间
        result.put("token", token);
        ServletUtils.setToken(token);
        authUserService.clearCache(user.getUserId());
        String s = redisService.get(UserKey.getById, "datains_"+user.getUserId().toString());
        if (StringUtils.isEmpty(s)){
            boolean set = redisService.set(UserKey.getById, "datains_"+user.getUserId().toString(), token);
            System.err.println(set);
        }
        return result;
    }

    /*public static void main(String[] args) {
        String s = CodingUtil.md5("123456");
        System.err.println(s);
    }*/

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
        return StringUtils.equals(AuthUtils.getUser().getPassword(), md5);
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
        boolean set = redisService.delete(UserKey.getById, "datains_"+userId.toString());

        System.err.println("token注销"+set);
        return "success";
    }

    public static String decryptParam(String text) throws Exception {
        return RsaUtil.decryptByPrivateKey("MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA0vfvyTdGJkdbHkB8mp0f3FE0GYP3AYPaJF7jUd1M0XxFSE2ceK3k2kw20YvQ09NJKk+OMjWQl9WitG9pB6tSCQIDAQABAkA2SimBrWC2/wvauBuYqjCFwLvYiRYqZKThUS3MZlebXJiLB+Ue/gUifAAKIg1avttUZsHBHrop4qfJCwAI0+YRAiEA+W3NK/RaXtnRqmoUUkb59zsZUBLpvZgQPfj1MhyHDz0CIQDYhsAhPJ3mgS64NbUZmGWuuNKp5coY2GIj/zYDMJp6vQIgUueLFXv/eZ1ekgz2Oi67MNCk5jeTF2BurZqNLR3MSmUCIFT3Q6uHMtsB9Eha4u7hS31tj1UWE+D+ADzp59MGnoftAiBeHT7gDMuqeJHPL4b+kC+gzV4FGTfhR9q3tTbklZkD2A==", text);
    }

    public static void main(String[] args) throws Exception {
        System.err.println(decryptParam("prYyIJ81OqNhzVqzcs1M4fLUg2cqT%2BUkSv4iIVz6R0MZXyx7vR0Mfa2UxtNDfesmrakUW%2BjqosB%2FelV0FQOOeA"));
       // System.err.println(JWTUtils.tokenInfoByToken("prYyIJ81OqNhzVqzcs1M4fLUg2cqT%2BUkSv4iIVz6R0MZXyx7vR0Mfa2UxtNDfesmrakUW%2BjqosB%2FelV0FQOOeA").getUserId());
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
        Boolean licValid = PluginUtils.licValid();
        if (!licValid)
            return false;
        return authUserService.pluginLoaded();
    }

    @Override
    public String getPublicKey() {
        return RsaProperties.publicKey;
    }

}
