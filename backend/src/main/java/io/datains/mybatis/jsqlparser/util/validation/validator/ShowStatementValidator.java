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
import io.datains.mybatis.jsqlparser.statement.ShowStatement;

/**
 * @author gitmotte
 */
public class ShowStatementValidator extends AbstractValidator<ShowStatement> {

    @Override
    public void validate(ShowStatement show) {
        validateFeature(Feature.show);
    }
}
