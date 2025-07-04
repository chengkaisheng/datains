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

    int getCountByDeptIdAndSource(@Param("deptId") Long deptId, @Param("authSource") String authSource, @Param("authSourceType") String authSourceType);

    List<SysDeptLeaderAuth> selectByDeptId(Long deptId);

    List<SysDeptLeaderAuth> selectByDeptIdAndSource(@Param("deptId") Long deptId, @Param("authSource") String authSource, @Param("authSourceType") String authSourceType);

    void batchDeleteByDeptIds(@Param("deptIds") List<Long> deptIds);

    void deleteByDeptIdAndSource(@Param("userId") Long userId, @Param("deptId") Long deptId, @Param("authSources") List<String> authSources, @Param("authSourceType") String authSourceType);

    void deleteByAuthSource(String authSource);
}
