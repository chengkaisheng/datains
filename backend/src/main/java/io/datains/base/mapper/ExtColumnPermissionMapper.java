package io.datains.base.mapper;

import io.datains.base.domain.Item;
import io.datains.dto.DataSetColumnPermissionsDTO;
import io.datains.dto.DatasetColumnPermissions;
import io.datains.dto.XpackGridExample;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 17:28
 * @Description
 */
public interface ExtColumnPermissionMapper
{
    List<Item> searchAuthUsers(final DataSetColumnPermissionsDTO p0);

    List<DataSetColumnPermissionsDTO> queryPermissions(final XpackGridExample p0);

    Item searchRole(final Long p0);

    List<Item> searchAuthRoles(final DataSetColumnPermissionsDTO p0);

    Item searchDept(final Long p0);

    int deleteByPrimaryKey(final String p0);

    Item searchUser(final Long p0);

    List<Item> searchAuthDepts(final DataSetColumnPermissionsDTO p0);

    int insert(final DatasetColumnPermissions p0);

    List<DataSetColumnPermissionsDTO> searchPermissions(final DataSetColumnPermissionsDTO p0);

    int updateByPrimaryKey(final DatasetColumnPermissions p0);
}
