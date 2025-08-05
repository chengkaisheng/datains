package io.datains.dto.chart;

import lombok.Data;

/**
 * ChartViewFieldOrderDTO
 *
 * @author zhangzihang
 * @since 2025-07-31 13:51
 */
@Data
public class ChartViewFieldOrderDTO {
    private String originName;
    private Integer sortIndex;
    private String originField;
    private String fieldAlias;
    private String sort;
}
