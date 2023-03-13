package io.datains.plugins.server;


import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import io.datains.auth.service.ExtAuthService;
import io.datains.base.domain.XpackSysRole;
import io.datains.commons.utils.PageUtils;
import io.datains.commons.utils.Pager;
import io.datains.service.sys.RoleXpackService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.util.List;
@Api(tags = "xpack：角色管理")
@RequestMapping("/plugin/role")
@RestController
public class XRoleServer {

    @Autowired
    private ExtAuthService extAuthService;

    @Resource
    private RoleXpackService roleXpackService;

    @RequiresPermissions("role:add")
    @ApiOperation("新增角色")
    @PostMapping("/create")
    public void create(@RequestBody XpackSysRole role){
        roleXpackService.save(role);
    }


    @RequiresPermissions("role:del")
    @ApiOperation("删除角色")
    @PostMapping("/delete/{roleId}")
    public void delete(@PathVariable("roleId") Long roleId){
        extAuthService.clearDeptResource(roleId);
        roleXpackService.delete(roleId);
    }


    @RequiresPermissions("role:edit")
    @ApiOperation("更新角色")
    @PostMapping("/update")
    public void update(@RequestBody XpackSysRole role){
        roleXpackService.update(role);
    }

    @RequiresPermissions("role:read")
    @ApiOperation("分页查询")
    @PostMapping("/roleGrid/{goPage}/{pageSize}")
    public Pager<List<XpackSysRole>> roleGrid(@PathVariable int goPage, @PathVariable int pageSize, @RequestBody XpackSysRole request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        Pager<List<XpackSysRole>> listPager = PageUtils.setPageInfo(page, roleXpackService.query(request));
        return listPager;
    }

    @ApiIgnore
    @PostMapping("/all")
    public List<XpackSysRole> all() {
        return roleXpackService.allRoles();
    }
}
