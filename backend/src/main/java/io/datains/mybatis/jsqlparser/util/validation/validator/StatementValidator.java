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
import io.datains.mybatis.jsqlparser.statement.*;
import io.datains.mybatis.jsqlparser.statement.alter.Alter;
import io.datains.mybatis.jsqlparser.statement.alter.AlterSession;
import io.datains.mybatis.jsqlparser.statement.alter.AlterSystemStatement;
import io.datains.mybatis.jsqlparser.statement.alter.RenameTableStatement;
import io.datains.mybatis.jsqlparser.statement.alter.sequence.AlterSequence;
import io.datains.mybatis.jsqlparser.statement.analyze.Analyze;
import io.datains.mybatis.jsqlparser.statement.comment.Comment;
import io.datains.mybatis.jsqlparser.statement.create.function.CreateFunction;
import io.datains.mybatis.jsqlparser.statement.create.index.CreateIndex;
import io.datains.mybatis.jsqlparser.statement.create.procedure.CreateProcedure;
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
import io.datains.mybatis.jsqlparser.util.validation.ValidationCapability;
import io.datains.mybatis.jsqlparser.util.validation.metadata.NamedObject;

/**
 * @author gitmotte
 */
public class StatementValidator extends AbstractValidator<Statement> implements StatementVisitor {

    @Override
    public void visit(CreateIndex createIndex) {
        getValidator(CreateIndexValidator.class).validate(createIndex);
    }

    @Override
    public void visit(CreateTable createTable) {
        getValidator(CreateTableValidator.class).validate(createTable);
    }

    @Override
    public void visit(CreateView createView) {
        getValidator(CreateViewValidator.class).validate(createView);
    }

    @Override
    public void visit(AlterView alterView) {
        getValidator(AlterViewValidator.class).validate(alterView);
    }

    @Override
    public void visit(RefreshMaterializedViewStatement materializedView) {
        getValidator(RefreshMaterializedViewStatementValidator.class).validate(materializedView);
    }

    @Override
    public void visit(Delete delete) {
        getValidator(DeleteValidator.class).validate(delete);
    }

    @Override
    public void visit(Drop drop) {
        getValidator(DropValidator.class).validate(drop);
    }

    @Override
    public void visit(Insert insert) {
        getValidator(InsertValidator.class).validate(insert);
    }

    @Override
    public void visit(Select select) {
        validateFeature(Feature.select);

        SelectValidator selectValidator = getValidator(SelectValidator.class);
        select.accept(selectValidator);
    }

    @Override
    public void visit(Truncate truncate) {
        validateFeature(Feature.truncate);
        validateOptionalFromItem(truncate.getTable());
    }

    @Override
    public void visit(Update update) {
        getValidator(UpdateValidator.class).validate(update);
    }

    @Override
    public void visit(Alter alter) {
        getValidator(AlterValidator.class).validate(alter);
    }

    @Override
    public void visit(Statements stmts) {
        stmts.getStatements().forEach(s -> s.accept(this));
    }

    @Override
    public void visit(Execute execute) {
        getValidator(ExecuteValidator.class).validate(execute);
    }

    @Override
    public void visit(SetStatement set) {
        getValidator(SetStatementValidator.class).validate(set);
    }

    @Override
    public void visit(ResetStatement reset) {
        getValidator(ResetStatementValidator.class).validate(reset);
    }

    @Override
    public void visit(Merge merge) {
        getValidator(MergeValidator.class).validate(merge);
    }

    @Override
    public void visit(Commit commit) {
        validateFeature(Feature.commit);
    }

    @Override
    public void visit(Upsert upsert) {
        getValidator(UpsertValidator.class).validate(upsert);
    }

    @Override
    public void visit(UseStatement use) {
        getValidator(UseStatementValidator.class).validate(use);
    }

    @Override
    public void visit(ShowStatement show) {
        getValidator(ShowStatementValidator.class).validate(show);
    }

    @Override
    public void visit(ShowColumnsStatement show) {
        getValidator(ShowColumnsStatementValidator.class).validate(show);
    }

    @Override
    public void visit(ShowIndexStatement show) {
        getValidator(ShowIndexStatementValidator.class).validate(show);
    }

    @Override
    public void visit(ShowTablesStatement showTables) {
        getValidator(ShowTablesStatementValidator.class).validate(showTables);
    }

    @Override
    public void visit(Block block) {
        validateFeature(Feature.block);
        block.getStatements().accept(this);
    }

    @Override
    public void visit(Comment comment) {
        for (ValidationCapability c : getCapabilities()) {
            validateFeature(c, Feature.comment);
            validateOptionalFeature(c, comment.getTable(), Feature.commentOnTable);
            validateOptionalFeature(c, comment.getColumn(), Feature.commentOnColumn);
            validateOptionalFeature(c, comment.getView(), Feature.commentOnView);
        }
    }

    @Override
    public void visit(DescribeStatement describe) {
        validateFeature(Feature.describe);
        validateFeature(Feature.desc);
        validateOptionalFromItem(describe.getTable());
    }

    @Override
    public void visit(ExplainStatement explain) {
        validateFeature(Feature.explain);
        if (explain.getStatement() != null) {
            explain.getStatement().accept(this);
        }
    }


    @Override
    public void visit(DeclareStatement declare) {
        getValidator(DeclareStatementValidator.class).validate(declare);
    }

    @Override
    public void visit(Grant grant) {
        getValidator(GrantValidator.class).validate(grant);
    }

    @Override
    public void visit(CreateSchema aThis) {
        validateFeatureAndName(Feature.createSchema, NamedObject.schema, aThis.getSchemaName());
        aThis.getStatements().forEach(s -> s.accept(this));
    }

    @Override
    public void visit(CreateSequence createSequence) {
        getValidator(CreateSequenceValidator.class).validate(createSequence);
    }

    @Override
    public void visit(AlterSequence alterSequence) {
        getValidator(AlterSequenceValidator.class).validate(alterSequence);
    }

    @Override
    public void visit(CreateFunctionalStatement createFunctionalStatement) {
        validateFeature(Feature.functionalStatement);
        if (createFunctionalStatement instanceof CreateFunction) {
            validateFeature(Feature.createFunction);
        } else if (createFunctionalStatement instanceof CreateProcedure) {
            validateFeature(Feature.createProcedure);
        }
    }

    @Override
    public void validate(Statement statement) {
        statement.accept(this);
    }

    @Override
    public void visit(CreateSynonym createSynonym) {
        getValidator(CreateSynonymValidator.class).validate(createSynonym);
    }

    @Override
    public void visit(Analyze analyze) {
        getValidator(AnalyzeValidator.class).validate(analyze);
    }

    @Override
    public void visit(SavepointStatement savepointStatement) {
        // TODO: not yet implemented
    }

    @Override
    public void visit(RollbackStatement rollbackStatement) {
        // TODO: not yet implemented
    }

    @Override
    public void visit(AlterSession alterSession) {
        // TODO: not yet implemented
    }

    @Override
    public void visit(IfElseStatement ifElseStatement) {
        ifElseStatement.getIfStatement().accept(this);
        if (ifElseStatement.getElseStatement() != null) {
            ifElseStatement.getElseStatement().accept(this);
        }
    }

    public void visit(RenameTableStatement renameTableStatement) {
        // TODO: not yet implemented
    }

    @Override
    public void visit(PurgeStatement purgeStatement) {
        // TODO: not yet implemented
    }

    @Override
    public void visit(AlterSystemStatement alterSystemStatement) {
        // TODO: not yet implemented
    }

    @Override
    public void visit(UnsupportedStatement unsupportedStatement) {

    }
}
