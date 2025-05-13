/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2019 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.util.deparser;

import io.datains.mybatis.jsqlparser.expression.ExpressionVisitor;
import io.datains.mybatis.jsqlparser.statement.select.*;

/**
 * @author jxnu-liguobin
 */
public class TableStatementDeParser extends AbstractDeParser<TableStatement>
        implements SelectVisitor {

    private final ExpressionVisitor expressionVisitor;

    public TableStatementDeParser(ExpressionVisitor expressionVisitor, StringBuilder buffer) {
        super(buffer);
        this.expressionVisitor = expressionVisitor;
    }

    @Override
    public void deParse(TableStatement tableStatement) {
        tableStatement.accept(this);
    }

    public void visit(Offset offset) {
        buffer.append(" OFFSET ");
        offset.getOffset().accept(expressionVisitor);
        if (offset.getOffsetParam() != null) {
            buffer.append(" ").append(offset.getOffsetParam());
        }

    }

    @Override
    public void visit(ParenthesedSelect parenthesedSelect) {

    }

    @Override
    public void visit(PlainSelect plainSelect) {

    }

    @Override
    public void visit(SetOperationList setOpList) {

    }

    @Override
    public void visit(WithItem withItem) {

    }

    @Override
    public void visit(Values aThis) {

    }

    @Override
    public void visit(LateralSubSelect lateralSubSelect) {

    }

    @Override
    public void visit(TableStatement tableStatement) {
        buffer.append("TABLE ");
        buffer.append(tableStatement.getTable());
        if (tableStatement.getOrderByElements() != null) {
            new OrderByDeParser(expressionVisitor, buffer)
                    .deParse(tableStatement.getOrderByElements());
        }

        if (tableStatement.getLimit() != null) {
            new LimitDeparser(expressionVisitor, buffer).deParse(tableStatement.getLimit());
        }
        if (tableStatement.getOffset() != null) {
            visit(tableStatement.getOffset());
        }

        // TODO UNION
    }
}
