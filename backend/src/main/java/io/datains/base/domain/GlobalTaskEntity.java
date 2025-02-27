package io.datains.base.domain;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:49
 * @Description
 */
@Data
@Accessors(chain = true)
public class GlobalTaskEntity implements Serializable {

    private static final long serialVersionUID = 4599805767414389668L;

    private Long taskId;

    private String taskName;

    private String taskType;

    private Long startTime;

    private Long endTime;

    private Integer rateType;

    private String rateVal;

    private Long creator;

    private Long createTime;

    private String cron;

    private String jobKey;

    private Boolean status = true;
}
