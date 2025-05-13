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

import io.datains.mybatis.jsqlparser.expression.Expression;
import io.datains.mybatis.jsqlparser.expression.ExpressionVisitor;
import io.datains.mybatis.jsqlparser.expression.operators.relational.ExpressionList;
import io.datains.mybatis.jsqlparser.expression.operators.relational.NamedExpressionList;
import io.datains.mybatis.jsqlparser.expression.operators.relational.ParenthesedExpressionList;

import java.util.Collections;
import java.util.List;

public class ExpressionListDeParser<T extends Expression>
        extends AbstractDeParser<ExpressionList<?>> {

    private final ExpressionVisitor expressionVisitor;

    public ExpressionListDeParser(ExpressionVisitor expressionVisitor, StringBuilder builder) {
        super(builder);
        this.expressionVisitor = expressionVisitor;
    }

    @Override
    public void deParse(ExpressionList<?> expressionList) {
        // @todo: remove this NameExpressionList related part
        String comma = expressionList instanceof NamedExpressionList
                ? " "
                : ", ";
        // @todo: remove this NameExpressionList related part
        List<String> names = expressionList instanceof NamedExpressionList
                ? ((NamedExpressionList) expressionList).getNames()
                : Collections.nCopies(expressionList.size(), "");

        if (expressionList != null) {
            if (expressionList instanceof ParenthesedExpressionList<?>) {
                buffer.append("(");
            }
            int i = 0;
            for (Expression expression : expressionList) {
                if (i > 0) {
                    buffer.append(comma);
                }

                // @todo: remove this NameExpressionList related part
                String name = names.get(i);
                if (!name.equals("")) {
                    buffer.append(name);
                    buffer.append(" ");
                }
                expression.accept(expressionVisitor);
                i++;
            }

            if (expressionList instanceof ParenthesedExpressionList<?>) {
                buffer.append(")");
            }
        }
    }
}
