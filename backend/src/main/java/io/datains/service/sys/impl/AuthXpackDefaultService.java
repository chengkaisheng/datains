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
        if (1L == long_
                || "dept".equals(xpackBaseTreeRequest.getModelType())
                || "user".equals(xpackBaseTreeRequest.getModelType())
                || "role".equals(xpackBaseTreeRequest.getModelType())
                || "menu".equals(xpackBaseTreeRequest.getModelType())) {
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
            if (xpackSysAuthRequest.getAuthSourceType().equalsIgnoreCase("panel")) {
                this.i.authDetailsChange3(PluginSystemConstants.PRIVILEGE_VALUE.OFF, xpackSysAuthDetail.getPrivilegeType(), arrayList);
            } else {
                this.i.authDetailsChange(PluginSystemConstants.PRIVILEGE_VALUE.OFF, xpackSysAuthDetail.getPrivilegeType(), arrayList);
            }
        } else {
            if (xpackSysAuthRequest.getAuthSourceType().equalsIgnoreCase("panel")) {
                this.i.authDetailsChange3(PluginSystemConstants.PRIVILEGE_VALUE.ON, xpackSysAuthDetail.getPrivilegeType(), arrayList);
            } else {
                this.i.authDetailsChange(PluginSystemConstants.PRIVILEGE_VALUE.ON, xpackSysAuthDetail.getPrivilegeType(), arrayList);
            }
        }
    }

    @Override
    public void authChangeForDeptLeader(String user, String authSource, String authSourceType, String authTarget, String authTargetType, Integer privilegeValue, Integer privilegeType) {
        List<String> arrayList = new ArrayList<>();
        List<XpackSysAuthDetailDTO> sysAuthByAuthSource = B.getSysAuthByAuthSource(authSource, authTarget, authSourceType, authTargetType);
        //取消权限之前，先判断此权限是不是通过组织负责人授予的
        if (privilegeValue == 0 && sysAuthByAuthSource != null && !sysAuthByAuthSource.isEmpty()) {
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
        if (authSourceType.equalsIgnoreCase("panel") && privilegeType == 3) {
            this.i.authDetailsChange2(privilegeValue, privilegeType, arrayList);
        } else {
            this.i.authDetailsChange(privilegeValue, privilegeType, arrayList);
        }
    }

    /**
     * 为权限负责人批量添加权限
     *
     * @param a AuthChangeForDeptLeaderDTO
     */
    public void authAddForDeptLeader(Long userId, List<AuthChangeForDeptLeaderDTO> a) {
        if (a == null || a.isEmpty()) {
            return;
        }
        //首先需要根据用户和资源id查询出已经存在的权限
        List<XpackSysAuthDetailDTO> sysAuthByAuthSourceList = B.getAllByAuthSource(userId, a.stream().map(AuthChangeForDeptLeaderDTO::getAuthSource).collect(Collectors.toList()));
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
                auth.setId(IdUtil.fastSimpleUUID());
                auth.setAuthSource(item.getAuthSource());
                auth.setAuthSourceType(item.getAuthSourceType());
                auth.setAuthTarget(userId.toString());
                auth.setAuthTargetType("user");
                auth.setAuthUser("dept");
                addAuth.add(auth);
                //新建权限详情
                if (!authDetailMap.containsKey(auth.getAuthSource())) {
                    List<XpackSysAuthDetail> authDetails = i.searchAuthTypeModel(auth.getAuthSource());
                    authDetailMap.put(auth.getAuthSource(), authDetails);
                }
                for (XpackSysAuthDetail sysAuthDetail : authDetailMap.get(auth.getAuthSource())) {
                    XpackSysAuthDetail authDetail = new XpackSysAuthDetail();
                    authDetail.setAuthId(auth.getId());
                    authDetail.setPrivilegeName(sysAuthDetail.getPrivilegeName());
                    authDetail.setPrivilegeType(sysAuthDetail.getPrivilegeType());
                    authDetail.setPrivilegeValue(sysAuthDetail.getPrivilegeValue());
                    authDetail.setPrivilegeExtend(sysAuthDetail.getPrivilegeExtend());
                    authDetail.setRemark(sysAuthDetail.getRemark());
                    authDetail.setCreateUser(auth.getCreateUser());
                    authDetail.setCreateTime(System.currentTimeMillis());
                    addAuthDetail.add(authDetail);
                }
            }
            //TODO开始进行创建

        }
    }

    @Override
    public void authBatchChangeForDeptLeader(List<Long> user, Integer privilegeValue) {
        //修改此用户所有来自组织负责人的权限
        this.i.authBatchChangeForDeptLeader(user, privilegeValue);
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
