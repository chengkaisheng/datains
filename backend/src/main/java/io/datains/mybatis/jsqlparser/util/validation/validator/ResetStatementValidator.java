/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2021 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.util.validation.validator;

import io.datains.mybatis.jsqlparser.parser.feature.Feature;
import io.datains.mybatis.jsqlparser.statement.ResetStatement;
import io.datains.mybatis.jsqlparser.util.validation.ValidationCapability;

public class ResetStatementValidator extends AbstractValidator<ResetStatement> {

    @Override
    public void validate(ResetStatement reset) {
        for (ValidationCapability c : getCapabilities()) {
            validateFeature(c, Feature.reset);
        }
    }
}
