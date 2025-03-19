package io.datains.fill.dto;

import io.datains.fill.entry.DataFillFormLog;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DataFillFormLogDTO
 *
 * @author zhangzihang
 * @since 2025-03-19 10:52
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class DataFillFormLogDTO extends DataFillFormLog {
    private String creatorName;
}
