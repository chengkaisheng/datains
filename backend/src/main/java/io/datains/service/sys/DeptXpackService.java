package io.datains.service.sys;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 15:35
 * @Description
 */

import io.datains.base.domain.SysUser;
import io.datains.base.domain.XpackGridRequest;
import io.datains.base.domain.XpackMoveDept;
import io.datains.base.domain.XpackSysDept;
import io.datains.controller.sys.response.XpackDeptTreeNode;
import io.datains.dto.XpackSysDeptDTO;

import java.util.List;

public interface DeptXpackService {
    List<XpackSysDept> nodesByPid(Long paramLong);

    List<XpackSysDept> nodesTreeByCondition(XpackGridRequest paramXpackGridRequest);

    List<XpackDeptTreeNode> searchTree(Long paramLong);

    int add(XpackSysDeptDTO paramXpackCreateDept);

    int update(XpackSysDeptDTO paramXpackCreateDept);

    int batchDelete(List<XpackSysDept> paramList);

    void move(XpackMoveDept paramXpackMoveDept);

    List<SysUser> getDeptLeader(Long deptId);
}
