package io.datains.fill.entry;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class DataFillFormWithBLOBs extends DataFillForm implements Serializable {
    private String forms;

    private String tableIndexes;

    private static final long serialVersionUID = 1L;
}
