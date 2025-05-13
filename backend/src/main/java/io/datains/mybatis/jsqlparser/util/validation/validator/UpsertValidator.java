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
import io.datains.mybatis.jsqlparser.statement.select.Select;
import io.datains.mybatis.jsqlparser.statement.update.UpdateSet;
import io.datains.mybatis.jsqlparser.statement.upsert.Upsert;
import io.datains.mybatis.jsqlparser.util.validation.ValidationCapability;

/**
 * @author gitmotte
 */
public class UpsertValidator extends AbstractValidator<Upsert> {

    @Override
    public void validate(Upsert upsert) {
        for (ValidationCapability c : getCapabilities()) {
            validateFeature(c, Feature.upsert);
        }
        validateOptionalFromItem(upsert.getTable());
        validateOptionalExpressions(upsert.getColumns());
        validateOptionalExpressions(upsert.getExpressions());
        validateOptionalSelect(upsert.getSelect());
        validateDuplicate(upsert);
    }

    private void validateOptionalSelect(Select select) {
        if (select != null) {
            SelectValidator v = getValidator(SelectValidator.class);
            select.accept(v);
        }
    }

    private void validateDuplicate(Upsert upsert) {
        if (upsert.getDuplicateUpdateSets() != null) {
            for (UpdateSet updateSet : upsert.getDuplicateUpdateSets()) {
                validateOptionalExpressions(updateSet.getColumns());
                validateOptionalExpressions(updateSet.getValues());
            }
        }
    }

}
