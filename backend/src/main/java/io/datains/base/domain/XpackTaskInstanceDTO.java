package io.datains.base.domain;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:58
 * @Description
 */
@Data
public class XpackTaskInstanceDTO {
    private Long taskId;

    private Long instanceId;

    private String taskName;

    private Long executeTime;

    private Long  finishTime;

    private Integer status;

    private String info;
}
