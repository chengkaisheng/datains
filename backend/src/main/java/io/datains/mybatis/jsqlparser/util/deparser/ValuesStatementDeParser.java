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
import io.datains.mybatis.jsqlparser.statement.select.Values;

public class ValuesStatementDeParser extends AbstractDeParser<Values> {

    private final ExpressionVisitor expressionVisitor;

    public ValuesStatementDeParser(ExpressionVisitor expressionVisitor, StringBuilder buffer) {
        super(buffer);
        this.expressionVisitor = expressionVisitor;
    }

    @Override
    public void deParse(Values values) {
        buffer.append("VALUES ");
        values.getExpressions().accept(expressionVisitor);
    }
}
