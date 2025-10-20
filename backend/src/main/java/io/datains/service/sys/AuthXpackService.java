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

    void authAddForRole(String roleId, List<AuthChangeForDeptLeaderDTO> a);

    void authAddForDeptLeader(Long userId, List<AuthChangeForDeptLeaderDTO> a);

    /**
     * 批量去除部门负责人权限
     *
     * @param user        授权人员
     * @param authSources 权限来源
     */
    void authBatchDelForDeptLeader(Long user, List<String> authSources);

    List<XpackSysAuthDetail> authDetailsModel(String authType);

    /**
     * 用于分享模块查询权限
     */
    List<XpackSysAuthDetailDTO> selectListForShare(List<String> authSources, String authSourceType, List<String> authTargets, String authTargetType);

    /**
     * 用于分享模块中新增权限
     * 单次更改
     */
    void authAddForShare(String authSource, String authTarget, String authSourceType, String authTargetType, String createUser, Integer privilegeType);

    /**
     * 用于分享模块中删除权限
     * 单次更改
     */
    void authDelForShare(String authSource, String authTarget, String authSourceType, String authTargetType, String createUser, Integer privilegeType);
}
