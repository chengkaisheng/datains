package io.datains.mybatis.interceptor;

import io.datains.mybatis.jsqlparser.expression.operators.relational.ExpressionList;
import io.datains.mybatis.jsqlparser.statement.select.GroupByElement;
import io.datains.mybatis.jsqlparser.statement.select.GroupByVisitor;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;

/**
 * MyGroupByVisitor
 *
 * @author zhangzihang
 * @since 2024-01-19 09:41
 */
public class MyGroupByVisitor implements GroupByVisitor {
    private static final Log logger = LogFactory.getLog(MyGroupByVisitor.class);

    @Override
    public void visit(GroupByElement groupBy) {
        ExpressionList<?> expressions = groupBy.getGroupByExpressionList();
        if (expressions != null && !expressions.isEmpty()) {
            expressions.forEach(expression -> expression.accept(MyJSqlVisitor.MY_EXPRESSION_VISITOR));
        }
    }
}
