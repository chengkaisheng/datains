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
import io.datains.mybatis.jsqlparser.statement.SetStatement;
import io.datains.mybatis.jsqlparser.util.validation.ValidationCapability;

/**
 * @author gitmotte
 */
public class SetStatementValidator extends AbstractValidator<SetStatement> {


    @Override
    public void validate(SetStatement set) {
        for (ValidationCapability c : getCapabilities()) {
            validateFeature(c, Feature.set);
        }
        for (int i = 0; i < set.getCount(); i++) {
            validateOptionalExpressions(set.getExpressions(i));
        }
    }

}
