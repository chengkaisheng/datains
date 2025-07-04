package io.datains.service.sys;

import io.datains.base.domain.*;
import io.datains.dto.authModel.AuthChangeForDeptLeaderDTO;

import java.util.List;
import java.util.Map;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:25
 * @Description
 */
public interface AuthXpackService {
    List<XpackVAuthModelDTO> searchAuthModelTree(XpackBaseTreeRequest paramXpackBaseTreeRequest, Long paramLong, Boolean paramBoolean);

    Map<String, List<XpackSysAuthDetailDTO>> searchAuthDetails(XpackSysAuthRequest paramXpackSysAuthRequest);

    void authChange(XpackSysAuthRequest paramXpackSysAuthRequest, Long paramLong, String paramString, Boolean paramBoolean);

    void authChangeBatch(List<XpackSysAuthRequest> list, Long paramLong, String paramString, Boolean paramBoolean);

    /**
     * @param user           授权人员
     * @param authSource     权限来源
     * @param authSourceType 权限来源类型
     * @param authTarget     权限授予对象 一般为id
     * @param authTargetType 权限授予对象类型 用户，角色等
     * @param privilegeValue 权限值 1-授予权限 0-取消权限
     * @param privilegeType  权限类型
     */
    void authChangeForDeptLeader(String user, String authSource, String authSourceType, String authTarget, String authTargetType, Integer privilegeValue, Integer privilegeType);

    void authAddForDeptLeader(Long userId, List<AuthChangeForDeptLeaderDTO> a);

    /**
     * 批量去除部门负责人权限
     *
     * @param user 授权人员
     */
    void authBatchDelForDeptLeader(List<Long> user);

    /**
     * 批量去除部门负责人权限
     *
     * @param user           授权人员
     * @param authSources    权限来源
     * @param authSourceType 权限来源类型
     */
    void authBatchDelForDeptLeader(Long user, List<String> authSources, String authSourceType);

    List<XpackSysAuthDetail> authDetailsModel(String authType);
}
