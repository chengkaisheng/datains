package io.datains.controller.request.dataset;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel("取消分享参数")
public class DatasetShareRemoveRequest implements Serializable {

    @ApiModelProperty("数据集ID")
    private String datasetId;

    @ApiModelProperty("分享ID")
    private String shareId;
}
