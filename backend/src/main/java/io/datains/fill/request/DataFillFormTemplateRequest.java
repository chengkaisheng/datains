package io.datains.fill.request;

import io.datains.fill.entry.DataFillFormTemplate;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;

/**
 * DataFillFormTemplateRequest
 *
 * @author zhangzihang
 * @since 2025-03-13 10:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class DataFillFormTemplateRequest extends DataFillFormTemplate {
    @ApiModelProperty("排序")
    private String sort;
    @ApiModelProperty("用户ID")
    private String userId;
    @ApiModelProperty("ID集合")
    private Set<String> ids;
    @ApiModelProperty("排除的ID")
    private String excludedId;
}
