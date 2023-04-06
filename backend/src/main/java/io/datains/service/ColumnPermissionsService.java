package io.datains.service;

import io.datains.base.domain.EmailTemplateEntity;

import io.datains.base.domain.XpackSysAuthExample;
import io.datains.base.mapper.ExtColumnPermissionMapper;
import io.datains.dto.DataSetColumnPermissionsDTO;
import io.datains.dto.DatasetColumnPermissions;
import io.datains.dto.XpackGridRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 17:14
 * @Description
 */
@Service
public class ColumnPermissionsService extends ColumnPermissionService{

    @Autowired(required = false)
    private ExtColumnPermissionMapper ALLATORIxDEMO;

    @Override
    public List<DataSetColumnPermissionsDTO> searchPermissions(DataSetColumnPermissionsDTO var1) {
        return this.ALLATORIxDEMO.searchPermissions(var1);
    }

    @Override
    public List<DataSetColumnPermissionsDTO> queryPermissions(XpackGridRequest var1) {
        return this.ALLATORIxDEMO.queryPermissions(var1.convertExample());
    }

    @Override
    public DatasetColumnPermissions save(DatasetColumnPermissions var1) {
        if (StringUtils.isEmpty((CharSequence)var1.getId())) {
            var1.setId(UUID.randomUUID().toString());
            var1.setUpdateTime(Long.valueOf(System.currentTimeMillis()));
            this.ALLATORIxDEMO.insert(var1);
            return var1;
        }
        var1.setUpdateTime(Long.valueOf(System.currentTimeMillis()));
        this.ALLATORIxDEMO.updateByPrimaryKey(var1);
        return var1;
    }

    @Override
    public void delete(String var1) {
        this.ALLATORIxDEMO.deleteByPrimaryKey(var1);
    }

    @Override
    public List<? extends Object> authObjs(DataSetColumnPermissionsDTO var1) {
        final String authTargetType = var1.getAuthTargetType();
        Integer b = -1;
        switch (authTargetType.hashCode()) {
            case 3599307: {
                if (authTargetType.equals(EmailTemplateEntity.ALLATORIxDEMO("c.s/"))) {
                    b = 0;
                    break;
                }
                break;
            }
            case 3506294: {
                if (authTargetType.equals(XpackSysAuthExample.ALLATORIxDEMO(" )>#"))) {
                    b = 1;
                    break;
                }
                break;
            }
            case 3079749: {
                if (authTargetType.equals(EmailTemplateEntity.ALLATORIxDEMO("r8f)"))) {
                    b = 2;
                    break;
                }
                break;
            }
        }
        switch (b) {
            case 0: {
                return this.ALLATORIxDEMO.searchAuthUsers(var1);
            }
            case 1: {
                return this.ALLATORIxDEMO.searchAuthRoles(var1);
            }
            case 2: {
                return this.ALLATORIxDEMO.searchAuthDepts(var1);
            }
            default: {
                return new ArrayList<Object>();
            }
        }
    }

    @Override
    public DataSetColumnPermissionsDTO permissionInfo(DataSetColumnPermissionsDTO var1) {
        final String authTargetType = var1.getAuthTargetType();
        Integer b = -1;
        switch (authTargetType.hashCode()) {
            case 3599307: {
                if (authTargetType.equals(XpackSysAuthExample.ALLATORIxDEMO("'574"))) {
                    b = 0;
                    break;
                }
                break;
            }
            case 3506294: {
                if (authTargetType.equals(EmailTemplateEntity.ALLATORIxDEMO("d2z8"))) {
                    b = 1;
                    break;
                }
                break;
            }
            case 3079749: {
                if (authTargetType.equals(XpackSysAuthExample.ALLATORIxDEMO("6#\"2"))) {
                    b = 2;
                    break;
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
