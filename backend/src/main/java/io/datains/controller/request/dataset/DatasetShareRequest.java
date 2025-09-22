package io.datains.controller.request.dataset;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class DatasetShareRequest implements Serializable {
    @ApiModelProperty(value = "分享目标类型", allowableValues = "0:user,1:role,2:dept")
    private Integer type;
    @ApiModelProperty("分享目标集合")
    private List<Long> targetIds;
    @ApiModelProperty("分享数据集集合")
    private List<String> datasetIds;
}
