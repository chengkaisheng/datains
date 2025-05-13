/*-
 * #%L
 * JSQLParser library
 * %%
 * Copyright (C) 2004 - 2019 JSQLParser
 * %%
 * Dual licensed under GNU LGPL 2.1 or Apache License 2.0
 * #L%
 */
package io.datains.mybatis.jsqlparser.statement;

import io.datains.mybatis.jsqlparser.statement.alter.Alter;
import io.datains.mybatis.jsqlparser.statement.alter.AlterSession;
import io.datains.mybatis.jsqlparser.statement.alter.AlterSystemStatement;
import io.datains.mybatis.jsqlparser.statement.alter.RenameTableStatement;
import io.datains.mybatis.jsqlparser.statement.alter.sequence.AlterSequence;
import io.datains.mybatis.jsqlparser.statement.analyze.Analyze;
import io.datains.mybatis.jsqlparser.statement.comment.Comment;
import io.datains.mybatis.jsqlparser.statement.create.index.CreateIndex;
import io.datains.mybatis.jsqlparser.statement.create.schema.CreateSchema;
import io.datains.mybatis.jsqlparser.statement.create.sequence.CreateSequence;
import io.datains.mybatis.jsqlparser.statement.create.synonym.CreateSynonym;
import io.datains.mybatis.jsqlparser.statement.create.table.CreateTable;
import io.datains.mybatis.jsqlparser.statement.create.view.AlterView;
import io.datains.mybatis.jsqlparser.statement.create.view.CreateView;
import io.datains.mybatis.jsqlparser.statement.delete.Delete;
import io.datains.mybatis.jsqlparser.statement.drop.Drop;
import io.datains.mybatis.jsqlparser.statement.execute.Execute;
import io.datains.mybatis.jsqlparser.statement.grant.Grant;
import io.datains.mybatis.jsqlparser.statement.insert.Insert;
import io.datains.mybatis.jsqlparser.statement.merge.Merge;
import io.datains.mybatis.jsqlparser.statement.refresh.RefreshMaterializedViewStatement;
import io.datains.mybatis.jsqlparser.statement.select.Select;
import io.datains.mybatis.jsqlparser.statement.show.ShowIndexStatement;
import io.datains.mybatis.jsqlparser.statement.show.ShowTablesStatement;
import io.datains.mybatis.jsqlparser.statement.truncate.Truncate;
import io.datains.mybatis.jsqlparser.statement.update.Update;
import io.datains.mybatis.jsqlparser.statement.upsert.Upsert;

public interface StatementVisitor {

    void visit(Analyze analyze);

    void visit(SavepointStatement savepointStatement);

    void visit(RollbackStatement rollbackStatement);

    void visit(Comment comment);

    void visit(Commit commit);

    void visit(Delete delete);

    void visit(Update update);

    void visit(Insert insert);

    void visit(Drop drop);

    void visit(Truncate truncate);

    void visit(CreateIndex createIndex);

    void visit(CreateSchema aThis);

    void visit(CreateTable createTable);

    void visit(CreateView createView);

    void visit(AlterView alterView);

    void visit(RefreshMaterializedViewStatement materializedView);

    void visit(Alter alter);

    void visit(Statements stmts);

    void visit(Execute execute);

    void visit(SetStatement set);

    void visit(ResetStatement reset);

    void visit(ShowColumnsStatement set);

    void visit(ShowIndexStatement showIndex);

    void visit(ShowTablesStatement showTables);

    void visit(Merge merge);

    void visit(Select select);

    void visit(Upsert upsert);

    void visit(UseStatement use);

    void visit(Block block);

    void visit(DescribeStatement describe);

    void visit(ExplainStatement aThis);

    void visit(ShowStatement aThis);

    void visit(DeclareStatement aThis);

    void visit(Grant grant);

    void visit(CreateSequence createSequence);

    void visit(AlterSequence alterSequence);

    void visit(CreateFunctionalStatement createFunctionalStatement);

    void visit(CreateSynonym createSynonym);

    void visit(AlterSession alterSession);

    void visit(IfElseStatement aThis);

    void visit(RenameTableStatement renameTableStatement);

    void visit(PurgeStatement purgeStatement);

    void visit(AlterSystemStatement alterSystemStatement);

    void visit(UnsupportedStatement unsupportedStatement);
}
