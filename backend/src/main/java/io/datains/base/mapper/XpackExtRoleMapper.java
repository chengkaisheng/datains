package io.datains.base.mapper;

import io.datains.base.domain.XpackSysRole;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 14:43
 * @Description
 */
public interface XpackExtRoleMapper {

    int deleteMenuMapping(@Param("roleId") Long paramLong);

    int deleteUserMapping(@Param("roleId") Long paramLong);

    List<XpackSysRole> queryAll();

    List<XpackSysRole> query(XpackSysRole xpackSysRole);

    List<XpackSysRole> querylike(XpackSysRole xpackSysRole);
}
