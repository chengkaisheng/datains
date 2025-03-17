package io.datains.fill.dto;

import io.datains.commons.model.ITreeBase;
import io.datains.fill.entry.DataFillFormTemplateWithBLOBs;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * DataFillFormTemplateDTO
 *
 * @author zhangzihang
 * @since 2025-03-13 10:26
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class DataFillFormTemplateDTO extends DataFillFormTemplateWithBLOBs implements ITreeBase<DataFillFormTemplateDTO> {

    private String label;
    private List<DataFillFormTemplateDTO> children;
    private String privileges;
    private String creatorName;
    private String datasourceName;
}
