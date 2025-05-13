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
import io.datains.mybatis.jsqlparser.statement.ShowColumnsStatement;
import io.datains.mybatis.jsqlparser.util.validation.metadata.NamedObject;

/**
 * @author gitmotte
 */
public class ShowColumnsStatementValidator extends AbstractValidator<ShowColumnsStatement> {

    @Override
    public void validate(ShowColumnsStatement show) {
        validateFeatureAndName(Feature.showColumns, NamedObject.table, show.getTableName());
    }
}
