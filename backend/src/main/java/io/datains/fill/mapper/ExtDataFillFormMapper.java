package io.datains.fill.mapper;


import io.datains.fill.dto.DataFillCommitLogDTO;
import io.datains.fill.dto.DataFillFormDTO;
import io.datains.fill.dto.DataFillTaskDTO;
import io.datains.fill.dto.DataFillUserTaskDTO;
import io.datains.fill.entry.DataFillTask;
import io.datains.fill.request.DataFillFormRequest;
import io.datains.fill.request.DataFillTaskSearchRequest;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface ExtDataFillFormMapper {
    List<DataFillFormDTO> search(DataFillFormRequest request);

    Map<String, String> searchChildrenIds(String id, String type);

    List<DataFillCommitLogDTO> selectLatestLogByFormDataIds(String formId, List<String> dataIds);

    List<DataFillCommitLogDTO> selectDataFillLogs(String formId, String commitByName);

    List<DataFillTaskDTO> selectDataFillTasks(DataFillTaskSearchRequest request);
    List<DataFillTask> selectActiveDataFillTasks();

    List<DataFillUserTaskDTO> listTodoUserTask(long userId, Date current, String taskName);
    List<DataFillUserTaskDTO> listFinishedUserTask(long userId, Date current, String taskName);
    List<DataFillUserTaskDTO> listExpiredUserTask(long userId, Date current, String taskName);
}
