package io.datains.mybatis.interceptor;

import io.datains.mybatis.jsqlparser.expression.Alias;
import io.datains.mybatis.jsqlparser.expression.Expression;
import io.datains.mybatis.jsqlparser.schema.Table;
import io.datains.mybatis.jsqlparser.statement.select.*;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;

import java.util.List;
import java.util.Optional;

/**
 * MyFromItemVisitor
 *
 * @author zhangzihang
 * @since 2024-01-18 16:50
 */
public class MyFromItemVisitor implements FromItemVisitor {
    private static final Log logger = LogFactory.getLog(MyFromItemVisitor.class);

    @Override
    public void visit(Table tableName) {
        if (tableName.getSchemaName() != null) {
            String schemaName = tableName.getSchemaName().replace("`", "").replace("\"", "");
            tableName.setSchemaName("\"" + schemaName + "\"");
        }
        if (tableName.getName() != null) {
            String name = tableName.getName().replace("`", "").replace("\"", "");
            tableName.setName("\"" + name + "\"");
        }
        Alias alias = tableName.getAlias();
        if (alias != null) {
            Optional.of(alias).map(Alias::getName).map(this::removeQuote).map(this::addQuote).ifPresent(alias::setName);
        }
    }

    @Override
    public void visit(ParenthesedSelect selectBody) {
        logger.debug("ParenthesedSelect 被执行了");
        selectBody.accept(MyJSqlVisitor.MY_SELECT_VISITOR);
    }

    @Override
    public void visit(LateralSubSelect lateralSubSelect) {
        logger.debug("LateralSubSelect 被执行了");
    }

    @Override
    public void visit(TableFunction tableFunction) {
        logger.debug("TableFunction 被执行了");
        MyJSqlVisitor.MY_EXPRESSION_VISITOR.visit(tableFunction.getFunction());
    }

    @Override
    public void visit(ParenthesedFromItem aThis) {
        logger.debug("ParenthesedFromItem 被执行了");
        aThis.getFromItem().accept(this);
        // support join keyword in fromItem
        visitJoins(aThis.getJoins());
    }
    private void visitJoins(List<Join> parenthesis) {
        if (parenthesis == null) {
            return;
        }
        for (Join join : parenthesis) {
            join.getFromItem().accept(this);
            join.getRightItem().accept(this);
            for (Expression expression : join.getOnExpressions()) {
                expression.accept(new MyExpressionVisitor());
            }
        }
    }
    public String addQuote(String str) {
        return "\"" + str + "\"";
    }

    public String removeQuote(String str) {
        return str.replace("`", "").replace("\"", "");
    }

}
