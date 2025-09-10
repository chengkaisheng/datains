package io.datains.service.sys.impl;

import io.datains.base.domain.SysDeptLeader;
import io.datains.base.domain.SysDeptLeaderAuth;
import io.datains.base.domain.SysUser;
import io.datains.base.domain.XpackSysDept;
import io.datains.base.mapper.SysDeptLeaderAuthMapper;
import io.datains.base.mapper.SysDeptLeaderMapper;
import io.datains.base.mapper.SysUserMapper;
import io.datains.base.mapper.XpackSysDeptMapper;
import io.datains.base.mapper.ext.ExtDeptMapper;
import io.datains.controller.sys.request.SimpleTreeNode;
import io.datains.dto.authModel.AuthChangeForDeptLeaderDTO;
import io.datains.service.sys.AuthXpackService;
import io.datains.service.sys.SysDeptLeaderAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * sysDeptLeaderAuthImpl
 *
 * @author zhangzihang
 * @since 2025-02-19 14:09
 */
@Service
public class SysDeptLeaderAuthServiceImpl implements SysDeptLeaderAuthService {
    @Resource
    private SysDeptLeaderAuthMapper sysDeptLeaderAuthMapper;
    @Resource
    private SysDeptLeaderMapper sysDeptLeaderMapper;
    @Resource
    private SysUserMapper sysUserMapper;
    @Resource
    private AuthXpackService authXpackService;
    @Autowired(required = false)
    private XpackSysDeptMapper sysDeptMapper;

    @Override
    public void batchInsert(List<Long> userIds, Long deptId) {
        if (userIds == null || userIds.isEmpty()) {
            return;
        }
        List<SysDeptLeader> sysDeptLeaders = new ArrayList<>();
        long l = System.currentTimeMillis();
        for (Long userId : userIds) {
            SysDeptLeader sysDeptLeader = new SysDeptLeader();
            sysDeptLeader.setUserId(userId);
            sysDeptLeader.setDeptId(deptId);
            sysDeptLeader.setCreateTime(l);
            sysDeptLeader.setUpdateTime(l);
            sysDeptLeaders.add(sysDeptLeader);
        }
        this.sysDeptLeaderMapper.batchInsert(sysDeptLeaders);
    }

    @Override
    public void batchDelete(List<Long> deptIds) {
        //查询删除的组织的所有负责人
        for (Long deptId : deptIds) {
            List<Long> userIds = this.sysDeptLeaderMapper.selectUserIdsByDeptId(deptId);
            if (userIds != null && !userIds.isEmpty()) {
                //为删除的用户删除其权限
                this.syncLeaderAuthToUser(deptId, 2, userIds);
            }
        }
        //删除组织权限记录
        this.sysDeptLeaderAuthMapper.batchDeleteByDeptIds(deptIds);
        //删除组织负责人记录
        this.sysDeptLeaderMapper.batchDeleteByDeptIds(deptIds);
    }

    @Override
    public void syncDeptLeaders(List<Long> userIds, Long deptId) {
        List<Long> existingUserIds = sysDeptLeaderMapper.selectUserIdsByDeptId(deptId);
        Set<Long> existingUserIdSet = new HashSet<>(existingUserIds);
        //寻找未添加进去的用户
        List<Long> newUserIds = userIds.stream()
                .filter(userId -> !existingUserIdSet.contains(userId))
                .collect(Collectors.toList());
        if (!newUserIds.isEmpty()) {
            //创建组织负责人
            this.batchInsert(newUserIds, deptId);
            //为负责人新增负责人应该有的权限
            this.syncLeaderAuthToUser(deptId, 1, newUserIds);
        }
        //寻找已经删除的用户
        List<Long> deletedUserIds = existingUserIds.stream()
                .filter(userId -> !userIds.contains(userId))
                .collect(Collectors.toList());
        if (!deletedUserIds.isEmpty()) {
            //为删除的用户删除其权限
            this.syncLeaderAuthToUser(deptId, 2, deletedUserIds);
            //删除组织负责人
            this.sysDeptLeaderMapper.batchDelete(deptId, deletedUserIds);
        }
    }

