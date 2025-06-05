package io.datains.qyy.service;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONUtil;
import io.datains.base.domain.SysDept;
import io.datains.base.domain.SysUser;
import io.datains.base.domain.SysUserExample;
import io.datains.base.mapper.SysDeptMapper;
import io.datains.base.mapper.SysUserMapper;
import io.datains.controller.sys.request.SysUserCreateRequest;
import io.datains.qyy.utils.QyyCommon;
import io.datains.service.sys.SysUserService;
import lombok.Data;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

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
    private SysUserService sysUserService;
    @Resource
    private SysDeptMapper sysDeptMapper;

    @Scheduled(
            fixedDelay = 600000L,
            initialDelay = 30000L
    )
    public void sync() {
        //同步部门
        syncDept();
        //同步用户
        syncUser();
    }

    private void syncDept() {
        List<QyyDept> qyyDepts = fetchOrgList();
        if (qyyDepts == null || qyyDepts.isEmpty()) {
            return;
        }
        List<SysDept> sysDepts = new ArrayList<>();
        toSysDept(sysDepts, qyyDepts);
        sysDeptMapper.deleteAll();
        sysDeptMapper.insertBatch(sysDepts);
    }

    private void toSysDept(List<SysDept> sysDepts, List<QyyDept> qyyDepts) {
        for (QyyDept qyyDept : qyyDepts) {
            SysDept sysDept = new SysDept();
            sysDept.setDeptId(qyyDept.getId());
            sysDept.setPid(qyyDept.getParentId());
            sysDept.setName(qyyDept.getTitle());
            sysDept.setSubCount(qyyDept.getChildren() == null ? 0 : qyyDept.getChildren().size());
            sysDepts.add(sysDept);
            if (qyyDept.getChildren() != null && !qyyDept.getChildren().isEmpty()) {
                toSysDept(sysDepts, qyyDept.getChildren());
            }
        }
    }

    private void syncUser() {
        //获取轻应用用户
        List<QyyUser> qyyUsers = fetchMobileUsers();
        if (qyyUsers == null || qyyUsers.isEmpty()) {
            return;
        }
        //剔除非填报的用户
        List<QyyUser> qyyUsers1 = qyyUsers.stream().filter(qyyUser -> qyyUser.getAppRole() != null || qyyUser.getPcrole() != null).collect(Collectors.toList());

        //取出所有已存在的用户
        List<SysUser> sysUsers = sysUserMapper.selectByExample(new SysUserExample());
        //以username为key构建map
        Map<String, SysUser> sysUserMap = sysUsers.stream().collect(Collectors.toMap(SysUser::getUsername, sysUser -> sysUser));

        //分离出需要创建或者需要更新的用户
        for (QyyUser qyyUser : qyyUsers1) {
            String username = "q_" + qyyUser.getId();
            if (sysUserMap.containsKey(username)) {
                //判断账号信息是否一致，不一致则更新
                SysUser sysUser = sysUserMap.get(username);
                if (!Objects.equals(sysUser.getNickName(), qyyUser.getName())
                        || !Objects.equals(sysUser.getPhone(), qyyUser.getPhone())
                        || !Objects.equals(sysUser.getEmail(), qyyUser.getEmail())
                        || !Objects.equals(sysUser.getDeptId(), qyyUser.getOrgId())) {
                    this.autoUpdateUser(sysUser, qyyUser);
                }
            } else {
                //不存在则直接创建用户
                this.autoCreateUser(qyyUser);
            }
        }

    }


    private List<QyyUser> fetchMobileUsers() {
        String path = qyyCommon.getHost() + "/fetchMobileUsers";
        try (HttpResponse response = HttpRequest.get(path)
                .execute()) {
            if (!response.isOk()) {
                throw new RuntimeException("轻应用请求失败");
            } else {
                ResponseUser responseUser = JSONUtil.toBean(response.body(), ResponseUser.class);
                if (responseUser.getCode() != 200) {
                    throw new RuntimeException(responseUser.getMessage());
                }
                return responseUser.getData();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    private List<QyyDept> fetchOrgList() {
        String path = qyyCommon.getHost() + "/sync/OrgList";
        try (HttpResponse response = HttpRequest.get(path)
                .execute()) {
            if (!response.isOk()) {
                throw new RuntimeException("轻应用请求失败");
            } else {
                ResponseDept responseDept = JSONUtil.toBean(response.body(), ResponseDept.class);
                if (responseDept.getCode() != 200) {
                    throw new RuntimeException(responseDept.getMessage());
                }
                return responseDept.getData();
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
        List<Long> roleIds = new ArrayList<>();
        if (qyyUser.getAppRole() != null) {
            roleIds.add(Long.valueOf(qyyUser.getAppRole().getKey()));
        }
        if (qyyUser.getPcrole() != null) {
            roleIds.add(Long.valueOf(qyyUser.getPcrole().getKey()));
        }
        request.setRoleIds(roleIds.stream().distinct().collect(Collectors.toList()));
        request.setEnabled(1L);
        sysUserService.save(request);
    }

    private void autoUpdateUser(SysUser sysUser, QyyUser qyyUser) {
        SysUserCreateRequest request = new SysUserCreateRequest();
        request.setUsername(sysUser.getUsername());
        request.setUserId(sysUser.getUserId());
        request.setNickName(qyyUser.getName());
        request.setPhone(qyyUser.getPhone());
        request.setDeptId(qyyUser.getOrgId());
        request.setEmail(qyyUser.getEmail());
        List<Long> roleIds = new ArrayList<>();
        if (qyyUser.getAppRole() != null) {
            roleIds.add(Long.valueOf(qyyUser.getAppRole().getKey()));
        }
        if (qyyUser.getPcrole() != null) {
            roleIds.add(Long.valueOf(qyyUser.getPcrole().getKey()));
        }
        request.setRoleIds(roleIds.stream().distinct().collect(Collectors.toList()));
        request.setEnabled(1L);
        sysUserService.update(request);
    }


    @Data
    public static class ResponseUser {
        private Boolean success;
        private Integer code;
        private String message;
        private List<QyyUser> data;
    }

    @Data
    public static class ResponseDept {
        private Boolean success;
        private Integer code;
        private String message;
        private List<QyyDept> data;
    }

    @Data
    public static class QyyDept {
        /**
         * 主键
         */
        private Long Id;
        /**
         * 父级id
         */
        private Long parentId;
        /**
         * 机构名称
         */
        private String title;
        /**
         * 父级编码
         */
        private Long pid;
        /**
         * 子集列表
         */
        private List<QyyDept> children;
        private String value;
        private String weight;
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
