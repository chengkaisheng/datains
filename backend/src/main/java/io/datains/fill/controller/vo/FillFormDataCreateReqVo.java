package io.datains.fill.controller.vo;

import lombok.Data;

/**
 * FillFormDataCreateReqVo
 *
 * @author zhangzihang
 * @since 2025-02-25 10:09
 */
@Data
public class FillFormDataCreateReqVo {
    /**
     * 关联的表单ID（对应 fill_form_info.id）
     */
    private String formId;
    /**
     * 表单数据（JSON数组格式，需自定义类型处理器或手动解析）
     */
    private String formData;
}
