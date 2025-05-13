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
import io.datains.mybatis.jsqlparser.statement.show.ShowIndexStatement;
import io.datains.mybatis.jsqlparser.util.validation.metadata.NamedObject;

/**
*
* @author Jayant Kumar Yadav
*/

public class ShowIndexStatementValidator extends AbstractValidator<ShowIndexStatement> {

    @Override
    public void validate(ShowIndexStatement show) {
        validateFeatureAndName(Feature.showIndex, NamedObject.table, show.getTableName());
    }
}
