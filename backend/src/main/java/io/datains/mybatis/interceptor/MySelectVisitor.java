package io.datains.mybatis.interceptor;

import io.datains.mybatis.jsqlparser.expression.Expression;
import io.datains.mybatis.jsqlparser.statement.select.*;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;

import java.util.Collection;
import java.util.List;

/**
 * MySelectVisitor
 *
 * @author zhangzihang
 * @since 2024-01-19 10:06
 */
public class MySelectVisitor implements SelectVisitor {
    protected static final Log logger = LogFactory.getLog(MySelectVisitor.class);

    @Override
    public void visit(ParenthesedSelect parenthesedSelect) {
        logger.debug("ParenthesedSelect 被执行了");
        if (parenthesedSelect.getSelect() == null) {
            return;
        }
        if (parenthesedSelect.getSelect() instanceof PlainSelect) {
            parenthesedSelect.getSelect().accept(this);
            return;
        }
        if (parenthesedSelect.getSetOperationList() != null) {
            parenthesedSelect.getSetOperationList().accept(this);
        }

    }

    @Override
    public void visit(PlainSelect plainSelect) {
        //select字段
        List<SelectItem<?>> selectItems = plainSelect.getSelectItems();
        if (selectItems != null && !selectItems.isEmpty()) {
            selectItems.forEach(selectItem -> selectItem.accept(MyJSqlVisitor.MY_SELECT_ITEM_VISITOR));
        }
        //from语句
        FromItem fromItems = plainSelect.getFromItem();
        if (fromItems != null){
            fromItems.accept(MyJSqlVisitor.MY_FROM_ITEM_VISITOR);
        }
        //join语句
        List<Join> joins = plainSelect.getJoins();
        if (joins != null && !joins.isEmpty()) {
            joins.forEach(join -> {
                join.getFromItem().accept(MyJSqlVisitor.MY_FROM_ITEM_VISITOR);
                Collection<Expression> expressions = join.getOnExpressions();
                expressions.forEach(expression -> expression.accept(MyJSqlVisitor.MY_EXPRESSION_VISITOR));
            });
        }
        //where语句
        if (plainSelect.getWhere() != null) {
            plainSelect.getWhere().accept(MyJSqlVisitor.MY_EXPRESSION_VISITOR);
        }
        //order语句
        List<OrderByElement> orderByElements = plainSelect.getOrderByElements();
        if (orderByElements != null && !orderByElements.isEmpty()) {
            orderByElements.forEach(orderByElement -> orderByElement.accept(MyJSqlVisitor.MY_ORDER_BY_VISITOR));
        }
        //group语句
        if (plainSelect.getGroupBy() != null) {
            plainSelect.getGroupBy().accept(MyJSqlVisitor.MY_GROUP_BY_VISITOR);
        }
    }

    @Override
    public void visit(SetOperationList setOpList) {
        logger.debug("SetOperationList 被执行了");
        List<Select> selects = setOpList.getSelects();
        if (selects != null && !selects.isEmpty()) {
            setOpList.getSelects().forEach(select -> select.accept(this));
        }
    }

    @Override
    public void visit(WithItem withItem) {
        logger.debug("WithItem 被执行了");
    }

    @Override
    public void visit(Values aThis) {
        logger.debug("Values 被执行了");
    }

    @Override
    public void visit(LateralSubSelect lateralSubSelect) {
        logger.debug("LateralSubSelect 被执行了");
    }

    @Override
    public void visit(TableStatement tableStatement) {
        logger.debug("TableStatement 被执行了");
    }
}
