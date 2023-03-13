package io.datains.service.sys;


import io.datains.base.domain.*;
import io.datains.plugins.xpack.email.dto.request.XpackPixelEntity;

import java.util.List;
/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 11:13
 * @Description
 */
public interface EmailXpackService {

     int save(XpackEmailTaskRequest paramXpackEmailTaskRequest) throws Exception;

     List<XpackTaskGridDTO> taskGrid(XpackGridRequest paramXpackGridRequest);

     List<XpackTaskInstanceDTO> taskInstanceGrid(XpackGridRequest paramXpackGridRequest);

     void delete(Long paramLong) throws Exception;

     void stop(Long paramLong) throws Exception;

     XpackEmailTaskRequest taskForm(Long paramLong);

     String print(String paramString1, String paramString2, XpackPixelEntity paramXpackPixelEntity) throws Exception;

/*    public abstract Long saveInstance(GlobalTaskInstance paramGlobalTaskInstance);

    public abstract GlobalTaskInstance instanceForm(Long paramLong);

    public abstract String print(String paramString1, String paramString2, XpackPixelEntity paramXpackPixelEntity) throws Exception;

    public abstract List<GlobalTaskEntity> allTask();

    public abstract XpackEmailTemplateDTO emailTemplate(Long paramLong);

    public abstract byte[] printData(String paramString1, String paramString2, XpackPixelEntity paramXpackPixelEntity) throws Exception;*/
}
