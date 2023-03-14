package io.datains.base.domain;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:58
 * @Description
 */
@Data
public class XpackTaskGridDTO {
    private Long taskId;

    private String taskName;

    private Long instanceId;

    private Long lastSendTime;

    private Integer lastSendStatus;

    private Long nextExecTime;

    private Long creator;

    private String creatorName;

    private Long createTime;

    private Integer rateType;

    private String rateVal;

    private Long endTime;
}
