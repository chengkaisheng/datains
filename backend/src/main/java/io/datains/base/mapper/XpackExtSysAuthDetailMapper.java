package io.datains.base.mapper;

import io.datains.base.domain.XpackSysAuthDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 15:02
 * @Description
 */
public interface XpackExtSysAuthDetailMapper {
    void authDetailsChange(@Param("privilegeValue") Integer paramInteger1, @Param("privilegeType") Integer paramInteger2, @Param("authIds") List<String> paramList);

    List<XpackSysAuthDetail> searchAuthTypeModel(@Param("authTypeModel") String paramString);

    void copyAuthModel(@Param("authTypeModel") String paramString1, @Param("authId") String paramString2, @Param("createUser") String paramString3);
}
