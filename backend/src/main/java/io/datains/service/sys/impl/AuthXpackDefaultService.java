package io.datains.service.sys.impl;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:26
 * @Description
 */

import io.dataease.plugins.common.constants.PluginSystemConstants;
import io.datains.base.domain.*;
import io.datains.base.mapper.XpackExtSysAuthDetailMapper;
import io.datains.base.mapper.XpackExtSysAuthMapper;
import io.datains.base.mapper.XpackExtVAuthModelMapper;
import io.datains.base.mapper.XpackSysAuthDetailMapper;
import io.datains.commons.utils.IsNullUtils;
import io.datains.service.sys.AuthXpackService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
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
        return this.g.searchTree(xpackBaseTreeRequest);
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
            if (xpackSysAuthRequest.getAuthSourceType().equalsIgnoreCase("panel") && xpackSysAuthDetail.getPrivilegeType() == 3) {
                this.i.authDetailsChange2(PluginSystemConstants.PRIVILEGE_VALUE.OFF, xpackSysAuthDetail.getPrivilegeType(), arrayList);
            } else {
                this.i.authDetailsChange(PluginSystemConstants.PRIVILEGE_VALUE.OFF, xpackSysAuthDetail.getPrivilegeType(), arrayList);
            }
        } else {
            if (xpackSysAuthRequest.getAuthSourceType().equalsIgnoreCase("panel") && xpackSysAuthDetail.getPrivilegeType() == 3) {
                this.i.authDetailsChange2(PluginSystemConstants.PRIVILEGE_VALUE.ON, xpackSysAuthDetail.getPrivilegeType(), arrayList);
            } else {
                this.i.authDetailsChange(PluginSystemConstants.PRIVILEGE_VALUE.ON, xpackSysAuthDetail.getPrivilegeType(), arrayList);
            }
        }
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