    @Override
    public void addAuthToLeadersByDeptId(Long deptId, Long userId, List<String> authSources, String authSourceType) {
        while (deptId != null && deptId > 0) {
            List<SysDeptLeaderAuth> auths = new ArrayList<>();
            for (String authSource : authSources) {
                //要判断是否重复，根据授予的组织以及资源进行判断
                if (this.sysDeptLeaderAuthMapper.getCountByDeptIdAndSource(deptId, authSource, authSourceType) > 0) {
                    continue;
                }

                SysDeptLeaderAuth auth = new SysDeptLeaderAuth();
                auth.setDeptId(deptId);
                auth.setUserId(userId);
                auth.setAuthSource(authSource);
                auth.setAuthSourceType(authSourceType);
                auth.setCreateTime(System.currentTimeMillis());
                auth.setUpdateTime(auth.getCreateTime());
                auths.add(auth);
            }
            if (!auths.isEmpty()) {
                this.sysDeptLeaderAuthMapper.insertBatch(auths);
            }
            //同步将权限添加到组织负责人身上
            List<Long> leaderIds = this.sysDeptLeaderMapper.selectUserIdsByDeptId(deptId);
            if (leaderIds != null && !leaderIds.isEmpty()) {
                for (Long leaderId : leaderIds) {
                    //组装权限信息
                    List<AuthChangeForDeptLeaderDTO> a = new ArrayList<>();
                    for (String authSource : authSources) {
                        AuthChangeForDeptLeaderDTO tmp = new AuthChangeForDeptLeaderDTO();
                        tmp.setAuthSource(authSource);
                        tmp.setAuthSourceType(authSourceType);
                        a.add(tmp);
                    }
                    this.authXpackService.authAddForDeptLeader(leaderId, a);
                }
            }
            //获取上级组织id，循环添加权限信息
            XpackSysDept dept = sysDeptMapper.selectByPrimaryKey(deptId);
            deptId = dept.getPid();
        }
    }

    @Override
    public void deleteAuthToLeadersByDeptId(Long deptId, Long userId, List<String> authSources, String authSourceType) {
        //删除组织权限记录
        this.sysDeptLeaderAuthMapper.deleteByDeptIdAndSource(userId, deptId, authSources, authSourceType);
        //先查询出该组织下的负责人
        List<Long> leaderIds = this.sysDeptLeaderMapper.selectUserIdsByDeptId(deptId);
        if (leaderIds != null && !leaderIds.isEmpty()) {
            for (Long leaderId : leaderIds) {
                //先判断应该删除哪些资源
                List<String> shouldRemoveAuth = this.shouldRemoveAuth(deptId, userId, authSources, 2);
                //删除负责人的权限
                this.authXpackService.authBatchDelForDeptLeader(leaderId, shouldRemoveAuth);
            }
        }
    }

    @Override
    public void addAuthToLeaders(Long userId, String authSource, String authSourceType) {
        SysUser sysUser = this.sysUserMapper.selectByPrimaryKey(userId);
        if (sysUser == null || sysUser.getDeptId() == null) {
            return;
        }
        //开始进行权限处理
        Long deptId = sysUser.getDeptId();
        addAuthToLeadersByDeptId(deptId, userId, Collections.singletonList(authSource), authSourceType);
    }

    @Override
    public List<Long> selectUserIdsByDeptId(Long deptId) {
        return this.sysDeptLeaderMapper.selectUserIdsByDeptId(deptId);
    }

    @Override
    public void deleteByAuthSource(String authSource) {
        this.sysDeptLeaderAuthMapper.deleteByAuthSource(authSource);
    }

    /**
     * 将组织下的权限同步至组织负责人身上
     * 调用时机：新增或者删除组织负责人时
     *
     * @param deptId 组织id
     * @param type   1-新增 2-删除
     */
    public void syncLeaderAuthToUser(Long deptId, int type, List<Long> userIds) {
        if (userIds == null || userIds.isEmpty()) {
            return;
        }
        //先获取此组织下的权限列表
        List<SysDeptLeaderAuth> auths = this.sysDeptLeaderAuthMapper.selectByDeptId(deptId);
        if (auths == null || auths.isEmpty()) {
            return;
        }
        //为每一个负责人进行权限修改
        for (Long userId : userIds) {
            if (type == 1) {
                //给负责人新增权限
                //组装权限信息
                List<AuthChangeForDeptLeaderDTO> a = new ArrayList<>();
                for (SysDeptLeaderAuth auth : auths) {
                    AuthChangeForDeptLeaderDTO tmp = new AuthChangeForDeptLeaderDTO();
                    tmp.setAuthSource(auth.getAuthSource());
                    tmp.setAuthSourceType(auth.getAuthSourceType());
                    a.add(tmp);
                }
                this.authXpackService.authAddForDeptLeader(userId, a);

            } else if (type == 2) {
                //先判断应该删除哪些资源
                List<String> shouldRemoveAuth = this.shouldRemoveAuth(deptId, userId, auths.stream().map(SysDeptLeaderAuth::getAuthSource).collect(Collectors.toList()), 1);
                if (shouldRemoveAuth.isEmpty()) {
                    continue;
                }
                //删除负责人的权限
                this.authXpackService.authBatchDelForDeptLeader(userId, shouldRemoveAuth);
            }
        }
    }

