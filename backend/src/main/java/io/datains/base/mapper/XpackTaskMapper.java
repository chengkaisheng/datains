package io.datains.base.mapper;

import io.datains.base.domain.*;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:44
 * @Description
 */
public interface XpackTaskMapper {
    int deleteInstance(Long paramLong);

    int templateCountWithTaskId(Long paramLong);

    int timeout();

    List<GlobalTaskEntity> selectTasks();

    List<XpackTaskGridDTO> queryTasks(XpackGridExample paramXpackGridExample);

    XpackEmailTemplateDTO emailTemplate(Long paramLong);

    int deleteTask(Long paramLong);

    int insertEmailTemplate(EmailTemplateEntity paramEmailTemplateEntity);

    int insertTask(XpackTaskCreateRequest paramXpackTaskCreateRequest);

    int updateTaskInstance(XpackTaskInstanceDTO paramTaskInstanceEntity);

    void stopTask(XpackTaskCreateRequest paramXpackTaskCreateRequest);

    int deleteEmailTemplate(Long paramLong);

    void updateEmailTemplate(EmailTemplateEntity paramEmailTemplateEntity);

    void updateTask(XpackTaskCreateRequest paramXpackTaskCreateRequest);

    XpackTaskInstanceDTO selectInstanceForm(Long paramLong);

    XpackEmailTaskRequest selectTaskForm(Long paramLong);

    int insertTaskInstance(XpackTaskInstanceDTO paramTaskInstanceEntity);

    List<XpackTaskInstanceDTO> queryTaskInstances(XpackTaskInstanceDTO paramXpackGridExample);
}