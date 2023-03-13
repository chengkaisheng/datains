package io.datains.base.domain;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 11:31
 * @Description
 */

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class XpackSysRole implements Serializable {

    private List<XpackConditionEntity> conditions;
    private List<String> orders;


    @ApiModelProperty("ID")
    private Long roleId;

    @ApiModelProperty("组织ID")
    private String name;

    @ApiModelProperty("描述")
    private String description;

    @ApiModelProperty("创建者")
    private String createBy;

    @ApiModelProperty("更新者")
    private String updateBy;

    @ApiModelProperty("创建日期")
    private Long createTime;

    @ApiModelProperty("更新日期")
    private Long updateTime;


}