    @Resource
    private ExtDeptMapper extDeptMapper;

    /**
     * 用来判断组织负责人的权限是否需要移除，把不需要移除的资源从列表中去除
     *
     * @param deptId      组织id
     * @param userId      用户id
     * @param authSources 待移除的资源列表
     * @param type        1-删除组织负责人时 2-去除组织权限时
     * @return 需要移除的资源列表
     */
    private List<String> shouldRemoveAuth(Long deptId, Long userId, List<String> authSources, int type) {
        List<String> shouldRemoveAuth = new ArrayList<>();
        if (authSources == null || authSources.isEmpty()) {
            return shouldRemoveAuth;
        }
        //先获取所有的组织信息
        List<SimpleTreeNode> deptNodes = extDeptMapper.allNodes();
        //获取此人的所有负责的组织
        List<Long> leaderDeptIds = this.sysDeptLeaderMapper.selectDeptIdsByUserId(userId);

        if (leaderDeptIds == null || leaderDeptIds.isEmpty()) {
            //此人没有其他组织的负责人身份，则全部移除
            return authSources;
        }
        Map<Long, SimpleTreeNode> deptMap = deptNodes.stream().collect(Collectors.toMap(SimpleTreeNode::getId, SimpleTreeNode -> SimpleTreeNode));
        if (type == 1) {
            // 删除组织负责人时
            // 判断依据:
            // 如果此人还是父组织的负责人，则不删除权限；
            // 如果此人不是父组织的负责人，但还有其他组织的负责人身份，则需要判断资源是否被其他组织使用，如果被其他组织使用，则不能删除

            //这里需要去除一下参数中的组织
            leaderDeptIds.remove(deptId);
            //判断其中有没有父组织
            if (hasAncestorInList(deptMap, deptId, leaderDeptIds)) {
                //如果此人还是父组织的负责人，则不删除权限；
                return shouldRemoveAuth;
            } else {
                //如果此人不是父组织的负责人，但还有其他组织的负责人身份
                //继续判断待移除的资源是否被其他自己负责的组织使用
                return shouldRemoveAuth(leaderDeptIds, authSources);
            }
        } else if (type == 2) {
            // 删除组织资源时
            return shouldRemoveAuth(leaderDeptIds, authSources);
        } else {
            return shouldRemoveAuth;
        }
    }

    /**
     * 检查 targetId 的祖先链是否存在于 idList 中
     *
     * @param deptMap  全部部门
     * @param targetId 目标部门ID
     * @param idList   待检查的ID列表
     * @return 如果idList包含targetId或其任意祖先则返回true，否则返回false
     */
    private boolean hasAncestorInList(Map<Long, SimpleTreeNode> deptMap, Long targetId, List<Long> idList) {
        // 边界检查：如果idList为空直接返回false
        if (idList == null || idList.isEmpty()) {
            return false;
        }
        // 将ID列表转为HashSet提高查询效率
        Set<Long> idSet = new HashSet<>(idList);
        // 从targetId开始向上遍历祖先链
        Long currentId = targetId;
        while (currentId != null) {
            // 如果当前ID在集合中，返回true
            if (idSet.contains(currentId)) {
                return true;
            }
            // 获取当前部门对象
            SimpleTreeNode dept = deptMap.get(currentId);
            if (dept == null) {
                break; // 数据不完整，终止遍历
            }
            // 移动到父节点
            currentId = dept.getPid();
        }
        return false;
    }

    /**
     * 判断待移除的资源列表中，是否被赋予了组织列表中的其他组织
     *
     * @param leaderDeptIds 组织列表
     * @param authSources   待删除的资源
     */
    private List<String> shouldRemoveAuth(List<Long> leaderDeptIds, List<String> authSources) {
        //首先查询一下这些资源在数据库中还存在多少
        List<SysDeptLeaderAuth> leaderAuths = this.sysDeptLeaderAuthMapper.selectBySource(authSources);
        if (leaderAuths == null || leaderAuths.isEmpty()) {
            //没有一个还在数据库中，全部删除
            return authSources;
        }
        //再一条一条的筛选这些数据的组织是否在组织列表中
        for (SysDeptLeaderAuth leaderAuth : leaderAuths) {
            if (leaderDeptIds.contains(leaderAuth.getDeptId())) {
                //这个资源被其他组织使用，不可以删除
                authSources.remove(leaderAuth.getAuthSource());
            }
        }
        return authSources;
    }
}
