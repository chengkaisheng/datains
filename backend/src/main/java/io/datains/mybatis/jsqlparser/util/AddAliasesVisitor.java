/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2019 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.util;

import io.datains.mybatis.jsqlparser.expression.Alias;
import io.datains.mybatis.jsqlparser.statement.select.*;

import java.util.LinkedList;
import java.util.List;

/**
 * Add aliases to every column and expression selected by a select - statement. Existing aliases are
 * recognized and preserved. This class standard uses a prefix of A and a counter to generate new
 * aliases (e.g. A1, A5, ...). This behaviour can be altered.
 *
 * @author tw
 */
public class AddAliasesVisitor implements SelectVisitor, SelectItemVisitor {

    private static final String NOT_SUPPORTED_YET = "Not supported yet.";
    private List<String> aliases = new LinkedList<String>();
    private boolean firstRun = true;
    private int counter = 0;
    private String prefix = "A";

    @Override
    public void visit(ParenthesedSelect parenthesedSelect) {
        parenthesedSelect.getSelect().accept(this);
    }

    @Override
    public void visit(PlainSelect plainSelect) {
        firstRun = true;
        counter = 0;
        aliases.clear();
        for (SelectItem item : plainSelect.getSelectItems()) {
            item.accept(this);
        }
        firstRun = false;
        for (SelectItem item : plainSelect.getSelectItems()) {
            item.accept(this);
        }
    }

    @Override
    public void visit(SetOperationList setOpList) {
        for (Select select : setOpList.getSelects()) {
            select.accept(this);
        }
    }

    @Override
    public void visit(SelectItem selectExpressionItem) {
        if (firstRun) {
            if (selectExpressionItem.getAlias() != null) {
                aliases.add(selectExpressionItem.getAlias().getName().toUpperCase());
            }
        } else {
            if (selectExpressionItem.getAlias() == null) {
                while (true) {
                    String alias = getNextAlias().toUpperCase();
                    if (!aliases.contains(alias)) {
                        aliases.add(alias);
                        selectExpressionItem.setAlias(new Alias(alias));
                        break;
                    }
                }
            }
        }
    }

    protected String getNextAlias() {
        counter++;
        return prefix + counter;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    @Override
    public void visit(WithItem withItem) {
        throw new UnsupportedOperationException(NOT_SUPPORTED_YET); // To change body of generated
                                                                    // methods, choose Tools |
                                                                    // Templates.
    }

    @Override
    public void visit(Values aThis) {
        throw new UnsupportedOperationException("Not supported yet."); // To change body of
                                                                       // generated methods, choose
                                                                       // Tools | Templates.
    }

    @Override
    public void visit(LateralSubSelect lateralSubSelect) {
        lateralSubSelect.getSelect().accept(this);
    }

    @Override
    public void visit(TableStatement tableStatement) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
