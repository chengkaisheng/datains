package io.datains.service;

import io.datains.base.domain.*;

import io.datains.base.mapper.ExtColumnPermissionMapper;
import io.datains.base.mapper.SysDeptMapper;
import io.datains.dto.DataSetColumnPermissionsDTO;
import io.datains.dto.DatasetColumnPermissions;
import io.datains.dto.DatasetRowPermissions;
import io.datains.dto.XpackGridRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 17:14
 * @Description
 */
@Service
public class ColumnPermissionsService extends ColumnPermissionService{

    @Autowired(required = false)
    private ExtColumnPermissionMapper ALLATORIxDEMO;
    @Resource
    private SysDeptMapper sysDeptMapper;
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
                return this.searchAuthDepts(var1);
            }
            default: {
                return new ArrayList<Object>();
            }
        }
    }

    private List<Item> searchAuthDepts1(DataSetColumnPermissionsDTO datasetRowPermissions) {
        Map<Long, SysDept> orgMap = new HashMap<>();
        List<SysDept> depts = this.sysDeptMapper.selectAll();
        for (SysDept dept : depts) {
            orgMap.put(dept.getDeptId(), dept);
        }
        List<Item> items = this.ALLATORIxDEMO.searchAuthDepts(datasetRowPermissions);
        for (Item item : items) {
            SysDept dept = orgMap.get(item.getId());
            if (dept.getPid() != 0) {
                SysDept p = orgMap.get(dept.getPid());
                item.setName(p.getName() + "-" + dept.getName());
            }
        }
        return items;
    }

    private List<AuthDept> searchAuthDepts(DataSetColumnPermissionsDTO datasetRowPermissions) {
        Map<Long, AuthDept> orgMap = new HashMap<>();
        List<Item> items = this.ALLATORIxDEMO.searchAuthDepts(datasetRowPermissions);
        for (Item item : items) {
            orgMap.put(item.getId(), new AuthDept());
        }
        List<SysDept> depts = this.sysDeptMapper.selectAll();
        List<AuthDept> orgList = new ArrayList<>();
        for (SysDept dept : depts) {
            if (!orgMap.containsKey(dept.getDeptId())) {
                orgMap.put(dept.getDeptId(), new AuthDept(dept.getDeptId(), dept.getPid(), dept.getName(), false));
            } else {
                orgMap.put(dept.getDeptId(), new AuthDept(dept.getDeptId(), dept.getPid(), dept.getName(), true));
            }
            orgList.add(orgMap.get(dept.getDeptId()));
        }
        Set<Long> retainedIds = new HashSet<>();
        // 筛选需要保留的组织
        for (AuthDept org : orgList) {
            if (org.getAuth()) {
                // 如果当前组织需要保留，则将其及其所有父组织加入 retainedIds
                Long currentId = org.getId();
                while (currentId != 0) { // pid 为 0 表示根节点
                    retainedIds.add(currentId);
                    currentId = orgMap.get(currentId).getPid();
                }
            }
        }
        // 构建树形结构
        List<AuthDept> result = new ArrayList<>();
        for (AuthDept org : orgList) {
            if (retainedIds.contains(org.getId())) {
                // 如果当前组织需要保留
                if (org.getPid() == 0) {
                    // 如果是根节点，直接加入结果列表
                    result.add(org);
                } else {
                    // 否则找到其父组织，并加入父组织的 children 列表
                    AuthDept parent = orgMap.get(org.getPid());
                    parent.addChild(org);
                }
            }
        }
        return result;
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
