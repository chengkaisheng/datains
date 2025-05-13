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
import io.datains.mybatis.jsqlparser.statement.DeclareStatement;
import io.datains.mybatis.jsqlparser.util.validation.ValidationCapability;

/**
 * @author gitmotte
 */
public class DeclareStatementValidator extends AbstractValidator<DeclareStatement> {

    @Override
    public void validate(DeclareStatement declare) {
        for (ValidationCapability c : getCapabilities()) {
            validateFeature(c, Feature.declare);
        }
        validateOptionalExpression(declare.getUserVariable());
    }

}
