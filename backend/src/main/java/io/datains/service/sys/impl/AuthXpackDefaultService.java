package io.datains.service.sys.impl;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:26
 * @Description
 */
import io.dataease.plugins.common.constants.PluginSystemConstants;
import io.dataease.plugins.common.dto.PluginSysMenu;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.annotation.Resource;

import io.datains.base.domain.*;
import io.datains.base.mapper.XpackExtSysAuthDetailMapper;
import io.datains.base.mapper.XpackExtSysAuthMapper;
import io.datains.base.mapper.XpackExtVAuthModelMapper;
import io.datains.base.mapper.XpackSysAuthDetailMapper;
import io.datains.commons.utils.IsNullUtils;
import io.datains.service.sys.AuthXpackService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;

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
        Map<String, List<XpackSysAuthDetailDTO>> map = (Map)((List)Optional.<List>ofNullable(this.B.search(xpackSysAuthRequest)).orElse(new ArrayList())).stream().collect(Collectors.groupingBy(XpackSysAuthDetailDTO::getAuthSource));
        if (xpackSysAuthRequest.getAuthSourceType().equalsIgnoreCase("\"323572")) {
            Iterator<?> iterator;
            while ((iterator = map.keySet().iterator()).hasNext()) {
                String str = (String)iterator.next();
                List list = (List)map.get(str);
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
        List<String> list2;
        ArrayList arrayList = new ArrayList();
        List<XpackSysAuthDetailDTO> sysAuthByAuthSource = B.getSysAuthByAuthSource(xpackSysAuthRequest.getAuthSource(),xpackSysAuthRequest.getAuthTarget());
        if (IsNullUtils.isNull(sysAuthByAuthSource)){
            XpackSysAuthDetailDTO sysAuthDetailDTO = new XpackSysAuthDetailDTO();
            sysAuthDetailDTO.setAuthSource(xpackSysAuthRequest.getAuthSource());
            sysAuthDetailDTO.setAuthSourceType(xpackSysAuthRequest.getAuthSourceType());
            sysAuthDetailDTO.setAuthTarget(xpackSysAuthRequest.getAuthTarget());
            sysAuthDetailDTO.setAuthTargetType(xpackSysAuthRequest.getAuthTargetType());
            sysAuthDetailDTO.setAuthUser(str);
            B.insertSysAuth(sysAuthDetailDTO);
            sysAuthByAuthSource = B.getSysAuthByAuthSource(xpackSysAuthRequest.getAuthSource(),xpackSysAuthRequest.getAuthTarget());
            List<XpackSysAuthDetail> xpackSysAuthDetails = this.authDetailsModel(xpackSysAuthRequest.getAuthSourceType());
            for (int j = 0; j <xpackSysAuthDetails.size() ; j++) {
                XpackSysAuthDetail xpackSysAuthDetail1 = new XpackSysAuthDetail();
                xpackSysAuthDetail1.setAuthId(sysAuthByAuthSource.get(0).getId());
                xpackSysAuthDetail1.setPrivilegeName(xpackSysAuthDetails.get(j).getPrivilegeName());
                xpackSysAuthDetail1.setPrivilegeType(xpackSysAuthDetails.get(j).getPrivilegeType());
                xpackSysAuthDetail1.setPrivilegeValue(xpackSysAuthDetails.get(j).getPrivilegeValue());
                xpackSysAuthDetail1.setPrivilegeExtend(xpackSysAuthDetails.get(j).getPrivilegeExtend());
                xpackSysAuthDetail1.setRemark(xpackSysAuthDetails.get(j).getRemark());
                xpackSysAuthDetail1.setCreateUser(str);
                xpackSysAuthDetail1.setCreateTime(System.currentTimeMillis());
                xpackSysAuthDetailMapper.insertDetail(xpackSysAuthDetail1);

            }

        }
        arrayList.add(sysAuthByAuthSource.get(0).getId());
            if (xpackSysAuthDetail.getPrivilegeValue() == PluginSystemConstants.PRIVILEGE_VALUE.ON) {
                this.i.authDetailsChange(PluginSystemConstants.PRIVILEGE_VALUE.OFF, xpackSysAuthDetail.getPrivilegeType(), arrayList);
                return;
            }
            this.i.authDetailsChange(PluginSystemConstants.PRIVILEGE_VALUE.ON, xpackSysAuthDetail.getPrivilegeType(), arrayList);


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