package io.datains.plugins.server;


import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import io.datains.auth.service.ExtAuthService;
import io.datains.base.domain.SysUsersRolesKey;
import io.datains.base.domain.XpackRoleItemDto;
import io.datains.base.domain.XpackSysRole;
import io.datains.base.mapper.SysUsersRolesMapper;
import io.datains.commons.utils.PageUtils;
import io.datains.commons.utils.Pager;
import io.datains.controller.ResultHolder;
import io.datains.qyy.service.AddRoleService;
import io.datains.qyy.utils.QyyCommon;
import io.datains.service.sys.RoleXpackService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Api(tags = "xpack：角色管理")
@RequestMapping("/plugin/role")
@RestController
public class XRoleServer {

    @Autowired
    private ExtAuthService extAuthService;

    @Resource
    private RoleXpackService roleXpackService;
    @Resource
    private AddRoleService addRoleService;
    @Resource
    private QyyCommon qyyCommon;
    @Resource
    private SysUsersRolesMapper sysUsersRolesMapper;

    @RequiresPermissions("role:add")
    @ApiOperation("新增角色")
    @PostMapping("/create")
    public void create(@RequestBody XpackSysRole role) {
        roleXpackService.save(role);
    }

    @GetMapping("/getRoleById/{roleId}")
    public XpackSysRole getRoleById(@PathVariable Long roleId) {
        if (roleId == null) {
            return null;
        }
        return roleXpackService.queryById(roleId);
    }


    @RequiresPermissions("role:del")
    @ApiOperation("删除角色")
    @PostMapping("/delete/{roleId}")
    public void delete(@PathVariable("roleId") Long roleId) {
        //删除之前判断一下是否已经关联了用户
        List<SysUsersRolesKey> sysUsersRoles = sysUsersRolesMapper.selectByRoleIds(Collections.singletonList(roleId));
        if (!sysUsersRoles.isEmpty()) {
            throw new RuntimeException("角色已经关联了用户");
        }
        extAuthService.clearRoleResource(roleId);
        roleXpackService.delete(roleId);
    }


    @RequiresPermissions("role:edit")
    @ApiOperation("更新角色")
    @PostMapping("/update")
    public void update(@RequestBody XpackSysRole role) {
        roleXpackService.update(role);
    }

    @RequiresPermissions("role:read")
    @ApiOperation("分页查询")
    @PostMapping("/roleGrid/{goPage}/{pageSize}")
    public Pager<List<XpackSysRole>> roleGrid(@PathVariable int goPage, @PathVariable int pageSize, @RequestBody XpackSysRole request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        return PageUtils.setPageInfo(page, roleXpackService.query(request));
    }

    @ApiIgnore
    @PostMapping("/all")
    public List<XpackRoleItemDto> all() {
        return roleXpackService.allRoles();
    }


    @ApiOperation("同步角色到轻应用")
    @GetMapping("/syncRoleToQyy")
    public ResultHolder syncRoleToQyy() {
        List<XpackRoleItemDto> all = roleXpackService.allRoles();
        if (all == null || all.isEmpty()) {
            throw new RuntimeException("角色为空");
        }
        List<AddRoleService.Role> qyyRoles = all.stream().map(item -> AddRoleService.Role.builder()
                .key(item.getId() + "")
                .name(item.getName())
                .describe(item.getDescription())
                .build()
        ).collect(Collectors.toList());
        addRoleService.addRoles(qyyRoles, qyyCommon.getSecretKey(), qyyCommon.getScenId(), qyyCommon.getHost() + "/function/add");
        addRoleService.addRoles(qyyRoles, qyyCommon.getSecretKey2(), qyyCommon.getScenId2(), qyyCommon.getHost() + "/function/add");
        return ResultHolder.success("同步成功");
    }
}
