package io.datains.service.sys.impl;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:26
 * @Description
 */

import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.ObjectUtil;
import io.dataease.plugins.common.constants.PluginSystemConstants;
import io.datains.auth.api.dto.CurrentRoleDto;
import io.datains.base.domain.*;
import io.datains.base.mapper.*;
import io.datains.commons.utils.AuthUtils;
import io.datains.commons.utils.IsNullUtils;
import io.datains.dto.authModel.AuthChangeForDeptLeaderDTO;
import io.datains.service.sys.AuthXpackService;
import io.datains.service.sys.RoleXpackService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthXpackDefaultService implements AuthXpackService {
    @Resource
    private XpackExtSysAuthMapper B;

    @Resource
    private XpackExtVAuthModelMapper g;

    @Resource
    private XpackExtSysAuthDetailMapper i;

    @Resource
    private XpackSysAuthDetailMapper xpackSysAuthDetailMapper;
    @Resource
    private RoleXpackService roleXpackService;
    @Resource
    private XpackExtRoleMapper xpackExtRoleMapper;
    @Resource
    private SysUsersRolesMapper sysUsersRolesMapper;

    public List<XpackVAuthModelDTO> searchAuthModelTree(XpackBaseTreeRequest xpackBaseTreeRequest, Long long_, Boolean bool) {
        xpackBaseTreeRequest.setCreateBy(String.valueOf(long_));
        if ("dept".equals(xpackBaseTreeRequest.getModelType())
                || "user".equals(xpackBaseTreeRequest.getModelType())
                || "role".equals(xpackBaseTreeRequest.getModelType())
                || ("menu".equals(xpackBaseTreeRequest.getModelType()))) {
            boolean isAdmin = false;
            //判断用户是否为超级管理员
            List<CurrentRoleDto> currentRoleDtos = AuthUtils.getUser().getRoles();
            if (ObjectUtil.isNotEmpty(currentRoleDtos)) {
                List<XpackVAuthModelDTO> all = this.g.searchTree(xpackBaseTreeRequest);
                List<XpackVAuthModelDTO> src = new ArrayList<>();
                for (XpackVAuthModelDTO dto : all) {
                    if ("menu".equals(xpackBaseTreeRequest.getModelType()) &&
                            (dto.getId().equals("2") || dto.getId().equals("4"))) {
                        continue;
                    } else {
                        src.add(dto);
                    }
                }

                for (CurrentRoleDto currentRoleDto : currentRoleDtos) {
                    if (currentRoleDto.getId().equals(1L)) {
                        isAdmin = true;
                        break;
                    }
                }
                if (!isAdmin) {
                    // 查出同一组下的所有角色
                    XpackSysRole role = new XpackSysRole();
                    List<XpackSysRole> roles = this.xpackExtRoleMapper.queryByIds(currentRoleDtos.stream().map(CurrentRoleDto::getId).collect(Collectors.toList()));
                    List<String> roleGroups = roles.stream().map(XpackSysRole::getRoleGroup).collect(Collectors.toList());
                    role.setRoleGroups(roleGroups);
                    List<XpackSysRole> roles1 = roleXpackService.query(role);
                    // 不是管理员 要对用户和角色进行过滤
                    if ("user".equals(xpackBaseTreeRequest.getModelType())) {
                        // 根据角色id筛选出用户
                        List<SysUsersRolesKey> users = sysUsersRolesMapper.selectByRoleIds(roles1.stream().map(XpackSysRole::getRoleId).collect(Collectors.toList()));
                        if (ObjectUtil.isEmpty(users)) {
                            return new ArrayList<>();
                        }
                        List<Long> userIds = users.stream().map(SysUsersRolesKey::getUserId).collect(Collectors.toList());
                        return src.stream().filter(xpackVAuthModelDTO -> userIds.contains(Long.valueOf(xpackVAuthModelDTO.getId()))).collect(Collectors.toList());
                    }
                    if ("role".equals(xpackBaseTreeRequest.getModelType())) {
                        return src.stream().filter(xpackVAuthModelDTO -> roles1.stream().map(XpackSysRole::getRoleId).collect(Collectors.toList()).contains(Long.valueOf(xpackVAuthModelDTO.getId()))).collect(Collectors.toList());
                    }
                    //对菜单进行过滤
                    if ("menu".equals(xpackBaseTreeRequest.getModelType())) {
                        return src.stream().filter(xpackVAuthModelDTO -> {
                            if (xpackVAuthModelDTO.getPid().equals("0")) {
                                return xpackVAuthModelDTO.getId().equals("102");
                            } else {
                                return true;
                            }
                        }).collect(Collectors.toList());
                    }
                }
                return src;
            } else {
                return new ArrayList<>();
            }
        }
        return this.g.searchTree2(xpackBaseTreeRequest);
    }

    public Map<String, List<XpackSysAuthDetailDTO>> searchAuthDetails(XpackSysAuthRequest xpackSysAuthRequest) {
        List<XpackSysAuthDetailDTO> xpackSysAuthDetails = this.B.search(xpackSysAuthRequest);
        if (xpackSysAuthDetails == null) {
            xpackSysAuthDetails = new ArrayList<>();
        }
        Map<String, List<XpackSysAuthDetailDTO>> map = xpackSysAuthDetails.stream().collect(Collectors.groupingBy(XpackSysAuthDetailDTO::getAuthSource));
        if (xpackSysAuthRequest.getAuthSourceType().equalsIgnoreCase("\"323572")) {
            Iterator<?> iterator;
            while ((iterator = map.keySet().iterator()).hasNext()) {
                String str = (String) iterator.next();
                List list = (List) map.get(str);
                XpackSysAuthDetailDTO xpackSysAuthDetailDTO = new XpackSysAuthDetailDTO();
            }
        }
        return map;
    }

    public List<XpackSysAuthDetail> searchAuthDetailsModel(String str) {
        return this.i.searchAuthTypeModel(str);
    }

    public void authChange(XpackSysAuthRequest xpackSysAuthRequest, Long long_, String str, Boolean bool) {
        XpackSysAuthDetail xpackSysAuthDetail = xpackSysAuthRequest.getAuthDetail();
        List<String> arrayList = new ArrayList<>();
        List<XpackSysAuthDetailDTO> sysAuthByAuthSource = B.getSysAuthByAuthSource(xpackSysAuthRequest.getAuthSource(), xpackSysAuthRequest.getAuthTarget(), xpackSysAuthRequest.getAuthSourceType(), xpackSysAuthRequest.getAuthTargetType());
        if (IsNullUtils.isNull(sysAuthByAuthSource)) {
            XpackSysAuthDetailDTO sysAuthDetailDTO = new XpackSysAuthDetailDTO();
            sysAuthDetailDTO.setAuthSource(xpackSysAuthRequest.getAuthSource());
            sysAuthDetailDTO.setAuthSourceType(xpackSysAuthRequest.getAuthSourceType());
            sysAuthDetailDTO.setAuthTarget(xpackSysAuthRequest.getAuthTarget());
            sysAuthDetailDTO.setAuthTargetType(xpackSysAuthRequest.getAuthTargetType());
            sysAuthDetailDTO.setAuthUser(str);
            B.insertSysAuth(sysAuthDetailDTO);
            sysAuthByAuthSource = B.getSysAuthByAuthSource(xpackSysAuthRequest.getAuthSource(), xpackSysAuthRequest.getAuthTarget(), xpackSysAuthRequest.getAuthSourceType(), xpackSysAuthRequest.getAuthTargetType());
            List<XpackSysAuthDetail> xpackSysAuthDetails = this.authDetailsModel(xpackSysAuthRequest.getAuthSourceType());
            for (XpackSysAuthDetail sysAuthDetail : xpackSysAuthDetails) {
                XpackSysAuthDetail xpackSysAuthDetail1 = new XpackSysAuthDetail();
                xpackSysAuthDetail1.setAuthId(sysAuthByAuthSource.get(0).getId());
                xpackSysAuthDetail1.setPrivilegeName(sysAuthDetail.getPrivilegeName());
                xpackSysAuthDetail1.setPrivilegeType(sysAuthDetail.getPrivilegeType());
                xpackSysAuthDetail1.setPrivilegeValue(sysAuthDetail.getPrivilegeValue());
                xpackSysAuthDetail1.setPrivilegeExtend(sysAuthDetail.getPrivilegeExtend());
                xpackSysAuthDetail1.setRemark(sysAuthDetail.getRemark());
                xpackSysAuthDetail1.setCreateUser(str);
                xpackSysAuthDetail1.setCreateTime(System.currentTimeMillis());
                xpackSysAuthDetailMapper.insertDetail(xpackSysAuthDetail1);
            }
        }
        arrayList.add(sysAuthByAuthSource.get(0).getId());
        if (PluginSystemConstants.PRIVILEGE_VALUE.ON.equals(xpackSysAuthDetail.getPrivilegeValue())) {
            if (15L == xpackSysAuthDetail.getPrivilegeType()) {
                this.i.authDetailsChange(PluginSystemConstants.PRIVILEGE_VALUE.OFF, xpackSysAuthDetail.getPrivilegeType(), arrayList);
            }
            this.i.authDetailsChange2(PluginSystemConstants.PRIVILEGE_VALUE.OFF, xpackSysAuthDetail.getPrivilegeType(), arrayList);
        } else {
            if (15L == xpackSysAuthDetail.getPrivilegeType()) {
                this.i.authDetailsChange(PluginSystemConstants.PRIVILEGE_VALUE.ON, xpackSysAuthDetail.getPrivilegeType(), arrayList);
            }
            this.i.authDetailsChange2(PluginSystemConstants.PRIVILEGE_VALUE.ON, xpackSysAuthDetail.getPrivilegeType(), arrayList);
        }
    }
    @Override
    public void authAddForRole(String roleId, List<AuthChangeForDeptLeaderDTO> a) {
        if (a == null || a.isEmpty()) {
            return;
        }
        //储存全部的authId
        List<String> authIds = new ArrayList<>();
        //首先需要根据用户和资源id查询出已经存在的权限
        List<XpackSysAuthDetailDTO> sysAuthByAuthSourceList = B.getAllByAuthSource(roleId, "role", a.stream().map(AuthChangeForDeptLeaderDTO::getAuthSource).collect(Collectors.toList()));
        authIds.addAll(sysAuthByAuthSourceList.stream().map(XpackSysAuthDetailDTO::getId).collect(Collectors.toList()));
        Map<String, XpackSysAuthDetailDTO> sysAuthByAuthSourceMap = sysAuthByAuthSourceList.stream().collect(Collectors.toMap(XpackSysAuthDetailDTO::getAuthSource, item -> item));
        //筛选出需要新创建的
        List<AuthChangeForDeptLeaderDTO> needAdd = new ArrayList<>();
        for (AuthChangeForDeptLeaderDTO item : a) {
            if (!sysAuthByAuthSourceMap.containsKey(item.getAuthSource()) || !sysAuthByAuthSourceMap.get(item.getAuthSource()).getAuthSourceType().equals(item.getAuthSourceType())) {
                needAdd.add(item);
            }
        }
        //进行权限的批量创建
        if (!needAdd.isEmpty()) {
            Map<String, List<XpackSysAuthDetail>> authDetailMap = new HashMap<>();
            List<XpackSysAuthDetailDTO> addAuth = new ArrayList<>();
            List<XpackSysAuthDetail> addAuthDetail = new ArrayList<>();
            for (AuthChangeForDeptLeaderDTO item : needAdd) {
                //新建权限
                XpackSysAuthDetailDTO auth = new XpackSysAuthDetailDTO();
                auth.setId(IdUtil.randomUUID());
                auth.setAuthSource(item.getAuthSource());
                auth.setAuthSourceType(item.getAuthSourceType());
                auth.setAuthTarget(roleId);
                auth.setAuthTargetType("role");
                auth.setAuthUser("auto");
                addAuth.add(auth);
                authIds.add(auth.getId());
                //新建权限详情
                if (!authDetailMap.containsKey(auth.getAuthSourceType())) {
                    List<XpackSysAuthDetail> authDetails = this.authDetailsModel(auth.getAuthSourceType());
                    authDetailMap.put(auth.getAuthSourceType(), authDetails);
                }
                for (XpackSysAuthDetail sysAuthDetail : authDetailMap.get(auth.getAuthSourceType())) {
                    XpackSysAuthDetail authDetail = new XpackSysAuthDetail();
                    authDetail.setId(IdUtil.randomUUID());
                    authDetail.setAuthId(auth.getId());
                    authDetail.setPrivilegeName(sysAuthDetail.getPrivilegeName());
                    authDetail.setPrivilegeType(sysAuthDetail.getPrivilegeType());
                    authDetail.setPrivilegeValue(sysAuthDetail.getPrivilegeValue());
                    authDetail.setPrivilegeExtend(sysAuthDetail.getPrivilegeExtend());
                    authDetail.setRemark(sysAuthDetail.getRemark());
                    authDetail.setCreateUser("auto");
                    authDetail.setCreateTime(System.currentTimeMillis());
                    addAuthDetail.add(authDetail);
                }
            }
            //批量创建
            if (!addAuth.isEmpty()) {
                B.insertSysAuthBatch(addAuth);
            }
            if (!addAuthDetail.isEmpty()) {
                xpackSysAuthDetailMapper.insertDetailBatch(addAuthDetail);
            }
        }
        if (!authIds.isEmpty()) {
            this.i.authDetailsChange5(1, authIds);
        }
    }
    @Override
    public void authChangeForDeptLeader(String user, String authSource, String authSourceType, String authTarget, String authTargetType, Integer privilegeValue, Integer privilegeType) {
        List<String> arrayList = new ArrayList<>();
        List<XpackSysAuthDetailDTO> sysAuthByAuthSource = B.getSysAuthByAuthSource(authSource, authTarget, authSourceType, authTargetType);
        //取消权限之前，先判断此权限是不是通过组织负责人授予的
        if (privilegeValue == 0 && sysAuthByAuthSource != null) {
            XpackSysAuthDetail authDetail = xpackSysAuthDetailMapper.selectByAuthIdAndPrivilegeType(sysAuthByAuthSource.get(0).getId(), privilegeType);
            if (authDetail != null && !"dept".equals(authDetail.getCreateUser())) {
                //如果不是则不取消此权限
                return;
            }
        }
        if (sysAuthByAuthSource == null || sysAuthByAuthSource.isEmpty()) {
            XpackSysAuthDetailDTO sysAuthDetailDTO = new XpackSysAuthDetailDTO();
            sysAuthDetailDTO.setAuthSource(authSource);
            sysAuthDetailDTO.setAuthSourceType(authSourceType);
            sysAuthDetailDTO.setAuthTarget(authTarget);
            sysAuthDetailDTO.setAuthTargetType(authTargetType);
            sysAuthDetailDTO.setAuthUser(user);
            B.insertSysAuth(sysAuthDetailDTO);
            sysAuthByAuthSource = B.getSysAuthByAuthSource(authSource, authTarget, authSourceType, authTargetType);
            List<XpackSysAuthDetail> xpackSysAuthDetails = this.authDetailsModel(authSourceType);
            for (XpackSysAuthDetail sysAuthDetail : xpackSysAuthDetails) {
                XpackSysAuthDetail xpackSysAuthDetail1 = new XpackSysAuthDetail();
                xpackSysAuthDetail1.setAuthId(sysAuthByAuthSource.get(0).getId());
                xpackSysAuthDetail1.setPrivilegeName(sysAuthDetail.getPrivilegeName());
                xpackSysAuthDetail1.setPrivilegeType(sysAuthDetail.getPrivilegeType());
                xpackSysAuthDetail1.setPrivilegeValue(sysAuthDetail.getPrivilegeValue());
                xpackSysAuthDetail1.setPrivilegeExtend(sysAuthDetail.getPrivilegeExtend());
                xpackSysAuthDetail1.setRemark(sysAuthDetail.getRemark());
                xpackSysAuthDetail1.setCreateUser(user);
                xpackSysAuthDetail1.setCreateTime(System.currentTimeMillis());
                xpackSysAuthDetailMapper.insertDetail(xpackSysAuthDetail1);
            }
        }
        arrayList.add(sysAuthByAuthSource.get(0).getId());
        this.i.authDetailsChange2(privilegeValue, privilegeType, arrayList);
    }

    public List<XpackSysAuthDetail> authDetailsModel(String authType) {
        List<XpackSysAuthDetail> authDetails = i.searchAuthTypeModel(authType);
        if (authType.equalsIgnoreCase("dataset")) {
            XpackSysAuthDetail xpackSysAuthDetail = new XpackSysAuthDetail();
            xpackSysAuthDetail.setPrivilegeName("i18n_auth_row_permission");
            xpackSysAuthDetail.setPrivilegeType(20);
            xpackSysAuthDetail.setPrivilegeValue(1);
            authDetails.add(0, xpackSysAuthDetail);
        }
        return authDetails;
    }
}
