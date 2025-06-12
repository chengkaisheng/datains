package io.datains.controller.request.chart;

import lombok.Data;

/**
 * FieldOrder
 *
 * @author zhangzihang
 * @since 2025-06-11 19:39
 */
@Data
public class FieldOrder {
    /**
     * 字段id
     */
    private String id;
    /**
     * 字段排序
     */
    private String sort;
}
