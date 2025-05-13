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
import io.datains.mybatis.jsqlparser.statement.create.view.AlterView;
import io.datains.mybatis.jsqlparser.util.validation.ValidationCapability;
import io.datains.mybatis.jsqlparser.util.validation.metadata.NamedObject;

/**
 * @author gitmotte
 */
public class AlterViewValidator extends AbstractValidator<AlterView> {

    @Override
    public void validate(AlterView alterView) {
        for (ValidationCapability c : getCapabilities()) {
            validateFeature(Feature.alterView);
            validateFeature(c, alterView.isUseReplace(), Feature.alterViewReplace);
            validateName(c, NamedObject.view, alterView.getView().getFullyQualifiedName());
            validateOptionalColumnNames(c, alterView.getColumnNames());
        }
        alterView.getSelect().accept(getValidator(SelectValidator.class));
    }

}
