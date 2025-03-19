package io.datains.fill.mapper;

import io.datains.fill.dto.DataFillFormLogDTO;
import io.datains.fill.entry.DataFillFormLog;
import io.datains.fill.request.DataFillFormLogRequest;

import java.util.List;

/**
 * DataFillFormLogMapper
 *
 * @author zhangzihang
 * @since 2025-03-17 14:44
 */
public interface DataFillFormLogMapper {
    void insert(DataFillFormLog dataFillFormLog);

    List<DataFillFormLogDTO> select(DataFillFormLogRequest request);
}
