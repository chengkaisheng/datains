package io.datains.controller.sys;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.xiaoymin.knife4j.annotations.ApiSupport;
import io.datains.auth.api.dto.CurrentUserDto;
import io.datains.auth.entity.SysUserEntity;
import io.datains.auth.entity.TokenInfo;
import io.datains.auth.service.AuthUserService;
import io.datains.auth.util.JWTUtils;
import io.datains.auth.util.RedisService;
import io.datains.auth.util.UserKey;
import io.datains.base.domain.SysRole;
import io.datains.base.domain.SysUser;
import io.datains.base.mapper.SysUserMapper;
import io.datains.commons.utils.*;
import io.datains.controller.response.ExistLdapUser;
import io.datains.controller.sys.base.BaseGridRequest;
import io.datains.controller.sys.request.SysUserCreateRequest;
import io.datains.controller.sys.request.SysUserPwdRequest;
import io.datains.controller.sys.request.SysUserStateRequest;
import io.datains.controller.sys.response.RoleUserItem;
import io.datains.controller.sys.response.SysUserGridResponse;
import io.datains.service.sys.SysRoleService;
import io.datains.service.sys.SysUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import javax.crypto.Cipher;
import java.net.URLDecoder;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@Api(tags = "系统：用户管理")
@ApiSupport(order = 220)
@RequestMapping("/api/user")
public class SysUserController {

    @Resource
    private SysUserService sysUserService;

    @Resource
    private SysRoleService sysRoleService;

    @Autowired
    private AuthUserService authUserService;

    @Resource
    private SysUserMapper sysUserMapper;

    @Resource
    private RedisService redisService;
    private static String privateKey = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJFo3+cw4HmJeKHC2oWU5V6jChwvjKAZcNNLdyKjYiHbnFI/tHPFnOsyroTQwzP6YRwPfcTyMuPZ+cg2iCFpxRbVGJqrKAjH4O8pSW2+ZvkbmoqObxjNZLTfyiC5xJxlAKOMvdmQDvG1vkX0unf4fQgmklWr3yB6grQI+7dlhHq9AgMBAAECgYBw95wzvZo3ceDBM2OXsgS8kEfTe/FxlDI+RXvJ8krT6Qy6LXnhE56Ebzx8PL/aiuOU7EgWkN+OexL+Q7dg1g5iMbqSWGs5CQ/d68jjxXawXur9+5KFh3LEyWZI4IOph1OXhBcFQ0IjNvCFKtYyVQQDwdSA87/GRnkZcP/9I0tgtQJBAMdpiQaSlpHDlqHIk2M5GT9I00ZAgaZrvcz1/dPqwprfCwU1Pe+LO81eTYtf5ytCM+aN2jHrVw0YqaeGEyOSiBMCQQC6rEcrwNsCIC/MoQoR60omNCME0xSe7Hl0Fay8cqQZzJF8oA6Clf1uMjR/zUnTVkm/+TSlVcwZ3gbPcdHVuuvvAkB8M6RP/q9ffJXukFIUg/TQsNg+smDOOd8OsMx22Ip7EZ74kG/SKkOGJ01fGM2P6P0QhZu4ad9fXdQVbnGvP04XAkEAmW1JncuH9gpQXyapKSszKY1GjwuSckC4XlIGRGkROWcq2LyQ0IHI5456GeS33eyY9yEzRQTsmQIkpNHO/pUAnwJBAKTOBqz9jH6F5KTFmU2jKgVRlkfDKD8UnIrOm9iKtu6GIdanTw0NxpVVs3wZEz84+Tz+jmJGCPgD0RWhOxPxKx0=";


