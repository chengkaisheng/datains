package io.datains.fill.entry;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DataFillForm implements Serializable {
    private String id;

    private String name;

    private String pid;

    private Integer level;

    private String nodeType;

    private String tableName;

    private String datasource;

    private Boolean createIndex;

    private String createBy;

    private Date createTime;

    private String updateBy;

    private Date updateTime;

    private Boolean commitNewUpdate;

    private static final long serialVersionUID = 1L;
}
