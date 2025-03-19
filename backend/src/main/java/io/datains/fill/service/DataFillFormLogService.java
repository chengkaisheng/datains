package io.datains.fill.service;

import io.datains.auth.api.dto.CurrentUserDto;
import io.datains.commons.utils.AuthUtils;
import io.datains.fill.constants.FormLogEnum;
import io.datains.fill.dto.DataFillFormLogDTO;
import io.datains.fill.entry.DataFillFormLog;
import io.datains.fill.mapper.DataFillFormLogMapper;
import io.datains.fill.request.DataFillFormLogRequest;
import org.pentaho.di.core.util.UUIDUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * DataFillFormLogService
 *
 * @author zhangzihang
 * @since 2025-03-17 14:44
 */
@Service
public class DataFillFormLogService {
    @Resource
    private DataFillFormLogMapper dataFillFormLogMapper;

    public void insert(String formId, String formName, FormLogEnum formLogEnum) {
        CurrentUserDto user = AuthUtils.getUser();
        DataFillFormLog dataFillFormLog = new DataFillFormLog();
        dataFillFormLog.setId(UUIDUtil.getUUID().toString());
        dataFillFormLog.setFormId(formId);
        dataFillFormLog.setDescription(String.format(formLogEnum.getDesc(), user.getNickName(), formName));
        dataFillFormLog.setOperate(formLogEnum.getCode());
        dataFillFormLog.setCommitBy(user.getUsername());
        this.dataFillFormLogMapper.insert(dataFillFormLog);
    }

    public void insert(String formId, FormLogEnum formLogEnum, String description) {
        CurrentUserDto user = AuthUtils.getUser();
        DataFillFormLog dataFillFormLog = new DataFillFormLog();
        dataFillFormLog.setId(UUIDUtil.getUUID().toString());
        dataFillFormLog.setFormId(formId);
        dataFillFormLog.setDescription(description);
        dataFillFormLog.setOperate(formLogEnum.getCode());
        dataFillFormLog.setCommitBy(user.getUsername());
        this.dataFillFormLogMapper.insert(dataFillFormLog);
    }
    public List<DataFillFormLogDTO> select(DataFillFormLogRequest request){
        return this.dataFillFormLogMapper.select(request);
    }
}
