package io.datains.service.sys.impl;

import io.datains.base.domain.*;
import io.datains.base.mapper.XpackTaskMapper;
/*import io.datains.commons.utils.WebDriverUtil;*/
import io.datains.plugins.xpack.email.dto.request.XpackPixelEntity;
import io.datains.service.sys.EmailXpackService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 15:30
 * @Description
 */
@Service
public class EmailXpackDefaultService implements EmailXpackService {

    @Resource
    private XpackTaskMapper xpackTaskMapper;

    @Override
    public int save(XpackEmailTaskRequest paramXpackEmailTaskRequest) throws Exception {
        xpackTaskMapper.insertTask(paramXpackEmailTaskRequest);
        return 0;
    }

    @Override
    public List<XpackTaskGridDTO> taskGrid(XpackGridRequest paramXpackGridRequest) {
        XpackGridExample paramXpackGridExample  = new XpackGridExample();
        return xpackTaskMapper.queryTasks(paramXpackGridExample);
    }

    @Override
    public List<XpackTaskInstanceDTO> taskInstanceGrid(XpackGridRequest paramXpackGridRequest) {
        XpackTaskInstanceDTO xpackTaskInstanceDTO = new XpackTaskInstanceDTO();
        return   xpackTaskMapper.queryTaskInstances(xpackTaskInstanceDTO);
    }

    @Override
    public void delete(Long paramLong) throws Exception {
        xpackTaskMapper.deleteTask(paramLong);
    }

    @Override
    public void stop(Long paramLong) throws Exception {
        XpackTaskCreateRequest  xpackTaskCreateRequest = new XpackTaskCreateRequest();
        xpackTaskCreateRequest.setTaskId(paramLong);
        xpackTaskMapper.stopTask(xpackTaskCreateRequest);
    }

    @Override
    public XpackEmailTaskRequest taskForm(Long paramLong) {
        return xpackTaskMapper.selectTaskForm(paramLong);
    }

    @Override
    public String print(String paramString1, String paramString2, XpackPixelEntity paramXpackPixelEntity) throws Exception {
        int var4 = (var4 = xpackTaskMapper.timeout()) > 0 ? var4 : 60;
        System.err.println(paramString1);
        System.err.println(paramString2);
        System.err.println(paramXpackPixelEntity);
        System.err.println(var4);
        /*return WebDriverUtil.screenshotAsBytes(a, a, a, var4);*/
        return null;
    }





}
