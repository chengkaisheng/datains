package io.datains.fill.controller.vo;

import lombok.Data;

/**
 * FillFormInfoReqVo
 *
 * @author zhangzihang
 * @since 2025-02-24 17:44
 */
@Data
public class FillFormInfoReqVo {
    private String formId;
    private String pid;
    private String name;
    private Long userId;
    boolean isAdmin;
}
