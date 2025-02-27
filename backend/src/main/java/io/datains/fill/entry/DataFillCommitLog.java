package io.datains.fill.entry;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DataFillCommitLog implements Serializable {
    private String id;

    private String formId;

    private String dataId;

    private String operate;

    private String commitBy;

    private Date commitTime;

    private static final long serialVersionUID = 1L;
}
