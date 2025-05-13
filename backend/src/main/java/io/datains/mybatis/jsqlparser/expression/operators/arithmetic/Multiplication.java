/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2019 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.expression.operators.arithmetic;

import io.datains.mybatis.jsqlparser.expression.BinaryExpression;
import io.datains.mybatis.jsqlparser.expression.Expression;
import io.datains.mybatis.jsqlparser.expression.ExpressionVisitor;

public class Multiplication extends BinaryExpression {

    @Override
    public void accept(ExpressionVisitor expressionVisitor) {
        expressionVisitor.visit(this);
    }

    @Override
    public String getStringExpression() {
        return "*";
    }

    @Override
    public Multiplication withLeftExpression(Expression arg0) {
        return (Multiplication) super.withLeftExpression(arg0);
    }

    @Override
    public Multiplication withRightExpression(Expression arg0) {
        return (Multiplication) super.withRightExpression(arg0);
    }
}
