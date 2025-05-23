package io.datains.service.sys;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 10:52
 * @Description
 */

import io.datains.base.domain.XpackRoleItemDto;
import io.datains.base.domain.XpackSysRole;

import java.util.List;

public interface RoleXpackService {
    void save(XpackSysRole paramXpackRoleDto);

    void delete(Long paramLong);

    void update(XpackSysRole paramXpackRoleDto);

    List<XpackSysRole> query(XpackSysRole paramXpackGridRequest);

    List<XpackRoleItemDto> allRoles();

    XpackSysRole queryById(Long roleId);
}
