package io.datains.base.mapper;

import io.datains.base.domain.Item;
import io.datains.base.domain.SysDept;
import io.datains.dto.DataSetRowPermissionsDTO;
import io.datains.dto.DatasetRowPermissions;
import io.datains.dto.XpackGridExample;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 16:19
 * @Description
 */
public interface ExtRowPermissionMapper
{
    List<Item> searchAuthRoles(DatasetRowPermissions p0);

    List<Item> searchAuthUsers(DatasetRowPermissions p0);

    int updateByPrimaryKey(DatasetRowPermissions p0);

    List<Item> searchAuthDepts(DatasetRowPermissions p0);

    List<DataSetRowPermissionsDTO> searchRowPermissons(DataSetRowPermissionsDTO p0);

    int insert(DatasetRowPermissions p0);

    Item searchDept(Long p0);

    Item searchRole(Long p0);

    int deleteByPrimaryKey(String p0);

    Item searchUser(Long p0);

    List<DataSetRowPermissionsDTO> queryRowPermissions(XpackGridExample p0);
}

