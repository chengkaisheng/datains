package io.datains.qyy.service;

import cn.hutool.crypto.SecureUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONUtil;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * AddRoleService
 *
 * @author zhangzihang
 * @since 2025-04-02 11:30
 */
public class AddRoleService {
    private static void addRoles(List<Role> roles) {
        SecureUtil.disableBouncyCastle();
        String encryptedData = SecureUtil.aes("5FD21BFAB8449CB0572D9A3E6E0B483D".getBytes()).encryptBase64(JSONUtil.parse(roles).toString());
        Request request = Request.builder().scenId("sjtb_001").encryptedData(encryptedData).build();
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
        List<Role> roles = new ArrayList<>();
        roles.add(Role.builder().name("超级管理员").describe("超级管理员").key("1").build());
        roles.add(Role.builder().name("平凉路街道管理员").describe("能够管理平凉路街道的填报信息和权限信息").key("3").build());
        roles.add(Role.builder().name("定海路街道管理员").describe("能够管理定海路街道的填报信息和权限信息").key("4").build());
        roles.add(Role.builder().name("大桥街道管理员").describe("能够管理大桥街道的填报信息和权限信息").key("5").build());
        roles.add(Role.builder().name("江浦路街道管理员").describe("能够管理江浦路街道的填报信息和权限信息").key("6").build());
        roles.add(Role.builder().name("控江路街道管理员").describe("能够管理控江路街道的填报信息和权限信息").key("7").build());
        roles.add(Role.builder().name("延吉新村街道管理员").describe("能够管理延吉新村街道的填报信息和权限信息").key("8").build());
        roles.add(Role.builder().name("五角场街道管理员").describe("能够管理五角场街道的填报信息和权限信息").key("9").build());
        roles.add(Role.builder().name("新江湾城街道管理员").describe("能够管理新江湾城街道的填报信息和权限信息").key("10").build());
        roles.add(Role.builder().name("四平路街道管理员").describe("能够管理四平路街道的填报信息和权限信息").key("11").build());
        roles.add(Role.builder().name("长白新村街道管理员").describe("能够管理长白新村街道的填报信息和权限信息").key("12").build());
        roles.add(Role.builder().name("殷行街道管理员").describe("能够管理殷行街道的填报信息和权限信息").key("13").build());
        roles.add(Role.builder().name("长海路街道管理员").describe("能够管理长海路街道的填报信息和权限信息").key("14").build());
        roles.add(Role.builder().name("滨江路街道管理员").describe("能够管理滨江路街道的填报信息和权限信息").key("15").build());
        addRoles(roles);
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
    private static class Role {
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
    }
}
