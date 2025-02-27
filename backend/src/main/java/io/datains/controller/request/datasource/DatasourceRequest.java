package io.datains.controller.request.datasource;

import io.datains.base.domain.Datasource;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;


@Getter
@Setter
public class DatasourceRequest {
    protected String query;
    protected String table;
    protected Datasource datasource;
    private Integer pageSize;
    private Integer page;
    private Integer realSize;
    private Integer fetchSize = 10000;
    private boolean pageable = false;
    private boolean previewData = false;
    private List<TableFieldWithValue> tableFieldWithValues;
    private boolean lowerCaseTaleNames;

    @Getter
    @Setter
    @Accessors(chain = true)
    public static class TableFieldWithValue {
        private Object value;
        private String filedName;
        private String typeName;
        private Integer type;
    }
}
