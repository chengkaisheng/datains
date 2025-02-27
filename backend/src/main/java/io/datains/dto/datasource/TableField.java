package io.datains.dto.datasource;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TableField {
    @ApiModelProperty("字段名称")
    private String fieldName;
    @ApiModelProperty("重新标记")
    private String remarks;
    @ApiModelProperty("字段类型")
    private String fieldType;
    @ApiModelProperty("字段大小")
    private int fieldSize;
    private int accuracy;
    private boolean notNull;
    private boolean primaryKey;
    //java.sql.Types
    private Integer type;

    private int inCount;
}
