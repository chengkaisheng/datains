package io.datains.fill.entry;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 数据填报基本信息实体类
 * 对应数据库表：fill_form_info
 *
 * @author zhangzihang
 * @since 2025-02-24 16:24
 */
@Data
public class FillFormInfo {
    /**
     * 自增主键ID
     */
    private Long id;

    /**
     * 父级表单ID
     */
    private Long parentId;

    /**
     * 关联模板ID
     */
    private Long templateId;

    /**
     * 表单名称
     */
    private String name;

    /**
     * 表单描述
     */
    private String description;
    /**
     * 版本号
     */
    private Integer version;

    /**
     * 创建人ID
     */
    private Long creator;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    /**
     * 最后更新人ID
     */
    private Long updater;

    /**
     * 最后更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;
    /**
     * 是否删除 1-删除
     */
    private int isDelete;
}
