package io.datains.service.sys;

import io.datains.base.domain.*;

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

     List<XpackSysAuthDetail> searchAuthDetailsModel(String paramString);

     void authChange(XpackSysAuthRequest paramXpackSysAuthRequest, Long paramLong, String paramString, Boolean paramBoolean);
}
