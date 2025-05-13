/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2022 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.expression.operators.relational;

import io.datains.mybatis.jsqlparser.expression.ExpressionVisitor;

public class GeometryDistance extends ComparisonOperator {

    public GeometryDistance() {
        super("<->");
    }

    public GeometryDistance(String operator) {
        super(operator);
    }

    @Override
    public void accept(ExpressionVisitor expressionVisitor) {
        expressionVisitor.visit(this);
    }
}
