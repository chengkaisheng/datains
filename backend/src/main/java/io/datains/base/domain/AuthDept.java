package io.datains.base.domain;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * AuthDept
 *
 * @author zhangzihang
 * @since 2025-01-08 12:57
 */
@Data
public class AuthDept {
    private Long id;
    private Long pid;
    private String name;
    private Boolean auth;
    private List<AuthDept> children;

    public AuthDept() {
    }

    public AuthDept(Long id, Long pid, String name, Boolean auth) {
        this.id = id;
        this.pid = pid;
        this.name = name;
        this.auth = auth;
    }

    public void addChild(AuthDept child) {
        if (this.children == null) {
            this.children = new ArrayList<>();
        }
        this.children.add(child);
    }
}
