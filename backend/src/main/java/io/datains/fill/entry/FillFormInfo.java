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
     * 主键ID
     */
    private String id;

    /**
     * 父级表单ID
     */
    private String pid;
    /**
     * 文件夹或者表单 folder文件夹 form表单
     */
    private String nodeType;

    /**
     * 表单名称
     */
    private String name;

    /**
     * 表单描述
     */
    private String description;
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
}
