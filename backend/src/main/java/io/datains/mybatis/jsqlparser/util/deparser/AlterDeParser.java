/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2019 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.util.deparser;

import io.datains.mybatis.jsqlparser.statement.alter.Alter;

public class AlterDeParser extends AbstractDeParser<Alter> {

    public AlterDeParser(StringBuilder buffer) {
        super(buffer);
    }

    @Override
    public void deParse(Alter alter) {
        buffer.append(alter.toString());
    }

}
