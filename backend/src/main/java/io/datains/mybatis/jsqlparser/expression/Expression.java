/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2019 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.expression;

import io.datains.mybatis.jsqlparser.Model;
import io.datains.mybatis.jsqlparser.parser.ASTNodeAccess;

public interface Expression extends ASTNodeAccess, Model {

    void accept(ExpressionVisitor expressionVisitor);

}
