package io.datains.fill.controller.vo;

import io.datains.fill.entry.FillFormInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * FillFormInfoCreateReqVo
 *
 * @author zhangzihang
 * @since 2025-02-27 13:04
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class FillFormInfoCreateReqVo extends FillFormInfo {
    /**
     * 表单数据（JSON数组格式，需自定义类型处理器或手动解析）
     */
    private String formData;
}
