package io.datains.provider;

import com.google.gson.Gson;
import io.datains.base.domain.ChartViewWithBLOBs;
import io.datains.base.domain.DatasetTableField;
import io.datains.base.domain.Datasource;
import io.datains.controller.request.chart.ChartExtFilterRequest;
import io.datains.dto.chart.ChartFieldCustomFilterDTO;
import io.datains.dto.chart.ChartViewFieldDTO;
import io.datains.dto.datasource.JdbcConfiguration;
import io.datains.dto.sqlObj.SQLObj;
import io.datains.plugins.common.constants.PgConstants;
import io.datains.plugins.util.PageInfo;

import java.util.List;

/**
 * @Author gin
 * @Date 2021/5/17 2:42 下午
 */
public abstract class QueryProvider {

    public abstract Integer transFieldType(String field);

    public abstract String createSQLPreview(String sql, String orderBy);

    public abstract String createQuerySQL(String table, List<DatasetTableField> fields, boolean isGroup, Datasource ds, List<ChartFieldCustomFilterDTO> fieldCustomFilter);

    public abstract String createQuerySQLAsTmp(String sql, List<DatasetTableField> fields, boolean isGroup, List<ChartFieldCustomFilterDTO> fieldCustomFilter);

    public abstract String createQueryTableWithPage(String table, List<DatasetTableField> fields, Integer page, Integer pageSize, Integer realSize, boolean isGroup, Datasource ds, List<ChartFieldCustomFilterDTO> fieldCustomFilter);

    public abstract String createQuerySQLWithPage(String sql, List<DatasetTableField> fields, Integer page, Integer pageSize, Integer realSize, boolean isGroup, List<ChartFieldCustomFilterDTO> fieldCustomFilter);

    public abstract String createQueryTableWithLimit(String table, List<DatasetTableField> fields, Integer limit, boolean isGroup, Datasource ds, List<ChartFieldCustomFilterDTO> fieldCustomFilter);

    public abstract String createQuerySqlWithLimit(String sql, List<DatasetTableField> fields, Integer limit, boolean isGroup, List<ChartFieldCustomFilterDTO> fieldCustomFilter);

    public abstract String getSQL(String table, List<ChartViewFieldDTO> xAxis, List<ChartViewFieldDTO> yAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, Datasource ds, ChartViewWithBLOBs view);

    public abstract String getSQLAsTmp(String table, List<ChartViewFieldDTO> xAxis, List<ChartViewFieldDTO> yAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, ChartViewWithBLOBs view);

    public abstract String getSQLTableInfo(String table, List<ChartViewFieldDTO> xAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, Datasource ds, ChartViewWithBLOBs view);

    public String getSQLWithPage(boolean isTable, String table, List<ChartViewFieldDTO> xAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, Datasource ds, ChartViewWithBLOBs view, PageInfo pageInfo) {
        if (isTable) {
            return getSQLTableInfo(table, xAxis, fieldCustomFilter, extFilterRequestList, ds, view);
        } else {
            return getSQLAsTmpTableInfo(table, xAxis, fieldCustomFilter, extFilterRequestList, ds, view);
        }
    }
    public String getResultCount(boolean isTable, String table, List<ChartViewFieldDTO> xAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, Datasource ds, ChartViewWithBLOBs view) {
        if (isTable) {
            return "SELECT COUNT(*) from (" + getSQLTableInfo(table, xAxis, fieldCustomFilter, extFilterRequestList, ds, view) + ") COUNT_TEMP";
        } else {
            return "SELECT COUNT(*) from (" + getSQLAsTmpTableInfo(table, xAxis, fieldCustomFilter, extFilterRequestList, ds, view) + ") COUNT_TEMP";
        }
    }
    public abstract String getSQLAsTmpTableInfo(String sql, List<ChartViewFieldDTO> xAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, Datasource ds, ChartViewWithBLOBs view);

    public abstract String getSQLStack(String table, List<ChartViewFieldDTO> xAxis, List<ChartViewFieldDTO> yAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, List<ChartViewFieldDTO> extStack, Datasource ds, ChartViewWithBLOBs view);

    public abstract String getSQLAsTmpStack(String table, List<ChartViewFieldDTO> xAxis, List<ChartViewFieldDTO> yAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, List<ChartViewFieldDTO> extStack, ChartViewWithBLOBs view);

    public abstract String getSQLScatter(String table, List<ChartViewFieldDTO> xAxis, List<ChartViewFieldDTO> yAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, List<ChartViewFieldDTO> extBubble, Datasource ds, ChartViewWithBLOBs view);

    public abstract String getSQLAsTmpScatter(String table, List<ChartViewFieldDTO> xAxis, List<ChartViewFieldDTO> yAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, List<ChartViewFieldDTO> extBubble, ChartViewWithBLOBs view);

    public abstract String searchTable(String table);

    public abstract String getSQLSummary(String table, List<ChartViewFieldDTO> yAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, ChartViewWithBLOBs view, Datasource ds);

    public Integer transFieldSize(String type) {
        return 50;
    }

    public abstract String getSQLSummaryAsTmp(String sql, List<ChartViewFieldDTO> yAxis, List<ChartFieldCustomFilterDTO> fieldCustomFilter, List<ChartExtFilterRequest> extFilterRequestList, ChartViewWithBLOBs view);

    public abstract String wrapSql(String sql);

    public abstract String createRawQuerySQL(String table, List<DatasetTableField> fields, Datasource ds);

    public abstract String createRawQuerySQLAsTmp(String sql, List<DatasetTableField> fields);

    public void setSchema(SQLObj tableObj, Datasource ds) {
        if (ds != null && !tableObj.getTableName().startsWith("(") && !tableObj.getTableName().endsWith(")")) {
            String schema = new Gson().fromJson(ds.getConfiguration(), JdbcConfiguration.class).getSchema();
            schema = String.format(PgConstants.KEYWORD_TABLE, schema);
            tableObj.setTableName(schema + "." + tableObj.getTableName());
        }
    }

    public String convertTableToSql(String tableName, Datasource ds) {
        return "select * from  TABLE_NAME".replace("TABLE_NAME", tableName);
    }

    public String getLogic(String logic) {
        if (logic != null) {
            switch (logic) {
                case "and":
                    return "AND";
                case "or":
                    return "OR";
            }
        }
        return "AND";
    }
}
