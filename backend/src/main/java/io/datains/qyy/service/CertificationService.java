package io.datains.qyy.service;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONUtil;
import io.datains.qyy.utils.QyyCommon;
import lombok.Data;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * CertificationService
 *
 * @author zhangzihang
 * @since 2025-04-02 15:47
 */
@Service
public class CertificationService {
    @Resource
    private QyyCommon qyyCommon;

    public QyyUser certification(String token) {
        String path = String.format("%s?token=%s&scenId=%s",
                qyyCommon.getHost() + "/api/token/certification",
                token,
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


    @Data
    public static class Response {
        private Boolean success;
        private Integer code;
        private String message;
        private QyyUser data;
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
         * 编码
         */
        private String roleCode;
        /**
         * 用户机构信息
         */
        private QyySysOrg sysOrg;
        /**
         * 用户场景权限信息
         */
        private QyySysRoleScenarios sysRoleScenarios;
    }

    @Data
    public static class QyySysOrg {
        /**
         * 主键
         */
        private Long Id;
        /**
         * 父id
         */
        private String pid;
        /**
         * 父ids
         */
        private String pids;
        /**
         * 名称
         */
        private String name;
        /**
         * 描述
         */
        private String remark;
        /**
         * 编码
         */
        private String orgCode;
    }

    @Data
    public static class QyySysRoleScenarios {
        /**
         * 主键
         */
        private Integer id;
        /**
         * 场景主键
         */
        private Long appId;
        /**
         * 场景名称
         */
        private String appName;
        /**
         * 权限之间
         */
        private Integer permissionTypeId;
        /**
         * 权限名称
         */
        private String permissionTypeName;
        /**
         * 创建时间
         */
        private Date createTime;
        /**
         * 修改时间
         */
        private Date updateTime;
        /**
         * 是否删除
         */
        private Integer delFlag;
        /**
         * 分配的角色编码
         */
        private String roleCode;
        /**
         * 权限标识符
         */
        private String key;
        /**
         * 权限描述
         */
        private String describe;
        /**
         * 场景id
         */
        private String scenId;
    }
}
