package io.datains.controller.sys;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.xiaoymin.knife4j.annotations.ApiSupport;
import io.datains.auth.api.dto.CurrentUserDto;
import io.datains.base.domain.SysRole;
import io.datains.commons.utils.AuthUtils;
import io.datains.commons.utils.PageUtils;
import io.datains.commons.utils.Pager;
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

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import javax.crypto.Cipher;
import java.net.URLDecoder;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
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
    public void create(@RequestBody SysUserCreateRequest request) {
        sysUserService.save(request);
    }

    @ApiOperation("更新用户")
    @RequiresPermissions("user:edit")
    @PostMapping("/update")
    public void update(@RequestBody SysUserCreateRequest request) {
        sysUserService.update(request);
    }

    @ApiOperation("删除用户")
    @RequiresPermissions("user:del")
    @PostMapping("/delete/{userId}")
    @ApiImplicitParam(paramType = "path", value = "用户ID", name = "userId", required = true, dataType = "Integer")
    public void delete(@PathVariable("userId") Long userId) {
        sysUserService.delete(userId);
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


  /*  public static void main(String[] args) throws Exception {
        String privateKeyString = privateKey; // 你的私钥
        PrivateKey privateKey = loadPrivateKey(privateKeyString);
        String decodedString = URLDecoder.decode(cardInfo, "UTF-8");//若接收到的参数为URL编码之后的需要decode以下，否则不需要
        String encryptedMessageString = decodedString; // 加密之后的字符串
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
    }*/

}
