package io.datains.base.mapper;

import java.util.List;

import io.datains.base.domain.XpackSysRole;
import org.apache.ibatis.annotations.Param;
/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 11:16
 * @Description
 */
public interface XpackSysRoleMapper {
    XpackSysRole selectByPrimaryKey(Long paramLong);

    long countByExample(XpackSysRole paramXpackSysRoleExample);

    int deleteByExample(XpackSysRole paramXpackSysRoleExample);

    List<XpackSysRole> selectByExample(XpackSysRole paramXpackSysRoleExample);

    int updateByPrimaryKey(XpackSysRole paramXpackSysRole);

    int updateByExampleSelective(XpackSysRole paramXpackSysRole);

    int insertSelective(XpackSysRole paramXpackSysRole);

    int insert(XpackSysRole paramXpackSysRole);

    int updateByPrimaryKeySelective(XpackSysRole paramXpackSysRole);

    int updateByExample(XpackSysRole paramXpackSysRole);

    int deleteByPrimaryKey(Long paramLong);
}