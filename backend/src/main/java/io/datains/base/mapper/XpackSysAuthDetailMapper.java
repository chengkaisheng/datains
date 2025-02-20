package io.datains.base.mapper;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 15:08
 * @Description
 */

import io.datains.base.domain.XpackSysAuthDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface XpackSysAuthDetailMapper {
    int deleteByPrimaryKey(String paramString);

    int updateByPrimaryKey(XpackSysAuthDetail paramXpackSysAuthDetail);

    XpackSysAuthDetail selectByPrimaryKey(String paramString);

    XpackSysAuthDetail selectByAuthIdAndPrivilegeType(@Param("authId") String authId, @Param("privilegeType") Integer privilegeType);

    int insertSelective(XpackSysAuthDetail paramXpackSysAuthDetail);

    List<XpackSysAuthDetail> selectByExample(XpackSysAuthDetail paramXpackSysAuthDetailExample);

    int updateByPrimaryKeySelective(XpackSysAuthDetail paramXpackSysAuthDetail);

    int insert(XpackSysAuthDetail paramXpackSysAuthDetail);

    int deleteByExample(XpackSysAuthDetail paramXpackSysAuthDetailExample);

    long countByExample(XpackSysAuthDetail paramXpackSysAuthDetailExample);

    int insertDetail(XpackSysAuthDetail xpackSysAuthDetail);
}
