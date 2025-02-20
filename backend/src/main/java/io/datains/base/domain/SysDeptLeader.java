package io.datains.base.domain;

import lombok.Data;

/**
 * SysDeptLeader
 *
 * @author zhangzihang
 * @since 2025-02-19 13:04
 */
@Data
public class SysDeptLeader {

    /**
     * ID
     */
    private Long id;

    /**
     * 组织id
     */
    private Long deptId;

    /**
     * 负责人用户id
     */
    private Long userId;

    /**
     * 创建者
     */
    private String createBy;

    /**
     * 更新者
     */
    private String updateBy;

    /**
     * 创建日期
     */
    private Long createTime;

    /**
     * 更新时间
     */
    private Long updateTime;
}
