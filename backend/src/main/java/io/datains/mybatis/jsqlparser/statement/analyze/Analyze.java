/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2022 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.statement.analyze;

import io.datains.mybatis.jsqlparser.schema.Table;
import io.datains.mybatis.jsqlparser.statement.Statement;
import io.datains.mybatis.jsqlparser.statement.StatementVisitor;

public class Analyze implements Statement {

    private Table table;

    @Override
    public void accept(StatementVisitor statementVisitor) {
        statementVisitor.visit(this);
    }

    public Table getTable() {
        return table;
    }

    public void setTable(Table table) {
        this.table = table;
    }

    @Override
    public String toString() {
        return "ANALYZE " + table.toString();
    }

    public Analyze withTable(Table table) {
        this.setTable(table);
        return this;
    }
}
