package io.datains.fill.entry;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 表单数据表实体类
 *
 * @author zhangzihang
 * @since 2025-02-24 16:40
 */
@Data
public class FillFormData {
    /**
     * 自增主键ID
     */
    private Long id;
    /**
     * 关联的表单ID（对应 fill_form_info.id）
     */
    private Long formId;
    /**
     * 表单数据（JSON数组格式，需自定义类型处理器或手动解析）
     */
    private String formData;
    /**
     * 创建人ID
     */
    private Long creator;
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
    /**
     * 更新人ID
     */
    private Long updater;
    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 是否删除 1-删除
     */
    private int isDelete;
}
