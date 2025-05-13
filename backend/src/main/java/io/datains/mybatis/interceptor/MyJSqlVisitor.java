package io.datains.mybatis.interceptor;

import io.datains.mybatis.jsqlparser.expression.Expression;
import io.datains.mybatis.jsqlparser.expression.operators.relational.ExpressionList;
import io.datains.mybatis.jsqlparser.schema.Column;
import io.datains.mybatis.jsqlparser.schema.Table;
import io.datains.mybatis.jsqlparser.statement.*;
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
import io.datains.mybatis.jsqlparser.statement.select.Join;
import io.datains.mybatis.jsqlparser.statement.select.Select;
import io.datains.mybatis.jsqlparser.statement.select.Values;
import io.datains.mybatis.jsqlparser.statement.show.ShowIndexStatement;
import io.datains.mybatis.jsqlparser.statement.show.ShowTablesStatement;
import io.datains.mybatis.jsqlparser.statement.truncate.Truncate;
import io.datains.mybatis.jsqlparser.statement.update.Update;
import io.datains.mybatis.jsqlparser.statement.update.UpdateSet;
import io.datains.mybatis.jsqlparser.statement.upsert.Upsert;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * MyJSqlVisitor
 *
 * @author zhangzihang
 * @since 2024-01-17 15:03
 */
public class MyJSqlVisitor implements StatementVisitor {
    protected static final Log logger = LogFactory.getLog(MyJSqlVisitor.class);

    protected static final MyExpressionVisitor MY_EXPRESSION_VISITOR = new MyExpressionVisitor();
    protected static final MyFromItemVisitor MY_FROM_ITEM_VISITOR = new MyFromItemVisitor();
    protected static final MySelectItemVisitor MY_SELECT_ITEM_VISITOR = new MySelectItemVisitor();
    protected static final MyOrderByVisitor MY_ORDER_BY_VISITOR = new MyOrderByVisitor();
    protected static final MyGroupByVisitor MY_GROUP_BY_VISITOR = new MyGroupByVisitor();
    protected static final MySelectVisitor MY_SELECT_VISITOR = new MySelectVisitor();

    @Override
    public void visit(Analyze analyze) {
        logger.debug("Analyze 被执行了");
    }

    @Override
    public void visit(SavepointStatement savepointStatement) {
        logger.debug("SavepointStatement 被执行了");
    }

    @Override
    public void visit(RollbackStatement rollbackStatement) {
        logger.debug("RollbackStatement 被执行了");
    }

    @Override
    public void visit(Comment comment) {
        logger.debug("Comment 被执行了");
    }

    @Override
    public void visit(Commit commit) {
        logger.debug("Commit 被执行了");
    }

    @Override
    public void visit(Delete delete) {
        logger.debug("Delete 被执行了");
        //获取表格
        if (delete.getTable() != null) {
            delete.getTable().accept(MY_FROM_ITEM_VISITOR);
        }
        List<Table> tables = delete.getTables();
        if (tables != null && !tables.isEmpty()) {
            tables.forEach(table -> table.accept(MY_FROM_ITEM_VISITOR));
        }
        //join语句
        List<Join> joins = delete.getJoins();
        if (joins != null && !joins.isEmpty()) {
            joins.forEach(join -> {
                join.getFromItem().accept(MY_FROM_ITEM_VISITOR);
                Collection<Expression> expressions = join.getOnExpressions();
                expressions.forEach(expression -> expression.accept(MY_EXPRESSION_VISITOR));
            });
        }
        //获取where语句
        if (delete.getWhere() != null) {
            delete.getWhere().accept(MY_EXPRESSION_VISITOR);
        }
    }

    @Override
    public void visit(Update update) {
        logger.debug("Update 被执行了");
        //获取表字段
        List<UpdateSet> updateSets = update.getUpdateSets();
        if (updateSets != null && !updateSets.isEmpty()) {
            updateSets.forEach(updateSet -> {
                ExpressionList<Column> columns = updateSet.getColumns();
                if (columns != null && !columns.isEmpty()) {
                    columns.forEach(column -> column.accept(MY_EXPRESSION_VISITOR));
                }
            });
        }
        //获取表格
        if (update.getTable() != null) {
            update.getTable().accept(MY_FROM_ITEM_VISITOR);
        }
        //join语句
        List<Join> joins = update.getJoins();
        if (joins != null && !joins.isEmpty()) {
            joins.forEach(join -> {
                join.getFromItem().accept(MY_FROM_ITEM_VISITOR);
                Collection<Expression> expressions = join.getOnExpressions();
                expressions.forEach(expression -> expression.accept(MY_EXPRESSION_VISITOR));
            });
        }
        //获取where语句
        if (update.getWhere() != null) {
            update.getWhere().accept(MY_EXPRESSION_VISITOR);
        }
    }

