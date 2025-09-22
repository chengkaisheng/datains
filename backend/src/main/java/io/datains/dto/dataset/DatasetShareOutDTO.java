package io.datains.dto.dataset;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@ApiModel("数据集分享目标")
@Data
public class DatasetShareOutDTO implements Serializable {

    @ApiModelProperty("数据集ID")
    private String datasetId;

    @ApiModelProperty("数据集类型")
    private String datasetType;

    @ApiModelProperty("分享ID")
    private Long shareId;

    @ApiModelProperty("分享类型{0:用户,1:角色,2:组织}")
    private int type;

    @ApiModelProperty("目标ID")
    private String targetId;

    @ApiModelProperty("目标名称")
    private String targetName;

    @ApiModelProperty("分享时间")
    private Long createTime;
}
