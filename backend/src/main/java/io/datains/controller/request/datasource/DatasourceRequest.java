package io.datains.controller.request.datasource;

import io.datains.base.domain.Datasource;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Getter
@Setter
public class DatasourceRequest {
    private final String REG_WITH_SQL_FRAGMENT = "((?i)WITH[\\s\\S]+(?i)AS?\\s*\\([\\s\\S]+\\))\\s*(?i)SELECT";
    private Pattern WITH_SQL_FRAGMENT = Pattern.compile(REG_WITH_SQL_FRAGMENT);
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
    public String getQuery() {
        return rebuildSqlWithFragment(this.query);
    }
    private String rebuildSqlWithFragment(String sql) {
        if (!sql.toLowerCase().startsWith("with")) {
            Matcher matcher = WITH_SQL_FRAGMENT.matcher(sql);
            if (matcher.find()) {
                String withFragment = matcher.group();
                if (!com.alibaba.druid.util.StringUtils.isEmpty(withFragment)) {
                    if (withFragment.length() > 6) {
                        int lastSelectIndex = withFragment.length() - 6;
                        sql = sql.replace(withFragment, withFragment.substring(lastSelectIndex));
                        withFragment = withFragment.substring(0, lastSelectIndex);
                    }
                    sql = withFragment + " " + sql;
                    sql = sql.replaceAll(" " + "{2,}", " ");
                }
            }
        }
        return sql;
    }
}