    @Override
    public void visit(Insert insert) {
        logger.debug("Insert 被执行了");
        //获取表格
        if (insert.getTable() != null) {
            insert.getTable().accept(MY_FROM_ITEM_VISITOR);
        }
        //获取字段
        ExpressionList<Column> columns = insert.getColumns();
        if (columns != null && !columns.isEmpty()) {
            columns.forEach(column -> column.accept(MY_EXPRESSION_VISITOR));
        }
        // ... VALUES (TO_DATE('2024-01-26 12:00:00', '%Y-%m-%d'), '123')
        Optional.of(insert).map(Insert::getValues).map(Values::getExpressions).ifPresent(expressionList -> {
            expressionList.forEach(expression -> expression.accept(MY_EXPRESSION_VISITOR));
        });
    }

    @Override
    public void visit(Drop drop) {
        logger.debug("Drop 被执行了");
    }

    @Override
    public void visit(Truncate truncate) {
        logger.debug("Truncate 被执行了");
    }

    @Override
    public void visit(CreateIndex createIndex) {
        logger.debug("CreateIndex 被执行了");
    }

    @Override
    public void visit(CreateSchema createSchema) {
        logger.debug("CreateSchema 被执行了");
    }

    @Override
    public void visit(CreateTable createTable) {
        logger.debug("CreateTable 被执行了");
    }

    @Override
    public void visit(CreateView createView) {
        logger.debug("CreateView 被执行了");
    }

    @Override
    public void visit(AlterView alterView) {
        logger.debug("AlterView 被执行了");
    }

    @Override
    public void visit(RefreshMaterializedViewStatement refreshMaterializedViewStatement) {
        logger.debug("RefreshMaterializedViewStatement 被执行了");
    }

    @Override
    public void visit(Alter alter) {
        logger.debug("Alter 被执行了");
    }

    @Override
    public void visit(Statements statements) {
        logger.debug("Statements 被执行了");
    }

    @Override
    public void visit(Execute execute) {
        logger.debug("Execute 被执行了");
    }

    @Override
    public void visit(SetStatement setStatement) {
        logger.debug("SetStatement 被执行了");
    }

    @Override
    public void visit(ResetStatement resetStatement) {
        logger.debug("ResetStatement 被执行了");
    }

    @Override
    public void visit(ShowColumnsStatement showColumnsStatement) {
        logger.debug("ShowColumnsStatement 被执行了");
    }

    @Override
    public void visit(ShowIndexStatement showIndexStatement) {
        logger.debug("ShowIndexStatement 被执行了");
    }

    @Override
    public void visit(ShowTablesStatement showTablesStatement) {
        logger.debug("ShowTablesStatement 被执行了");
    }

    @Override
    public void visit(Merge merge) {
        logger.debug("Merge 被执行了");
    }

    @Override
    public void visit(Select select) {
        logger.debug("Select 被执行了");
        select.accept(MY_SELECT_VISITOR);
    }

    @Override
    public void visit(Upsert upsert) {
        logger.debug("Upsert 被执行了");
    }

    @Override
    public void visit(UseStatement useStatement) {
        logger.debug("UseStatement 被执行了");
    }

    @Override
    public void visit(Block block) {
        logger.debug("Block 被执行了");
    }

    @Override
    public void visit(DescribeStatement describeStatement) {
        logger.debug("DescribeStatement 被执行了");
    }

    @Override
    public void visit(ExplainStatement explainStatement) {
        logger.debug("ExplainStatement 被执行了");
    }

    @Override
    public void visit(ShowStatement showStatement) {
        logger.debug("ShowStatement 被执行了");
    }

    @Override
    public void visit(DeclareStatement declareStatement) {
        logger.debug("DeclareStatement 被执行了");
    }

    @Override
    public void visit(Grant grant) {
        logger.debug("Grant 被执行了");
    }

    @Override
    public void visit(CreateSequence createSequence) {
        logger.debug("CreateSequence 被执行了");
    }

    @Override
    public void visit(AlterSequence alterSequence) {
        logger.debug("AlterSequence 被执行了");
    }

    @Override
    public void visit(CreateFunctionalStatement createFunctionalStatement) {
        logger.debug("CreateFunctionalStatement 被执行了");
    }

    @Override
    public void visit(CreateSynonym createSynonym) {
        logger.debug("CreateSynonym 被执行了");
    }

    @Override
    public void visit(AlterSession alterSession) {
        logger.debug("AlterSession 被执行了");
    }

    @Override
    public void visit(IfElseStatement ifElseStatement) {
        logger.debug("IfElseStatement 被执行了");
    }

    @Override
    public void visit(RenameTableStatement renameTableStatement) {
        logger.debug("RenameTableStatement 被执行了");
    }

    @Override
    public void visit(PurgeStatement purgeStatement) {
        logger.debug("PurgeStatement 被执行了");
    }

    @Override
    public void visit(AlterSystemStatement alterSystemStatement) {
        logger.debug("AlterSystemStatement 被执行了");
    }

    @Override
    public void visit(UnsupportedStatement unsupportedStatement) {
        logger.debug("UnsupportedStatement 被执行了");
    }
}
