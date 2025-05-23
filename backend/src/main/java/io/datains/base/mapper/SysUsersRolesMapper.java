package io.datains.base.mapper;

import io.datains.base.domain.SysUsersRolesExample;
import io.datains.base.domain.SysUsersRolesKey;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SysUsersRolesMapper {
    long countByExample(SysUsersRolesExample example);

    int deleteByExample(SysUsersRolesExample example);

    int deleteByPrimaryKey(SysUsersRolesKey key);

    int insert(SysUsersRolesKey record);

    int insertSelective(SysUsersRolesKey record);

    List<SysUsersRolesKey> selectByExample(SysUsersRolesExample example);

    int updateByExampleSelective(@Param("record") SysUsersRolesKey record, @Param("example") SysUsersRolesExample example);

    int updateByExample(@Param("record") SysUsersRolesKey record, @Param("example") SysUsersRolesExample example);

    List<SysUsersRolesKey> selectByRoleIds(@Param("roleIds") List<Long> roleIds);
}
