/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2019 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.statement.select;

import io.datains.mybatis.jsqlparser.expression.Expression;
import io.datains.mybatis.jsqlparser.expression.operators.relational.ExpressionList;
import io.datains.mybatis.jsqlparser.expression.operators.relational.ParenthesedExpressionList;

import java.util.Arrays;
import java.util.Collection;

public class Values extends Select {

    private ExpressionList<Expression> expressions;

    public Values() {
        // empty constructor
    }

    public Values(ExpressionList<Expression> expressions) {
        this.expressions = expressions;
    }

    public ExpressionList<?> getExpressions() {
        return expressions;
    }


    public void setExpressions(ExpressionList<Expression> expressions) {
        this.expressions = expressions;
    }

    @Override
    public StringBuilder appendSelectBodyTo(StringBuilder builder) {
        builder.append("VALUES ");
        builder.append(expressions.toString());
        return builder;
    }

    @Override
    public void accept(SelectVisitor selectVisitor) {
        selectVisitor.visit(this);
    }

    public Values withExpressions(ExpressionList<Expression> expressions) {
        this.setExpressions(expressions);
        return this;
    }

    public Values addExpressions(Expression... expressions) {
        return this.addExpressions(Arrays.asList(expressions));
    }

    public Values addExpressions(Collection<? extends Expression> expressions) {
        if (this.expressions == null) {
            this.expressions = new ParenthesedExpressionList<>();
        }
        this.expressions.addAll(expressions);
        return this;
    }
}
