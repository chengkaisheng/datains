package io.datains.fill.entry;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * FillFormTemplate
 *
 * @author zhangzihang
 * @since 2025-02-25 16:37
 */
@Data
public class FillFormTemplate {
    /**
     * 自增主键ID
     */
    private Long id;

    /**
     * 表单名称
     */
    private String name;

    /**
     * 表单描述
     */
    private String description;
    /**
     * 模版数据
     */
    private String data;

    /**
     * 创建人ID
     */
    private Long creator;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 最后更新人ID
     */
    private Long updater;

    /**
     * 最后更新时间
     */
    private LocalDateTime updateTime;
    /**
     * 是否删除 1-删除
     */
    private int isDelete;
}
