package io.datains.base.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

import java.io.Serializable;

@Data
public class SysDept implements Serializable {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long deptId;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long pid;

    private Integer subCount;

    private String name;

    private Integer deptSort;

    private String createBy;

    private String updateBy;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long createTime;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long updateTime;

    private static final long serialVersionUID = 1L;
}
