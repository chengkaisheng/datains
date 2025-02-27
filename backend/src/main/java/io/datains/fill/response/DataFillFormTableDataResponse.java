package io.datains.fill.response;


import io.datains.fill.dto.ExtTableField;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class DataFillFormTableDataResponse implements Serializable {

    private static final long serialVersionUID = -6463885075511811532L;

    private Object data;

    private List<ExtTableField> fields;

    private long total;

    private long currentPage;

    private long pageSize;

    private String key;

}
