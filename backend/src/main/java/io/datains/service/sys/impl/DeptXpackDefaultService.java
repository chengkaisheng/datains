package io.datains.service.sys.impl;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 15:41
 * @Description
 */

import io.dataease.plugins.common.util.PluginCommonUtil;
import io.datains.base.domain.SysUser;
import io.datains.base.domain.XpackGridRequest;
import io.datains.base.domain.XpackMoveDept;
import io.datains.base.domain.XpackSysDept;
import io.datains.base.mapper.SysUserMapper;
import io.datains.base.mapper.XpackExtDeptMapper;
import io.datains.base.mapper.XpackSysDeptMapper;
import io.datains.controller.sys.response.XpackDeptTreeNode;
import io.datains.dto.XpackSysDeptDTO;
import io.datains.plugins.xpack.dept.dto.request.XpackCreateDept;
import io.datains.service.sys.DeptXpackService;
import io.datains.service.sys.SysDeptLeaderAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeptXpackDefaultService implements DeptXpackService {
    @Resource
    private SysDeptLeaderAuthService sysDeptLeaderAuthService;
    @Resource
    private SysUserMapper sysUserMapper;

    @Transactional(rollbackFor = Exception.class)
    public int add(XpackSysDeptDTO xpackSysDept) {
        if (xpackSysDept.isTop())
            xpackSysDept.setPid(DEPT_ROOT_PID);
        List<XpackSysDept> list;
        if (!CollectionUtils.isEmpty(list = nodesByPids(xpackSysDept.getPid(), xpackSysDept.getName()))) {
            return -2;
        }
        long l = System.currentTimeMillis();
        xpackSysDept.setCreateTime(Long.valueOf(l));
        xpackSysDept.setUpdateTime(Long.valueOf(l));
        xpackSysDept.setCreateBy(null);
        xpackSysDept.setUpdateBy(null);
        xpackSysDept.setSubCount(G);
        try {
            int i = this.i.insert(xpackSysDept);
            Long long_ = null;
            if ((long_ = xpackSysDept.getPid()) != DEPT_ROOT_PID)
                this.h.incrementalSubcount(long_);
            if (i == 1) {
                this.sysDeptLeaderAuthService.batchInsert(Collections.singletonList(xpackSysDept.getLeaderId()), xpackSysDept.getDeptId());
                return i;
            }
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
        return -1;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int update(XpackSysDeptDTO sysDeptDTO) {
        this.sysDeptLeaderAuthService.syncDeptLeaders(Collections.singletonList(sysDeptDTO.getLeaderId()), sysDeptDTO.getDeptId());
        return this.i.updateByPrimaryKeySelective(sysDeptDTO);
    }

    public List<XpackSysDept> nodesByPid(Long long_) {
        XpackSysDept xpackSysDept = new XpackSysDept();
        xpackSysDept.setPid(long_);
        return this.i.selectByExample(xpackSysDept);
    }

    public List<XpackSysDept> nodesByPids(Long long_, String name) {
        XpackSysDept xpackSysDept = new XpackSysDept();
        xpackSysDept.setPid(long_);
        xpackSysDept.setName(name);
        return this.i.selectByExample(xpackSysDept);
    }

    @Override
    public List<XpackSysDept> nodesTreeByCondition(XpackGridRequest paramXpackGridRequest) {
        XpackSysDept xpackSysDept = new XpackSysDept();
        xpackSysDept.setName(paramXpackGridRequest.getConditions().get(0).getValue().toString());
        if (paramXpackGridRequest.getConditions().get(0).getOperator().equals("eq")) {
            if (xpackSysDept.getName().equals("0")) {
                xpackSysDept.setName(null);
                xpackSysDept.setPid(Long.valueOf(0));
            }
            return i.selectByExample(xpackSysDept);
        }
        return i.selectLikeName(xpackSysDept);
    }

    @Override
    public List<XpackDeptTreeNode> searchTree(Long paramLong) {
        return null;
    }

    private static final Integer G = Integer.valueOf(0);

/*
    public List<XpackDeptTreeNode> searchTree(Long long_) {
        List<XpackSysDept> list = nodesByPid(Long.valueOf(0L));
        if (long_ == DEPT_ROOT_PID)
            return (List<XpackDeptTreeNode>)list.stream().map(xpackSysDept -> {
                XpackDeptTreeNode xpackDeptTreeNode = new XpackDeptTreeNode();
                xpackDeptTreeNode.setId(xpackSysDept.getDeptId());
                xpackDeptTreeNode.setLabel(xpackSysDept.getName());
                xpackDeptTreeNode.setHasChildren(Boolean.valueOf((xpackSysDept.getSubCount().intValue() > 0)));
                return xpackDeptTreeNode;
            }).collect(Collectors.toList());
        XpackSysDept xpackSysDept2 = this.i.selectByPrimaryKey(long_);
        if (list.stream().anyMatch(xpackSysDept -> (xpackSysDept.getDeptId() == a)))
            return (List<XpackDeptTreeNode>)list.stream().map(xpackSysDept -> {
                XpackDeptTreeNode xpackDeptTreeNode = new XpackDeptTreeNode();
                xpackDeptTreeNode.setId(xpackSysDept.getDeptId());
                xpackDeptTreeNode.setLabel(xpackSysDept.getName());
                xpackDeptTreeNode.setHasChildren(Boolean.valueOf((xpackSysDept.getSubCount().intValue() > 0)));
                return xpackDeptTreeNode;
            }).collect(Collectors.toList());
        XpackSysDept xpackSysDept1 = xpackSysDept2;
        XpackDeptTreeNode xpackDeptTreeNode1 = ALLATORIxDEMO(xpackSysDept2);
        if (xpackSysDept1.getPid() != DEPT_ROOT_PID) {
            XpackSysDept xpackSysDept;
            XpackDeptTreeNode xpackDeptTreeNode = ALLATORIxDEMO(xpackSysDept = this.i.selectByPrimaryKey(xpackSysDept1.getPid()));
            xpackDeptTreeNode.setChildren(xpackDeptTreeNode1.toList());
            xpackSysDept1 = xpackSysDept;
            xpackDeptTreeNode1 = xpackDeptTreeNode;
        }
        XpackDeptTreeNode xpackDeptTreeNode2 = xpackDeptTreeNode1;
        return (List<XpackDeptTreeNode>)list.stream().map(xpackSysDept -> (xpackSysDept.getDeptId() == xpackDeptTreeNode.getId()) ? xpackDeptTreeNode : ALLATORIxDEMO(xpackSysDept)).collect(Collectors.toList());
    }

    public List<XpackSysDept> nodesTreeByCondition(XpackGridRequest xpackGridRequest) {

    }
*/

    public static final Long DEPT_ROOT_PID = Long.valueOf(0L);

    @Resource
    private DataSourceTransactionManager g;

    @Autowired(required = false)
    private XpackExtDeptMapper h;

    @Autowired(required = false)
    private XpackSysDeptMapper i;

    @Resource
    TransactionDefinition ALLATORIxDEMO;

    public int update(XpackCreateDept xpackCreateDept) {
        TransactionStatus transactionStatus = this.g.getTransaction(this.ALLATORIxDEMO);
        XpackSysDept xpackSysDept2 = PluginCommonUtil.copyBean(new XpackSysDept(), xpackCreateDept);
        if (xpackCreateDept.isTop())
            xpackSysDept2.setPid(DEPT_ROOT_PID);
        xpackSysDept2.setUpdateTime(Long.valueOf(System.currentTimeMillis()));
        xpackSysDept2.setUpdateBy(null);
        Long long_ = xpackSysDept2.getDeptId();
        XpackSysDept xpackSysDept1 = this.i.selectByPrimaryKey(long_);
        List<XpackSysDept> list = nodesByPid(xpackSysDept2.getPid());
        int i = -1;
        try {
            if (xpackSysDept2.getPid() != xpackSysDept1.getPid()) {
                Long long_1 = xpackSysDept1.getPid();
                if (!CollectionUtils.isEmpty(list)) {
                    this.g.commit(transactionStatus);
                    return -2;
                }
                if (long_1 != DEPT_ROOT_PID)
                    this.h.decreasingSubcount(long_1);
                if (xpackSysDept2.getPid() != DEPT_ROOT_PID)
                    this.h.incrementalSubcount(xpackSysDept2.getPid());
            }
            if (!CollectionUtils.isEmpty(list)) {
                this.g.commit(transactionStatus);
                return -2;
            }
            i = this.i.updateByPrimaryKeySelective(xpackSysDept2);
            this.g.commit(transactionStatus);
            return i;
        } catch (Exception exception) {
            this.g.rollback(transactionStatus);
            throw new RuntimeException(exception);
        }
    }

    public void move(XpackMoveDept xpackMoveDept) {
        TransactionStatus transactionStatus = this.g.getTransaction(this.ALLATORIxDEMO);
        try {
            Long long_1 = xpackMoveDept.getResourceId();
            Long long_2 = xpackMoveDept.getTargetId();
            XpackSysDept xpackSysDept = this.i.selectByPrimaryKey(long_1);
            xpackSysDept = new XpackSysDept();
            xpackSysDept.setDeptId(long_1);
            xpackSysDept.setPid(long_2);
            this.h.incrementalSubcount(long_2);
            this.i.updateByPrimaryKeySelective(xpackSysDept);
            this.h.decreasingSubcount(xpackSysDept.getPid());
            return;
        } catch (Exception exception) {}
        this.g.rollback(transactionStatus);

    }

    @Override
    public List<SysUser> getDeptLeader(Long deptId) {
        List<Long> userIds = this.sysDeptLeaderAuthService.selectUserIdsByDeptId(deptId);
        if (userIds == null || userIds.isEmpty()) {
            return Collections.emptyList();
        }
        return this.sysUserMapper.selectByUserIds(userIds);
    }

    @Transactional(rollbackFor = Exception.class)
    public int batchDelete(List<XpackSysDept> list) {
        int i = -1;
        try {
            list.stream().map(xpackDeleteDept -> {
                Long long_;
                if ((long_ = xpackDeleteDept.getPid()) != DEPT_ROOT_PID)
                    this.h.decreasingSubcount(long_);
                return xpackDeleteDept.getDeptId();
            }).collect(Collectors.toList());
            List<Long> ids = new ArrayList<>();
            for (int i1 = 0; i1 < list.size(); i1++) {
                System.err.println();
                ids.add(list.get(i1).getDeptId());
            }
            i = this.h.batchDelete(ids);
            this.h.updateUserDeptId(ids);
            //处理组织负责人
            this.sysDeptLeaderAuthService.batchDelete(ids);
            return i;
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

   /* protected InputStream readContent(String str) {
        return getClass().getClassLoader().getResourceAsStream((new StringBuilder()).insert(0, XpackSysAuthDetailExample.ALLATORIxDEMO("2Q Q(Fn")).append(str).toString());
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
}

