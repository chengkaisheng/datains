package io.datains.service;


import io.datains.dto.DataSetColumnPermissionsDTO;
import io.datains.dto.DatasetColumnPermissions;
import io.datains.dto.XpackGridRequest;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 17:13
 * @Description
 */
public abstract class ColumnPermissionService{

    public abstract List<DataSetColumnPermissionsDTO> searchPermissions(DataSetColumnPermissionsDTO var1);

    public abstract List<DataSetColumnPermissionsDTO> queryPermissions(XpackGridRequest var1);

    public abstract DatasetColumnPermissions save(DatasetColumnPermissions var1);

    public abstract void delete(String var1);

    public abstract List<? extends Object> authObjs(DataSetColumnPermissionsDTO var1);

    public abstract DataSetColumnPermissionsDTO permissionInfo(DataSetColumnPermissionsDTO var1);
}
