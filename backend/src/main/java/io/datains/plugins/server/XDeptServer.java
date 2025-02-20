package io.datains.plugins.server;


import io.datains.auth.service.ExtAuthService;
import io.datains.base.domain.SysUser;
import io.datains.base.domain.XpackGridRequest;
import io.datains.base.domain.XpackMoveDept;
import io.datains.base.domain.XpackSysDept;
import io.datains.commons.utils.BeanUtils;
import io.datains.controller.sys.response.DeptNodeResponse;
import io.datains.controller.sys.response.DeptTreeNode;
import io.datains.dto.XpackSysDeptDTO;
import io.datains.service.sys.DeptService;
import io.datains.service.sys.DeptXpackService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.stream.Collectors;
@Api(tags = "xpack：部门管理")
@RequestMapping("/plugin/dept")
@RestController
public class XDeptServer {

    @Autowired
    private ExtAuthService extAuthService;

    @Autowired
    private DeptXpackService deptService;

    @Autowired
    private DeptService deptServices;

    @ApiOperation("查询子节点")
    @PostMapping("/childNodes/{pid}")
    public List<DeptNodeResponse> childNodes(@PathVariable("pid") Long pid){
        List<XpackSysDept> nodes = deptService.nodesByPid(pid);
        List<DeptNodeResponse> nodeResponses = nodes.stream().map(node -> {
            DeptNodeResponse deptNodeResponse = BeanUtils.copyBean(new DeptNodeResponse(), node);
            deptNodeResponse.setHasChildren(node.getSubCount() > 0);
            deptNodeResponse.setLeaf(node.getSubCount() == 0);
            deptNodeResponse.setTop(node.getPid() == 0L);
            return deptNodeResponse;
        }).collect(Collectors.toList());
        return nodeResponses;
    }

    @ApiOperation("搜索组织树")
    @PostMapping("/search")
    public List<DeptNodeResponse> search(@RequestBody XpackGridRequest request){
        List<XpackSysDept> ndoes = deptService.nodesTreeByCondition(request);
        List<DeptNodeResponse> nodeResponses = ndoes.stream().map(node -> {
            DeptNodeResponse deptNodeResponse = BeanUtils.copyBean(new DeptNodeResponse(), node);
            deptNodeResponse.setHasChildren(node.getSubCount() > 0);
            deptNodeResponse.setLeaf(node.getSubCount() == 0);
            deptNodeResponse.setTop(node.getPid() == 0L);
            return deptNodeResponse;
        }).collect(Collectors.toList());
        return nodeResponses;
    }

    @ApiIgnore
    @PostMapping("/root")
    public  List<XpackSysDept> rootData(){
        List<XpackSysDept> nodes = deptService.nodesByPid(null);
        return nodes;
    }

    @RequiresPermissions("dept:add")
    @ApiOperation("创建")
    @PostMapping("/create")
    public int create(@RequestBody XpackSysDeptDTO dept){

        return deptService.add(dept);
    }

    @RequiresPermissions("dept:add")
    @ApiOperation("获取组织负责人")
    @GetMapping("/getDeptLeader/{deptId}")
    public List<SysUser> getDeptLeader(@PathVariable Long deptId){

        return deptService.getDeptLeader(deptId);
    }

    @RequiresPermissions("dept:del")
    @ApiOperation("删除")
    @PostMapping("/delete")
    public void delete(@RequestBody List<XpackSysDept> requests){
        requests.forEach(request -> {
            extAuthService.clearDeptResource(request.getDeptId());
        });
        deptService.batchDelete(requests);

    }

    @RequiresPermissions("dept:edit")
    @ApiOperation("更新")
    @PostMapping("/update")
    public int update(@RequestBody XpackSysDeptDTO dept){
        return deptService.update(dept);
    }



    @ApiIgnore
    @PostMapping("/nodesByDeptId/{deptId}")
    public List<DeptTreeNode> nodesByDeptId(@PathVariable("deptId") Long deptId){
        return deptServices.searchTree(deptId);
    }

    @RequiresPermissions("dept:edit")
    @ApiOperation("移动")
    @PostMapping("/move")
    public void move(@RequestBody XpackMoveDept xpackMoveDept){
        deptService.move(xpackMoveDept);
    }
}
