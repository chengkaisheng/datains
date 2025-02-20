package io.datains.service.sys;

import java.util.List;

/**
 * sysDeptLeaderAuth
 *
 * @author zhangzihang
 * @since 2025-02-19 14:09
 */
public interface SysDeptLeaderAuthService {
    /**
     * 批量插入组织负责人
     */
    void batchInsert(List<Long> userIds, Long deptId);

    /**
     * 批量删除组织时，同步删除组织负责人
     */
    void batchDelete(List<Long> deptId);

    /**
     * 同步组织负责人
     *
     * @param userIds 组织负责人
     * @param deptId  组织
     */
    void syncDeptLeaders(List<Long> userIds, Long deptId);

    /**
     * 将权限存储在组织下，为后续同步给组织负责人做准备
     *
     * @param userId         权限来源用户，用于判断所属组织
     * @param authSource     权限来源
     * @param authSourceType 权限来源类型
     */
    void addAuthToLeaders(Long userId, String authSource, String authSourceType);

    List<Long> selectUserIdsByDeptId(Long deptId);

    void deleteByAuthSource(String authSource);
}
