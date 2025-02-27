package io.datains.provider.datasource;

import io.datains.controller.request.datasource.DatasourceRequest;
import io.datains.dto.datasource.TableDesc;
import io.datains.dto.datasource.TableField;

import java.util.List;
import java.util.Map;

public abstract class DatasourceProvider {

    private int resultLimit = 30000;

    abstract public List<String[]> getData(DatasourceRequest datasourceRequest) throws Exception;

    abstract public List<TableDesc> getTables(DatasourceRequest datasourceRequest) throws Exception;

    public String checkStatus(DatasourceRequest datasourceRequest) throws Exception {
        getData(datasourceRequest);
        return "Success";
    }

    abstract public List<String[]> fetchResult(DatasourceRequest datasourceRequest) throws Exception;

    abstract public List<TableField> fetchResultField(DatasourceRequest datasourceRequest) throws Exception;

    abstract public Map<String, List> fetchResultAndField(DatasourceRequest datasourceRequest) throws Exception;

    abstract public void handleDatasource(DatasourceRequest datasourceRequest, String type) throws Exception;

    abstract public List<String> getSchema(DatasourceRequest datasourceRequest) throws Exception;


    abstract public List<TableField> getTableFields(DatasourceRequest datasourceRequest) throws Exception;
}
