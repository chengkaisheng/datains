package io.datains.base.domain;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:49
 * @Description
 */
@Data
public class GlobalTaskEntity {
    private Long taskId;

    private String taskName;

    private String taskType;

    private Long startTime;

    private Long endTime;

    private Integer rateType;

    private String rateVal;

    private Long creator;

    private Long createTime;
}
