package io.datains.service.sys.impl;

import io.datains.base.domain.SysDeptLeader;
import io.datains.base.domain.SysDeptLeaderAuth;
import io.datains.base.domain.SysUser;
import io.datains.base.mapper.SysDeptLeaderAuthMapper;
import io.datains.base.mapper.SysDeptLeaderMapper;
import io.datains.base.mapper.SysUserMapper;
import io.datains.service.sys.AuthXpackService;
import io.datains.service.sys.SysDeptLeaderAuthService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    @Transactional(rollbackFor = Exception.class)
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
    @Transactional(rollbackFor = Exception.class)
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
    @Transactional(rollbackFor = Exception.class)
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
    @Transactional(rollbackFor = Exception.class)
    public void addAuthToLeaders(Long userId, String authSource, String authSourceType) {
        SysUser sysUser = this.sysUserMapper.selectByPrimaryKey(userId);
        if (sysUser == null || sysUser.getDeptId() == null) {
            return;
        }
        SysDeptLeaderAuth auth = new SysDeptLeaderAuth();
        auth.setDeptId(sysUser.getDeptId());
        auth.setUserId(userId);
        auth.setAuthSource(authSource);
        auth.setAuthSourceType(authSourceType);
        String privilegeType = null;
        if ("dataset".equals(authSourceType)) {
            privilegeType = "15,3,1,20";
        } else if ("link".equals(authSourceType)) {
            privilegeType = "15,3,1";
        } else if ("panel".equals(authSourceType)) {
            privilegeType = "15,3,1,5";
        }
        auth.setPrivilegeType(privilegeType);
        auth.setCreateTime(System.currentTimeMillis());
        auth.setUpdateTime(auth.getCreateTime());
        this.sysDeptLeaderAuthMapper.insertBatch(Collections.singletonList(auth));

        //同步将权限添加到组织负责人身上
        List<Long> leaderIds = this.sysDeptLeaderMapper.selectUserIdsByDeptId(sysUser.getDeptId());
        for (Long leaderId : leaderIds) {
            List<Integer> privilegeTypes = Arrays.stream(auth.getPrivilegeType().split(",")).map(Integer::parseInt).collect(Collectors.toList());
            for (Integer privilegeType1 : privilegeTypes) {
                this.changeAuthForUser(leaderId, authSource, authSourceType, privilegeType1, 1);
            }
        }
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
    @Transactional(rollbackFor = Exception.class)
    public void syncLeaderAuthToUser(Long deptId, int type, List<Long> userIds) {
        if (userIds == null || userIds.isEmpty()) {
            return;
        }
        //先获取此组织下的权限列表
        List<SysDeptLeaderAuth> auths = this.sysDeptLeaderAuthMapper.selectByDeptId(deptId);
        if (auths == null || auths.isEmpty()) {
            return;
        }
        for (SysDeptLeaderAuth auth : auths) {
            //为每一个负责人进行权限修改
            for (Long userId : userIds) {
                //权限的类型，例如授权、查看、导出等
                List<Integer> privilegeTypes = Arrays.stream(auth.getPrivilegeType().split(",")).map(Integer::parseInt).collect(Collectors.toList());
                for (Integer privilegeType : privilegeTypes) {
                    if (type == 1) {
                        this.changeAuthForUser(userId, auth.getAuthSource(), auth.getAuthSourceType(), privilegeType, 1);
                    } else if (type == 2) {
                        this.changeAuthForUser(userId, auth.getAuthSource(), auth.getAuthSourceType(), privilegeType, 0);
                    }
                }
            }
        }

    }

    /**
     * 修改用户的权限
     *
     * @param userId         用户id
     * @param authSource     权限来源
     * @param authSourceType 权限来源类型
     * @param privilegeType  权限类型
     * @param privilegeValue 权限值
     */
    private void changeAuthForUser(Long userId, String authSource, String authSourceType, Integer privilegeType, Integer privilegeValue) {

        this.authXpackService.authChangeForDeptLeader("dept", authSource, authSourceType, userId.toString(), "user", privilegeValue, privilegeType);
    }
}
