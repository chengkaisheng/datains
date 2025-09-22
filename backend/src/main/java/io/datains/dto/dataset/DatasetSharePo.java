package io.datains.dto.dataset;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DatasetSharePo {

    @ApiModelProperty("节点ID")
    private String id;
    @ApiModelProperty("名称")
    private String name;
    @ApiModelProperty("节点父ID")
    private String creator;
    @ApiModelProperty("分享人ID")
    private Long userId;
    @ApiModelProperty("数据集类型")
    private String datasetType;
}
