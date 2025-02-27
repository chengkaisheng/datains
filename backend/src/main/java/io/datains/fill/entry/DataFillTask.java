package io.datains.fill.entry;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DataFillTask implements Serializable {
    private Long id;

    private String name;

    private String formId;

    private Date startTime;

    private Date endTime;

    private Integer rateType;

    private String rateVal;

    private Date publishStartTime;

    private Date publishEndTime;

    private Integer publishRangeTimeType;

    private Integer publishRangeTime;

    private Long creator;

    private Date createTime;

    private Boolean status;

    private static final long serialVersionUID = 1L;
}
