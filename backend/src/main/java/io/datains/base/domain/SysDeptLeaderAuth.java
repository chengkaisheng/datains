package io.datains.base.domain;

import lombok.Data;

/**
 * SysDeptLeaderAuth
 *
 * @author zhangzihang
 * @since 2025-02-19 13:05
 */
@Data
public class SysDeptLeaderAuth {

    /**
     * ID
     */
    private Long id;

    /**
     * 组织id
     */
    private Long deptId;
    /**
     * 权限来源用户id
     */
    private Long userId;

    /**
     * 资源id
     */
    private String authSource;

    /**
     * 资源类型
     */
    private String authSourceType;

    /**
     * 权限类型(多个用,隔开)
     */
    private String privilegeType;

    /**
     * 创建日期
     */
    private Long createTime;

    /**
     * 更新时间
     */
    private Long updateTime;
}
