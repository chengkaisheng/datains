package io.datains.service;

import io.datains.dto.DataSetRowPermissionsDTO;
import io.datains.dto.DatasetRowPermissions;
import io.datains.dto.XpackGridRequest;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 15:32
 * @Description
 */
public abstract class RowPermissionService{
    public RowPermissionService() {
    }

    public abstract List<DataSetRowPermissionsDTO> searchRowPermissions(DataSetRowPermissionsDTO var1);

    public abstract List<DataSetRowPermissionsDTO> queryRowPermissions(XpackGridRequest var1);

    public abstract void save(DatasetRowPermissions var1);

    public abstract void delete(String var1);

    public abstract List<? extends Object> authObjs(DataSetRowPermissionsDTO var1);

    public abstract DataSetRowPermissionsDTO dataSetRowPermissionInfo(DataSetRowPermissionsDTO var1);
}