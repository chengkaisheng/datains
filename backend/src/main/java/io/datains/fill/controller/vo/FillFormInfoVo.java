package io.datains.fill.controller.vo;

import io.datains.commons.model.ITreeBase;
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
public class FillFormInfoVo extends FillFormInfo implements ITreeBase<FillFormInfoVo> {
    private String createdByName;
    /**
     * 子节点
     */
    private List<FillFormInfoVo> children;
}
