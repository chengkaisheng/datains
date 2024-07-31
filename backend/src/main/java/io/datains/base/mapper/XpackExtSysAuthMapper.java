package io.datains.base.mapper;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:30
 * @Description
 */
import java.util.List;

import io.datains.base.domain.XpackSysAuthDetailDTO;
import io.datains.base.domain.XpackSysAuthRequest;
import org.apache.ibatis.annotations.Param;

public interface XpackExtSysAuthMapper {
    Boolean authExist(@Param("authSource") String paramString1, @Param("authTarget") String paramString2);

    String findAuthId(@Param("authSource") String paramString1, @Param("authSourceType") String paramString2, @Param("authTarget") String paramString3, @Param("authTargetType") String paramString4);

    List<XpackSysAuthDetailDTO> search(XpackSysAuthRequest paramXpackSysAuthRequest);

    List<XpackSysAuthDetailDTO> getSysAuthByAuthSource(@Param("authSource")String authSource ,@Param("authTarget") String authTarget,@Param("authSourceType") String authSourceType,
                                                       @Param("authTargetType") String authTargetType);

   int insertSysAuth(XpackSysAuthDetailDTO xpackSysAuthDetailDTO);
}
