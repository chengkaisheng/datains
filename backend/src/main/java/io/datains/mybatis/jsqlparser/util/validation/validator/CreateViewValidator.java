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
import io.datains.mybatis.jsqlparser.statement.create.view.CreateView;
import io.datains.mybatis.jsqlparser.statement.create.view.ForceOption;
import io.datains.mybatis.jsqlparser.statement.create.view.TemporaryOption;
import io.datains.mybatis.jsqlparser.statement.select.Select;
import io.datains.mybatis.jsqlparser.util.validation.ValidationCapability;
import io.datains.mybatis.jsqlparser.util.validation.metadata.NamedObject;

/**
 * @author gitmotte
 */
public class CreateViewValidator extends AbstractValidator<CreateView> {

    @Override
    public void validate(CreateView createView) {
        for (ValidationCapability c : getCapabilities()) {
            validateFeature(c, Feature.createView);
            validateFeature(c, createView.isOrReplace(), Feature.createOrReplaceView);
            validateFeature(c, !ForceOption.NONE.equals(createView.getForce()),
                    Feature.createViewForce);
            validateFeature(c, !TemporaryOption.NONE.equals(createView.getTemporary()),
                    Feature.createViewTemporary);
            validateFeature(c, createView.isMaterialized(), Feature.createViewMaterialized);
            validateName(c, NamedObject.view, createView.getView().getFullyQualifiedName(), false);
            validateFeature(c, createView.getViewCommentOptions() != null,
                    Feature.createViewWithComment);
        }
        SelectValidator v = getValidator(SelectValidator.class);
        Select select = createView.getSelect();
        select.accept(v);
    }

}
