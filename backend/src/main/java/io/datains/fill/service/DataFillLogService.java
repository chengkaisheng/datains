package io.datains.fill.service;

import io.datains.commons.utils.AuthUtils;
import io.datains.fill.dto.DataFillCommitLogDTO;
import io.datains.fill.entry.DataFillCommitLog;
import io.datains.fill.mapper.DataFillCommitLogMapper;
import io.datains.fill.mapper.ExtDataFillFormMapper;
import io.datains.fill.request.DataFillCommitLogSearchRequest;
import org.pentaho.di.core.util.UUIDUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class DataFillLogService {

    @Resource
    private ExtDataFillFormMapper extDataFillFormMapper;

    @Resource
    private DataFillCommitLogMapper dataFillCommitLogMapper;


    public static final String COMMIT_OPERATE_INSERT = "INSERT";
    public static final String COMMIT_OPERATE_UPDATE = "UPDATE";
    public static final String COMMIT_OPERATE_DELETE = "DELETE";


    public List<DataFillCommitLogDTO> commitLogs(String formId, DataFillCommitLogSearchRequest request) {


        return extDataFillFormMapper.selectDataFillLogs(formId, request.getCommitByName());

    }

    public void saveCommitOperation(String operate, String formId, String dataId) {
        DataFillCommitLog log = new DataFillCommitLog();
        log.setId(UUIDUtil.getUUIDAsString());
        log.setFormId(formId);
        log.setDataId(dataId);
        log.setCommitBy(AuthUtils.getUser().getUsername());
        log.setOperate(operate);
        log.setCommitTime(new Date());

        dataFillCommitLogMapper.insertSelective(log);
    }

    public void saveCommitOperations(String operate, String formId, List<String> dataIds) {
        for (String dataId : dataIds) {
            saveCommitOperation(operate, formId, dataId);
        }
    }
}
