package io.datains.base.mapper;

import io.datains.base.domain.SysDeptLeader;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * SysDeptLeaderMapper
 *
 * @author zhangzihang
 * @since 2025-02-19 13:09
 */
public interface SysDeptLeaderMapper {
    int insert(SysDeptLeader sysDeptLeader);

    void batchInsert(List<SysDeptLeader> leaders);

    List<Long> selectUserIdsByDeptId(Long deptId);

    List<Long> selectUserIdsByDeptIds(@Param("deptIds") List<Long> deptIds);

    void batchDelete(@Param("deptId") Long deptId, @Param("userIds") List<Long> userIds);

    void batchDeleteByDeptIds(@Param("deptIds") List<Long> deptIds);

}
