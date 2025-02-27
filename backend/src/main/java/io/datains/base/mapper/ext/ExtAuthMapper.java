package io.datains.base.mapper.ext;


import io.datains.auth.entity.AuthItem;
import io.datains.base.domain.SysAuth;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface ExtAuthMapper {

    List<Long> queryUserIdWithRoleIds(@Param("roleIds") List<Long> roleIds);

    List<Long> queryUserIdWithDeptIds(@Param("deptIds") List<Long> deptIds);

    List<SysAuth> queryByResource(@Param("resourceId") String resourceId);

    List<AuthItem> dataSourceIdByUser(String userId);
    List<AuthItem> dataSetIdByUser(String userId);
    List<AuthItem> panelIdByUser(String userId);

    List<AuthItem> dataSourceIdByRole(String roleId);
    List<AuthItem> dataSetIdByRole(String roleId);
    List<AuthItem> panelIdByRole(String roleId);

    List<AuthItem> dataSourceIdByDept(String deptId);
    List<AuthItem> dataSetIdByDept(String deptId);
    List<AuthItem> panelIdByDept(String deptId);

    String parentResource(@Param("resourceId") String resourceId, @Param("type") String type);
    List<AuthItem> queryAuthItems(@Param("authTargetType") String authTargetType,
                                  @Param("authTarget") String authTarget,
                                  @Param("sourceType") String sourceType);
}
