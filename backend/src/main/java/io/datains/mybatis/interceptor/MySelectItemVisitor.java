package io.datains.mybatis.interceptor;

import io.datains.mybatis.jsqlparser.expression.Alias;
import io.datains.mybatis.jsqlparser.statement.select.SelectItem;
import io.datains.mybatis.jsqlparser.statement.select.SelectItemVisitor;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;

import java.util.Optional;

/**
 * MySelectItemVisitor
 *
 * @author zhangzihang
 * @since 2024-01-17 15:30
 */
public class MySelectItemVisitor implements SelectItemVisitor {
    private static final Log logger = LogFactory.getLog(MySelectItemVisitor.class);

    @Override
    public void visit(SelectItem selectItem) {
        // selectItem alias
        Alias alias = selectItem.getAlias();
        if (alias != null) {
            Optional.of(alias).map(Alias::getName).map(s ->
                    s.replace("\"", "").replace("`", "")
            ).map(s -> "\"" + s + "\"").ifPresent(alias::setName);
        }
        selectItem.getExpression().accept(MyJSqlVisitor.MY_EXPRESSION_VISITOR);
    }
}
