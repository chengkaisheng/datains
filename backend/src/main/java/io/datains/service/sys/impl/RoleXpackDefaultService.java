package io.datains.service.sys.impl;

import io.dataease.plugins.common.dto.PluginSysMenu;
import io.dataease.plugins.common.entity.XpackGridExample;
import io.datains.base.domain.XpackSysRole;
import io.datains.base.mapper.XpackExtRoleMapper;
import io.datains.base.mapper.XpackSysRoleMapper;
import io.datains.commons.utils.IsNullUtils;
import io.datains.plugins.common.entity.XpackGridRequest;
import io.dataease.plugins.common.util.PluginCommonUtil;
import io.datains.plugins.xpack.role.dto.response.XpackRoleDto;
import io.dataease.plugins.xpack.role.dto.response.XpackRoleItemDto;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.annotation.Resource;

import io.datains.service.sys.RoleXpackService;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 11:08
 * @Description
 */
@Service
public class RoleXpackDefaultService implements RoleXpackService {
    @Resource
    private DataSourceTransactionManager g;

    @Resource
    private XpackSysRoleMapper i;

    @Resource
    TransactionDefinition ALLATORIxDEMO;

    @Resource
    private XpackExtRoleMapper h;

    public void save(XpackSysRole xpackSysRole) {
        Long long_ = Long.valueOf(System.currentTimeMillis());
        xpackSysRole.setCreateTime(long_);
        xpackSysRole.setUpdateTime(long_);
        this.i.insert(xpackSysRole);
    }

    public void update(XpackSysRole xpackSysRole) {
        Long long_ = Long.valueOf(System.currentTimeMillis());
        xpackSysRole.setUpdateTime(long_);
        this.i.updateByPrimaryKey(xpackSysRole);
    }

 /*   public InputStream readContent(String str) {
        return getClass().getClassLoader().getResourceAsStream((new StringBuilder()).insert(0, XpackSysAuthExample.ALLATORIxDEMO("5&'&/1i")).append(str).toString());
    }

    public List<PluginSysMenu> menus() {
        ArrayList<PluginSysMenu> arrayList;
        PluginSysMenu pluginSysMenu1 = K();
        PluginSysMenu pluginSysMenu2 = i();
        PluginSysMenu pluginSysMenu3 = G();
        PluginSysMenu pluginSysMenu4 = a();
        PluginSysMenu pluginSysMenu5 = ALLATORIxDEMO();
        arrayList.add(pluginSysMenu5);
        arrayList.add(pluginSysMenu4);
        arrayList.add(pluginSysMenu3);
        return arrayList.add(pluginSysMenu2);
    }*/

    public List<XpackSysRole> allRoles() {
        return this.h.queryAll();
    }

    public List<XpackSysRole> query(XpackSysRole xpackGridRequest) {
        if (IsNullUtils.isNotNull(xpackGridRequest.getConditions())){
            xpackGridRequest.setName(xpackGridRequest.getConditions().get(0).getValue().toString());
            if (xpackGridRequest.getConditions().get(0).getOperator().equals("like")){
                return (List<XpackSysRole>)this.h.querylike(xpackGridRequest).stream().map(a -> (XpackSysRole)PluginCommonUtil.copyBean(new XpackSysRole(), a)).collect(Collectors.toList());
            }
        }
        return (List<XpackSysRole>)this.h.query(xpackGridRequest).stream().map(a -> (XpackSysRole)PluginCommonUtil.copyBean(new XpackSysRole(), a)).collect(Collectors.toList());
    }

    public void delete(Long long_) {
        try {
            this.i.deleteByPrimaryKey(long_);
            this.h.deleteUserMapping(long_);
            this.h.deleteMenuMapping(long_);
            return;
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }
}