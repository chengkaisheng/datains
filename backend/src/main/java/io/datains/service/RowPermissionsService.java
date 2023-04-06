package io.datains.service;

import io.datains.base.mapper.ExtRowPermissionMapper;
import io.datains.dto.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 15:49
 * @Description
 */
@Service
public class RowPermissionsService extends RowPermissionService
{
    @Autowired(required = false)
    private ExtRowPermissionMapper ALLATORIxDEMO;


    @Override
    public List<DataSetRowPermissionsDTO> searchRowPermissions(DataSetRowPermissionsDTO var1) {
        return this.ALLATORIxDEMO.searchRowPermissons(var1);
    }

    @Override
    public List<DataSetRowPermissionsDTO> queryRowPermissions(XpackGridRequest var1) {
        return this.ALLATORIxDEMO.queryRowPermissions(var1.convertExample());
    }

    @Override
    public void save(DatasetRowPermissions var1) {
        if (StringUtils.isEmpty((CharSequence)var1.getId())) {
            var1.setId(UUID.randomUUID().toString());
            var1.setUpdateTime(Long.valueOf(System.currentTimeMillis()));
            this.ALLATORIxDEMO.insert(var1);
            return;
        }
        var1.setUpdateTime(Long.valueOf(System.currentTimeMillis()));
        this.ALLATORIxDEMO.updateByPrimaryKey(var1);
    }

    @Override
    public void delete(String var1) {
        this.ALLATORIxDEMO.deleteByPrimaryKey(var1);
    }

    @Override
    public List<? extends Object> authObjs(DataSetRowPermissionsDTO a) {
        final String authTargetType = a.getAuthTargetType();
        Integer b = -1;
        switch (authTargetType.hashCode()) {
            case 3599307: {
                if (authTargetType.equals(XpackSysAuthDetailExample.ALLATORIxDEMO("P2@3"))) {
                    b = 0;
                    break;
                }
                break;
            }
            case 3506294: {
                if (authTargetType.equals(XpackSysDeptExample.ALLATORIxDEMO("vuh\u007f"))) {
                    b = 1;
                    break;
                }
                break;
            }
            case 3079749: {
                if (authTargetType.equals(XpackSysAuthDetailExample.ALLATORIxDEMO("A$U5"))) {
                    b = 2;
                    break;
                }
                break;
            }
        }
        DatasetRowPermissions datasetRowPermissions = new DatasetRowPermissions();
        datasetRowPermissions.setId(a.getId());
        datasetRowPermissions.setAuthTargetType(a.getAuthTargetType());
        datasetRowPermissions.setAuthTargetId(a.getAuthTargetId());
        datasetRowPermissions.setDatasetId(a.getDatasetId());
        datasetRowPermissions.setDatasetFieldId(a.getDatasetFieldId());
        datasetRowPermissions.setFilter(a.getFilter());
        datasetRowPermissions.setLogic(a.getLogic());
        datasetRowPermissions.setFilterType(a.getFilterType());
        datasetRowPermissions.setEnumCheckField(a.getEnumCheckField());
        datasetRowPermissions.setUpdateTime(a.getUpdateTime());
        switch (b) {
            case 0: {
                return this.ALLATORIxDEMO.searchAuthUsers(datasetRowPermissions);
            }
            case 1: {
                return this.ALLATORIxDEMO.searchAuthRoles(datasetRowPermissions);
            }
            case 2: {
                return this.ALLATORIxDEMO.searchAuthDepts(datasetRowPermissions);
            }
            default: {
                return new ArrayList<Object>();
            }
        }
    }

    @Override
    public DataSetRowPermissionsDTO dataSetRowPermissionInfo(DataSetRowPermissionsDTO var1) {
        final String authTargetType = var1.getAuthTargetType();
        Integer b = -1;
        switch (authTargetType.hashCode()) {
            case 3599307: {
                if (authTargetType.equals(XpackSysDeptExample.ALLATORIxDEMO("qiah"))) {
                    b = 0;
                    break;
                }
                break;
            }
            case 3506294: {
                if (authTargetType.equals(XpackSysAuthDetailExample.ALLATORIxDEMO("W.I$"))) {
                    b = 1;
                    break;
                }
                break;
            }
            case 3079749: {
                if (authTargetType.equals(XpackSysDeptExample.ALLATORIxDEMO("`\u007ftn"))) {
                    b = 2;
                }
                break;
            }
        }
        switch (b) {
            case 0: {
                var1.setAuthTargetName(Optional.ofNullable(this.ALLATORIxDEMO.searchUser(var1.getAuthTargetId())).get().getName());
                return var1;
            }
            case 1: {
                var1.setAuthTargetName(Optional.ofNullable(this.ALLATORIxDEMO.searchRole(var1.getAuthTargetId())).get().getName());
                return var1;
            }
            case 2: {
                var1.setAuthTargetName(Optional.ofNullable(this.ALLATORIxDEMO.searchDept(var1.getAuthTargetId())).get().getName());
                return var1;
            }
            default: {
                return var1;
            }
        }
    }

}