    @ApiOperation("查询用户")
    @RequiresPermissions("user:read")
    @PostMapping("/userGrid/{goPage}/{pageSize}")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "path", name = "goPage", value = "页码", required = true, dataType = "Integer"),
            @ApiImplicitParam(paramType = "path", name = "pageSize", value = "页容量", required = true, dataType = "Integer"),
            @ApiImplicitParam(name = "request", value = "查询条件", required = true)
    })
    public Pager<List<SysUserGridResponse>> userGrid(@PathVariable int goPage, @PathVariable int pageSize,
                                                     @RequestBody BaseGridRequest request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        return PageUtils.setPageInfo(page, sysUserService.query(request));
    }

    @ApiIgnore
    @PostMapping("/userLists")
    public List<SysUserGridResponse> userLists(@RequestBody BaseGridRequest request) {
        return sysUserService.query(request);
    }

    @ApiOperation("创建用户")
    @RequiresPermissions("user:add")
    @PostMapping("/create")
    @Transactional
    public void create(@RequestBody SysUserCreateRequest request) throws Exception {
        int save = sysUserService.save(request);
        if (save>0){
            Map<String, Object> token = getToken();
            if (token.get("code").equals(500)){
                token.get("errMsg");
            }
            Map<String,Object> map = new HashMap<>();
            SysUserEntity user = authUserService.getUserByName(request.getUsername());
           // map.put("accessToken",token.get("token"));
            map.put("biz_id",user.getUserId());
            map.put("loginName",user.getUsername());
            map.put("card_no",user.getUsername());
            map.put("phone",user.getPhone());
            int a = user.getEnabled()==1?1:(user.getEnabled()==0?2:0);
            map.put("operateType",a);

            List<Map<String,Object>> list = new ArrayList<>();
            list.add(map);
            String s = HttpClientHelper.sendPostD("http://10.59.13.234:8088/thirdAccountApi/syncAccountInfo", JSON.toJSONString(list),token.get("token").toString());
            System.err.println(s);
        }
    }

    @ApiOperation("更新用户")
    @RequiresPermissions("user:edit")
    @PostMapping("/update")
    @Transactional
    public void update(@RequestBody SysUserCreateRequest request) throws Exception {
        int update = sysUserService.update(request);
        /*if (update>0){
            Map<String, Object> token = getToken();

            if (token.get("code").equals(500)){
                token.get("errMsg");
            }
            Map<String,Object> map = new HashMap<>();
            SysUserEntity user = authUserService.getUserByName(request.getUsername());
           // map.put("accessToken",token.get("token"));
            map.put("biz_id",user.getUserId());
            map.put("loginName",user.getUsername());
            map.put("card_no",user.getUsername());
            map.put("phone",user.getPhone());
            int a = user.getEnabled()==1?1:(user.getEnabled()==0?2:0);
            map.put("operateType",a);
            HttpClientHelper.sendPostD("http://10.59.13.234:8088/thirdAccountApi/syncAccountInfo", JSON.toJSONString(map),token.get("token").toString());
        }*/
    }

    @Transactional
    @ApiOperation("删除用户")
    @RequiresPermissions("user:del")
    @PostMapping("/delete/{userId}")
    @ApiImplicitParam(paramType = "path", value = "用户ID", name = "userId", required = true, dataType = "Integer")
    public void delete(@PathVariable("userId") Long userId) throws Exception {

        Map<String, Object> token = getToken();
        Map<String, Object> map = new HashMap<>();
        SysUser user = sysUserMapper.selectByPrimaryKey(userId);
        //map.put("accessToken",token.get("token"));
        map.put("biz_id", user.getUserId());
        map.put("loginName", user.getUsername());
        map.put("card_no", user.getUsername());
        map.put("phone", user.getPhone());
        // int a = user.getEnabled()==1?1:(user.getEnabled()==0?2:0);
        map.put("operateType", 2);
        List<Map<String, Object>> list = new ArrayList<>();
        list.add(map);
        HttpClientHelper.sendPostD("http://10.59.13.234:8088/thirdAccountApi/syncAccountInfo", JSON.toJSONString(list), token.get("token").toString());

        int delete = sysUserService.delete(userId);
    }

    @ApiOperation("更新用户状态")
    @RequiresPermissions("user:edit")
    @RequiresRoles("1")
    @PostMapping("/updateStatus")
    public void updateStatus(@RequestBody SysUserStateRequest request) {
        sysUserService.updateStatus(request);
    }

    @ApiOperation("更新当前用户密码")
    @PostMapping("/updatePwd")
    public void updatePwd(@RequestBody SysUserPwdRequest request) {

        sysUserService.updatePwd(request);
    }

    @ApiOperation("更新指定用户密码")
    @RequiresPermissions("user:editPwd")
    @PostMapping("/adminUpdatePwd")
    public void adminUpdatePwd(@RequestBody SysUserPwdRequest request) {
        sysUserService.adminUpdatePwd(request);
    }

    @ApiOperation("当前用户信息")
    @PostMapping("/personInfo")
    public CurrentUserDto personInfo() {
        CurrentUserDto user = AuthUtils.getUser();
        return user;
    }

    @ApiIgnore
    @ApiOperation("更新个人信息")
    @PostMapping("/updatePersonInfo")
    public void updatePersonInfo(@RequestBody SysUserCreateRequest request) {
        sysUserService.updatePersonInfo(request);
    }

    @ApiOperation("设置语言")
    @PostMapping("/setLanguage/{language}")
    @ApiImplicitParam(paramType = "path", name = "language", value = "语言(zh_CN, zh_TW, en_US)", required = true, dataType = "String")
    public void setLanguage(@PathVariable String language) {
        CurrentUserDto user = AuthUtils.getUser();
        Optional.ofNullable(language).ifPresent(currentLanguage -> {
            if (!currentLanguage.equals(user.getLanguage())) {
                sysUserService.setLanguage(user.getUserId(), currentLanguage);
            }
        });
    }

    @ApiOperation("查询所有角色")
    @PostMapping("/all")
    public List<RoleUserItem> all() {
        return sysRoleService.allRoles();
    }

    @ApiIgnore("查询角色")
    @PostMapping("/roleGrid/{goPage}/{pageSize}")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "path", name = "goPage", value = "页码", required = true, dataType = "Integer"),
            @ApiImplicitParam(paramType = "path", name = "pageSize", value = "页容量", required = true, dataType = "Integer"),
            @ApiImplicitParam(name = "request", value = "查询条件", required = true)
    })
    public Pager<List<SysRole>> roleGrid(@PathVariable int goPage, @PathVariable int pageSize,
                                         @RequestBody BaseGridRequest request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        Pager<List<SysRole>> listPager = PageUtils.setPageInfo(page, sysRoleService.query(request));
        return listPager;
    }

    @ApiOperation("已同步用户")
    @PostMapping("/existLdapUsers")
    public List<ExistLdapUser> getExistLdapUsers() {
        List<String> userNames = sysUserService.ldapUserNames();
        return userNames.stream().map(name -> {
            ExistLdapUser ldapUser = new ExistLdapUser();
            ldapUser.setUsername(name);
            return ldapUser;
        }).collect(Collectors.toList());
    }

    public Map<String, Object> getToken() throws Exception {
        Map<String, Object> map = new HashMap<>();
        try {
            map.put("appId", 130);
            map.put("privateKey", privateKey);
            String s = HttpClientHelper.sendPostD("http://10.59.13.234:8088/thirdAccountApi/getAccessToken", JSON.toJSONString(map), null);
            JSONObject jsonObject = JSON.parseObject(s);
            if (jsonObject.getString("code").equals("200")) {
                map.put("code", 200);
                map.put("token", jsonObject.getString("data"));
            } else {
                map.put("code", 500);
                map.put("token", jsonObject.getString("msg"));
            }
            return map;
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", e.getMessage());
            return map;
        }

    }


    //@ApiOperation("单点登录")
    @PostMapping("/singleSignOn")
    public Object singleSignOn(@RequestBody Map<String, String> maps) throws Exception {
        Map<String, Object> map = new HashMap<>();
        try {
            String privateKeyString = privateKey; // 你的私钥
            PrivateKey privateKey = loadPrivateKey(privateKeyString);
            String decodedString = URLDecoder.decode(maps.get("carInfo"), "UTF-8");//若接收到的参数为URL编码之后的需要decode以下，否则不需要
            String cao = decodedString.replaceAll(" +", "+");
            String encryptedMessageString = cao; // 加密之后的字符串
            byte[] encryptedMessage = Base64.getDecoder().decode(encryptedMessageString);
            String username = decrypt(encryptedMessage, privateKey);
            //String username = maps.get("carInfo");
            SysUserEntity user = authUserService.getUserByName(username);
            if (IsNullUtils.isNull(user)) {
                map.put("code", 500);
                map.put("msg", "未查找到此用户");
                return map;
            }
            TokenInfo tokenInfo = TokenInfo.builder().userId(user.getUserId()).username(username).build();
            String token = JWTUtils.sign(tokenInfo, user.getPassword());
            map.put("code", 200);
            map.put("msg", "成功");
            map.put("token", token);
            ServletUtils.setToken(token);
            authUserService.clearCache(user.getUserId());
            String s = redisService.get(UserKey.getById, "datains_" + user.getUserId().toString());
            if (StringUtils.isEmpty(s)) {
                boolean set = redisService.set(UserKey.getById, "datains_" + user.getUserId().toString(), token);
                System.err.println(set);
            }
            return map;
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", e.getMessage());
            e.printStackTrace();
            return map;
        }

    }


    public static void main(String[] args) throws Exception {
        String privateKeyString = privateKey; // 你的私钥
        PrivateKey privateKey = loadPrivateKey(privateKeyString);
        String decodedString = URLDecoder.decode("Zfn7zHPS7JXg8g6uBc17+YBL041Giz73IbhNX5Q7MbXJvJ1Upw4fVIYM2kF90a9FEuMz5reA7tc+WUudTxGVDivyYSOqhzt9c9EMudb0YoQGvDUOOc2Wjy47IvGz60g+uoDqygoIsBi5k3oyuz1vvQqm6knrkmt5qlEwB1tkjm0=", "UTF-8");//若接收到的参数为URL编码之后的需要decode以下，否则不需要
        String s = decodedString.replaceAll(" +", "+");
        String encryptedMessageString = s; // 加密之后的字符串
        byte[] encryptedMessage = Base64.getDecoder().decode(encryptedMessageString);
        String decryptedMessage = decrypt(encryptedMessage, privateKey);
        System.out.println("解密后的信息: " + decryptedMessage);
    }

    public static PrivateKey loadPrivateKey(String privateKeyString) throws Exception {
        byte[] privateKeyBytes = Base64.getDecoder().decode(privateKeyString);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(privateKeyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePrivate(spec);
    }

    public static String decrypt(byte[] encryptedMessage, PrivateKey privateKey) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        return new String(cipher.doFinal(encryptedMessage));
    }

}
