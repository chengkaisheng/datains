package io.datains.dto.dataset;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class DatasetShareDto extends DatasetSharePo {
    @ApiModelProperty("子节点")
    private List<DatasetShareDto> children;
}
