package io.datains.fill.entry;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class DataFillFormTemplateWithBLOBs extends DataFillFormTemplate implements Serializable {
    private String forms;

    private String tableIndexes;

    private String formData;

    private static final long serialVersionUID = 1L;
}
