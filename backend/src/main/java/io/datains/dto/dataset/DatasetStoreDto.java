package io.datains.dto.dataset;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@Data
public class DatasetStoreDto {

    @ApiModelProperty("收藏ID")
    private Long storeId;
    @ApiModelProperty("数据集名称")
    private String name;
    @ApiModelProperty("数据集Id")
    private String datasetId;

}
