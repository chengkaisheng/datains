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
import java.util.ArrayList;
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
        //需要更改用户状态的列表
        List<Long> needChangeStatusUserIds = new ArrayList<>();
        //需要创建的用户列表


        //获取轻应用用户
        List<QyyUser> qyyUsers = selectByScenIdAppUser();
        //取出所有已存在的用户
        List<SysUser> sysUsers = sysUserMapper.selectByExample(new SysUserExample());


    }


    private List<QyyUser> selectByScenIdAppUser() {
        String path = String.format("%s?scenId=%s",
                qyyCommon.getHost() + "/api/appconfig/selectByScenIdAppUser",
                qyyCommon.getScenId());
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
        private String name;
        /**
         * 用户所在机构id
         */
        private Long orgId;
        /**
         * 用户所在机构名称
         */
        private String orgName;
        /**
         * 编码
         */
        private String roleCode;
    }
}
