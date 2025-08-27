package io.datains.qyy.service;

import cn.hutool.crypto.SecureUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONUtil;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * AddRoleService
 *
 * @author zhangzihang
 * @since 2025-04-02 11:30
 */
@Service
public class AddRoleService {
    public void addRoles(List<Role> roles, String key, String scenId, String url) {
        SecureUtil.disableBouncyCastle();
        String encryptedData = SecureUtil.aes(key.getBytes()).encryptBase64(JSONUtil.parse(roles).toString());
        Request request = Request.builder().scenId(scenId).encryptedData(encryptedData).build();
        try (HttpResponse response = HttpRequest.post(url)
                .contentType("application/json")
                .body(JSONUtil.parse(request).toString())
                .execute()) {
            System.out.println(response.body());
            if (!response.isOk()) {
                throw new RuntimeException("轻应用请求失败");
            } else {
                CertificationService.Response response1 = JSONUtil.toBean(response.body(), CertificationService.Response.class);
                if (response1.getCode() != 200) {
                    throw new RuntimeException(response1.getMessage());
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static void addRoles(List<Role> roles) {
        SecureUtil.disableBouncyCastle();
        String encryptedData = SecureUtil.aes("BD569076999F11473AAE4E66486E43DC".getBytes()).encryptBase64(JSONUtil.parse(roles).toString());
        Request request = Request.builder().scenId("sjtb_003").encryptedData(encryptedData).build();
        try (HttpResponse response = HttpRequest.post("http://qyy.lingbtech.com:9140/api/function/add")
                .contentType("application/json")
                .body(JSONUtil.parse(request).toString())
                .execute()) {
            System.out.println(response.body());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        Request request = Request.builder().scenId("pcsjtb_001").build();
        List<Role> roles = new ArrayList<>();
        roles.add(Role.builder().name("杨浦区商务委三方填报人员").describe("杨浦区商务委三方填报人员").key("51").build());
        String encryptedData = SecureUtil.aes("25EC1AD1F1658FF49E73B801B3B332C7".getBytes())
                .encryptBase64(JSONUtil.parse(roles).toString());
        request.setEncryptedData(encryptedData);
        System.out.println(JSONUtil.toJsonStr(request));
    }

    @Data
    @Builder
    private static class Request {
        /**
         * 场景id
         */
        private String scenId;
        /**
         * 使用密钥加密的权限列表信息（AES加密）
         */
        private String encryptedData;
    }


    @Data
    @Builder
    public static class Role {
        /**
         * 角色名称
         */
        private String name;
        /**
         * 角色描述
         */
        private String describe;
        /**
         * 角色标识 --角色的id
         */
        private String key;

        public Role() {

        }

        public Role(String name, String describe, String key) {
            this.name = name;
            this.describe = describe;
            this.key = key;
        }
    }
}
