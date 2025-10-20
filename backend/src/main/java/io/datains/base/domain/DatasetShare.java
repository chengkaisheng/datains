package io.datains.base.domain;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class DatasetShare implements Serializable {
    @ApiModelProperty("分享ID")
    private Long shareId;
    @ApiModelProperty("数据集ID")
    private String datasetId;
    @ApiModelProperty("目标ID")
    private Long targetId;
    @ApiModelProperty("分享时间")
    private Long createTime;
    @ApiModelProperty("类型")
    private Integer type;
    @ApiModelProperty("数据集类型")
    private String datasetType;
    @ApiModelProperty("权限")
    private String privileges;

    private static final long serialVersionUID = 1L;
}
