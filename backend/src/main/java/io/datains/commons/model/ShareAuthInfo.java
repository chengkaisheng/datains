package io.datains.commons.model;


import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ShareAuthInfo {
    @ApiModelProperty("分享目标id")
    private String authTarget;
    @ApiModelProperty("分享目标类型")
    private String authTargetType;
    @ApiModelProperty("权限类型")
    private Integer privilegeType;
    @ApiModelProperty("权限值")
    private Integer privilegeValue;
}
