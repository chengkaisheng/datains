package io.datains.fill.entry;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class DataFillTaskWithBLOBs extends DataFillTask implements Serializable {
    private String reciUsers;

    private String roleList;

    private String orgList;

    private static final long serialVersionUID = 1L;
}
