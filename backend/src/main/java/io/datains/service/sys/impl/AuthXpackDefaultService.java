package io.datains.service.sys.impl;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:26
 * @Description
 */

import cn.hutool.core.util.IdUtil;
import io.dataease.plugins.common.constants.PluginSystemConstants;
import io.datains.base.domain.*;
import io.datains.base.mapper.XpackExtSysAuthDetailMapper;
import io.datains.base.mapper.XpackExtSysAuthMapper;
import io.datains.base.mapper.XpackExtVAuthModelMapper;
import io.datains.base.mapper.XpackSysAuthDetailMapper;
import io.datains.commons.utils.IsNullUtils;
import io.datains.dto.authModel.AuthChangeForDeptLeaderDTO;
import io.datains.service.sys.AuthXpackService;
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

    public List<XpackVAuthModelDTO> searchAuthModelTree(XpackBaseTreeRequest xpackBaseTreeRequest, Long long_, Boolean bool) {
        xpackBaseTreeRequest.setCreateBy(String.valueOf(long_));
        xpackBaseTreeRequest.setCreateBy(String.valueOf(long_));
        if (1L == long_ || "dept".equals(xpackBaseTreeRequest.getModelType()) || "user".equals(xpackBaseTreeRequest.getModelType()) || "role".equals(xpackBaseTreeRequest.getModelType())) {
            return this.g.searchTree(xpackBaseTreeRequest);
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
        this.changeAuth(xpackSysAuthRequest.getAuthSourceType(), xpackSysAuthDetail.getPrivilegeValue(), xpackSysAuthDetail.getPrivilegeType(), arrayList);
    }

    @Override
    public synchronized void authChangeBatch(List<XpackSysAuthRequest> list, Long long_, String str, Boolean bool) {
        if (list == null || list.isEmpty()) {
            return;
        }

        //查出数据库中已有的权限信息
        List<XpackSysAuthDetailDTO> sysAuthByAuthSource = B.getSysAuthByAuthSources(
                list.stream().map(XpackSysAuthRequest::getAuthSource).collect(Collectors.toList()),
                list.get(0).getAuthTarget(), list.get(0).getAuthSourceType(), list.get(0).getAuthTargetType());
        //储存全部的authId
        List<String> authIds = sysAuthByAuthSource.stream().map(XpackSysAuthDetailDTO::getId).collect(Collectors.toList());
        Map<String, XpackSysAuthDetailDTO> sysAuthByAuthSourceMap = sysAuthByAuthSource.stream().collect(Collectors.toMap(XpackSysAuthDetailDTO::getAuthSource, item -> item));
        //筛选出需要新创建的
        List<XpackSysAuthRequest> needAdd = new ArrayList<>();
        for (XpackSysAuthRequest item : list) {
            if (!sysAuthByAuthSourceMap.containsKey(item.getAuthSource()) || !sysAuthByAuthSourceMap.get(item.getAuthSource()).getAuthSourceType().equals(item.getAuthSourceType())) {
                needAdd.add(item);
            }
        }
        //进行权限的批量创建
        if (!needAdd.isEmpty()) {
            Map<String, List<XpackSysAuthDetail>> authDetailMap = new HashMap<>();
            List<XpackSysAuthDetailDTO> addAuth = new ArrayList<>();
            List<XpackSysAuthDetail> addAuthDetail = new ArrayList<>();
            for (XpackSysAuthRequest item : needAdd) {
                //新建权限
                XpackSysAuthDetailDTO auth = new XpackSysAuthDetailDTO();
                auth.setId(IdUtil.randomUUID());
                auth.setAuthSource(item.getAuthSource());
                auth.setAuthSourceType(item.getAuthSourceType());
                auth.setAuthTarget(item.getAuthTarget());
                auth.setAuthTargetType(item.getAuthTargetType());
                auth.setAuthUser(str);
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
                    authDetail.setCreateUser(str);
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
        //批量给予权限
        if (!authIds.isEmpty()) {
            XpackSysAuthDetail xpackSysAuthDetail = list.get(0).getAuthDetail();
            this.changeAuth(list.get(0).getAuthSourceType(), xpackSysAuthDetail.getPrivilegeValue(), xpackSysAuthDetail.getPrivilegeType(), authIds);
        }
    }

    private void changeAuth(String authSourceType, Integer privilegeValue, Integer privilegeType, List<String> authIds) {
        if (PluginSystemConstants.PRIVILEGE_VALUE.ON.equals(privilegeValue)) {
            if (authSourceType.equalsIgnoreCase("panel")) {
                this.i.authDetailsChange3(PluginSystemConstants.PRIVILEGE_VALUE.OFF, privilegeType, authIds);
            } else {
                this.i.authDetailsChange(PluginSystemConstants.PRIVILEGE_VALUE.OFF, privilegeType, authIds);
            }
        } else {
            if (authSourceType.equalsIgnoreCase("panel")) {
                this.i.authDetailsChange3(PluginSystemConstants.PRIVILEGE_VALUE.ON, privilegeType, authIds);
            } else {
                this.i.authDetailsChange(PluginSystemConstants.PRIVILEGE_VALUE.ON, privilegeType, authIds);
            }
        }
    }

    /**
     * 为管理员添加权限
     *
     * @param roleId 管理员id
     * @param a      权限列表
     */
    @Override
    public void authAddForRole(String roleId, List<AuthChangeForDeptLeaderDTO> a) {
        if (a == null || a.isEmpty()) {
            return;
        }
        //储存全部的authId
        List<String> authIds = new ArrayList<>();
        //首先需要根据用户和资源id查询出已经存在的权限
        List<XpackSysAuthDetailDTO> sysAuthByAuthSourceList = B.getAllByAuthSource(roleId.toString(), "role", a.stream().map(AuthChangeForDeptLeaderDTO::getAuthSource).collect(Collectors.toList()));
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
                auth.setAuthTarget(roleId.toString());
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

    /**
     * 为权限负责人批量添加权限
     *
     * @param a AuthChangeForDeptLeaderDTO
     */
    @Override
    public void authAddForDeptLeader(Long userId, List<AuthChangeForDeptLeaderDTO> a) {
        if (a == null || a.isEmpty()) {
            return;
        }
        //储存全部的authId
        List<String> authIds = new ArrayList<>();
        //首先需要根据用户和资源id查询出已经存在的权限
        List<XpackSysAuthDetailDTO> sysAuthByAuthSourceList = B.getAllByAuthSource(userId.toString(), "user", a.stream().map(AuthChangeForDeptLeaderDTO::getAuthSource).collect(Collectors.toList()));
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
                auth.setAuthTarget(userId.toString());
                auth.setAuthTargetType("user");
                auth.setAuthUser("dept");
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
                    if (sysAuthDetail.getPrivilegeType() == 3 && sysAuthDetail.getPrivilegeName().equals("i18n_auth_export")) {
                        authDetail.setPrivilegeValue(0);
                    } else {
                        authDetail.setPrivilegeValue(sysAuthDetail.getPrivilegeValue());
                    }
                    authDetail.setPrivilegeExtend(sysAuthDetail.getPrivilegeExtend());
                    authDetail.setRemark(sysAuthDetail.getRemark());
                    authDetail.setCreateUser("dept");
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
            this.i.authDetailsChange4(1, authIds);
        }
    }

    @Override
    public void authBatchDelForDeptLeader(Long user, List<String> authSources) {
        //修改此用户所有来自组织负责人的权限
        this.i.authBatchDelForDeptLeader(user, authSources, 0);
    }

    @Override
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
