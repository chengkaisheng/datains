package io.datains.fill.request;

import io.datains.fill.entry.DataFillFormLog;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

/**
 * DataFillFormLogRequest
 *
 * @author zhangzihang
 * @since 2025-03-19 10:48
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class DataFillFormLogRequest extends DataFillFormLog {
    private String keyword;
    private Date beginTime;
    private Date endTime;
}
