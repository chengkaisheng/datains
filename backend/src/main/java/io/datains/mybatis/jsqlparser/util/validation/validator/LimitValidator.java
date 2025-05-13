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
import io.datains.mybatis.jsqlparser.statement.select.Limit;
import io.datains.mybatis.jsqlparser.util.validation.ValidationCapability;

/**
 * @author gitmotte
 */
public class LimitValidator extends AbstractValidator<Limit> {


    @Override
    public void validate(Limit limit) {
        for (ValidationCapability c : getCapabilities()) {
            validateFeature(c, Feature.limit);
            validateFeature(c, limit.isLimitNull(), Feature.limitNull);
            validateFeature(c, limit.isLimitAll(), Feature.limitAll);
            validateOptionalFeature(c, limit.getOffset(), Feature.limitOffset);
        }
    }
}
