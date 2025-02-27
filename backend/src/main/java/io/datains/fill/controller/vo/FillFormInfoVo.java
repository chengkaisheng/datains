package io.datains.fill.controller.vo;

import io.datains.fill.entry.FillFormInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * FillFormInfoPageVo
 *
 * @author zhangzihang
 * @since 2025-02-24 17:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class FillFormInfoVo extends FillFormInfo {
    /**
     * 模版名
     */
    private String templateName;
    /**
     * 子节点
     */
    private List<FillFormInfo> children;
}
