package io.datains.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 16:09
 * @Description
 */
@Data
public class DatasetRowPermissions implements Serializable {
    private String id;
    private String authTargetType;
    private Long authTargetId;
    private String datasetId;
    private String datasetFieldId;
    private String filter;
    private String logic;
    private String filterType;
    private String enumCheckField;
    private Long updateTime;
    private static final long serialVersionUID = 1L;
}
