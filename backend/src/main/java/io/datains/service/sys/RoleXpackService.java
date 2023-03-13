package io.datains.service.sys;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 10:52
 * @Description
 */
import io.datains.base.domain.XpackSysRole;

import java.util.List;

    public interface RoleXpackService{
    public abstract void save(XpackSysRole paramXpackRoleDto);

    public abstract void delete(Long paramLong);

    public abstract void update(XpackSysRole paramXpackRoleDto);

    public abstract List<XpackSysRole> query(XpackSysRole paramXpackGridRequest);

    public abstract List<XpackSysRole> allRoles();
}