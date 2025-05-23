package io.datains.qyy.service;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONUtil;
import io.datains.auth.service.AuthUserService;
import io.datains.base.domain.SysUser;
import io.datains.base.domain.SysUserExample;
import io.datains.base.mapper.SysUserMapper;
import io.datains.controller.sys.request.SysUserCreateRequest;
import io.datains.qyy.utils.QyyCommon;
import io.datains.service.sys.SysUserService;
import lombok.Data;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.List;

/**
 * 从轻应用同步所有用户信息
 *
 * @author zhangzihang
 * @since 2025-04-17 09:50
 */
@Service
public class SyncAllUsers {
    @Resource
    private QyyCommon qyyCommon;
    @Resource
    private SysUserMapper sysUserMapper;
    @Resource
    private AuthUserService authUserService;

    @Resource
    private SysUserService sysUserService;

    private void syncUser() {
        //获取轻应用用户
        List<QyyUser> qyyUsers = fetchMobileUsers();
        //取出所有已存在的用户
        List<SysUser> sysUsers = sysUserMapper.selectByExample(new SysUserExample());

    }


    private List<QyyUser> fetchMobileUsers() {
        String path = "/api/fetchMobileUsers";
        try (HttpResponse response = HttpRequest.get(path)
                .execute()) {
            if (!response.isOk()) {
                throw new RuntimeException("轻应用请求失败");
            } else {
                Response response1 = JSONUtil.toBean(response.body(), Response.class);
                if (response1.getCode() != 200) {
                    throw new RuntimeException(response1.getMessage());
                }
                return response1.getData();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    private void autoCreateUser(QyyUser qyyUser) {
        SysUserCreateRequest request = new SysUserCreateRequest();
        request.setUsername("q_" + qyyUser.getId());
        request.setNickName(qyyUser.getName());
        request.setPhone(qyyUser.getPhone());
        request.setDeptId(qyyUser.getOrgId());
        request.setEmail(qyyUser.getEmail());
        request.setRoleIds(Collections.singletonList(Long.valueOf(qyyUser.getAppRole().getKey())));
        request.setEnabled(1L);
        sysUserService.save(request);
    }

    @Data
    public static class Response {
        private Boolean success;
        private Integer code;
        private String message;
        private List<QyyUser> data;
    }

    @Data
    public static class QyyUser {
        /**
         * 用户id
         */
        private Long id;
        /**
         * 用户名称
         */
        private String userName;
        /**
         * 用户真实姓名
         */
        private String name;
        /**
         * 用户手机号
         */
        private String phone;
        /**
         * 用户性别 1-男 2-女
         */
        private Integer sex;
        /**
         * 用户邮箱
         */
        private String email;
        /**
         * 用户账号
         */
        private String account;
        /**
         * 用户组织id
         */
        private Long orgId;
        /**
         * Pc填报角色信息
         */
        private Role Pcrole;
        /**
         * App填报角色信息
         */
        private Role AppRole;

    }

    @Data
    public static class Role {
        private Long id;
        /**
         * 场景编码
         */
        private String appId;
        /**
         * 场景名称
         */
        private String appName;
        /**
         * 角色唯一标识
         */
        private String permissionTypeId;
        /**
         * 角色名称
         */
        private String permissionTypeName;
        /**
         * 场景中角色权限标识符
         */
        private String key;
        /**
         * 角色描述
         */
        private String describe;
    }

}
