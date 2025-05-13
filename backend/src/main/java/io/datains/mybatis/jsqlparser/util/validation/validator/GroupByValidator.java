/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2019 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.util.validation.validator;

import io.datains.mybatis.jsqlparser.expression.Expression;
import io.datains.mybatis.jsqlparser.expression.operators.relational.ExpressionList;
import io.datains.mybatis.jsqlparser.parser.feature.Feature;
import io.datains.mybatis.jsqlparser.statement.select.GroupByElement;
import io.datains.mybatis.jsqlparser.statement.select.GroupByVisitor;
import io.datains.mybatis.jsqlparser.util.validation.ValidationCapability;

/**
 * @author gitmotte
 */
public class GroupByValidator extends AbstractValidator<GroupByElement> implements GroupByVisitor {

    @Override
    public void validate(GroupByElement groupBy) {
        groupBy.accept(this);
    }

    @Override
    public void visit(GroupByElement groupBy) {
        for (ValidationCapability c : getCapabilities()) {
            validateFeature(c, Feature.selectGroupBy);
            if (isNotEmpty(groupBy.getGroupingSets())) {
                validateFeature(c, Feature.selectGroupByGroupingSets);
            }
        }

        validateOptionalExpressions(groupBy.getGroupByExpressions());

        if (isNotEmpty(groupBy.getGroupingSets())) {
            for (Object o : groupBy.getGroupingSets()) {
                if (o instanceof Expression) {
                    validateOptionalExpression((Expression) o);
                } else if (o instanceof ExpressionList) {
                    validateOptionalExpressions(((ExpressionList) o).getExpressions());
                }
            }
        }
    }

}
