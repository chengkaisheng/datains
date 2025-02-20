package io.datains.base.mapper;

import io.datains.base.domain.SysDeptLeaderAuth;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * SysDeptLeaderAuth
 *
 * @author zhangzihang
 * @since 2025-02-19 13:11
 */
public interface SysDeptLeaderAuthMapper {
    int insertBatch(@Param("list") List<SysDeptLeaderAuth> list);

    List<SysDeptLeaderAuth> selectByDeptId(Long deptId);

    void batchDeleteByDeptIds(@Param("deptIds") List<Long> deptIds);

    void deleteByAuthSource(String authSource);
}
