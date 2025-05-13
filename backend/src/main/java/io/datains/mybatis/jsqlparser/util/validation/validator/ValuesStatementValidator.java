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

import io.datains.mybatis.jsqlparser.parser.feature.Feature;
import io.datains.mybatis.jsqlparser.statement.select.Values;

/**
 * @author gitmotte
 */
public class ValuesStatementValidator extends AbstractValidator<Values> {

    @Override
    public void validate(Values values) {
        validateFeature(Feature.values);
        validateOptionalExpression(values.getExpressions());
    }
}
