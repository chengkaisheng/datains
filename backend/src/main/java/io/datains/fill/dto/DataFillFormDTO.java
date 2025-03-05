package io.datains.fill.dto;


import io.datains.commons.model.ITreeBase;
import io.datains.fill.entry.DataFillFormWithBLOBs;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class DataFillFormDTO extends DataFillFormWithBLOBs implements ITreeBase<DataFillFormDTO> {

    private static final long serialVersionUID = 1428065978308162738L;

    @ApiModelProperty("标签")
    private String label;
    @ApiModelProperty("子节点")
    private List<DataFillFormDTO> children;
    @ApiModelProperty("权限")
    private String privileges;

    private String creatorName;
    private String datasourceName;


}
