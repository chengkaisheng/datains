package io.datains.controller.request.dataset;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class DatasetShareSearchRequest implements Serializable {

    @ApiModelProperty(value = "分享目标类型", allowableValues = "0:user,1:role,2:dept")
    private String type;

    @ApiModelProperty("数据集ID")
    private String resourceId;

    @ApiModelProperty("当前用户")
    private String currentUserName;

}
