package io.datains.mybatis.interceptor;

import io.datains.mybatis.jsqlparser.expression.*;
import io.datains.mybatis.jsqlparser.expression.operators.arithmetic.*;
import io.datains.mybatis.jsqlparser.expression.operators.conditional.AndExpression;
import io.datains.mybatis.jsqlparser.expression.operators.conditional.OrExpression;
import io.datains.mybatis.jsqlparser.expression.operators.conditional.XorExpression;
import io.datains.mybatis.jsqlparser.expression.operators.relational.*;
import io.datains.mybatis.jsqlparser.schema.Column;
import io.datains.mybatis.jsqlparser.statement.select.AllColumns;
import io.datains.mybatis.jsqlparser.statement.select.AllTableColumns;
import io.datains.mybatis.jsqlparser.statement.select.ParenthesedSelect;
import io.datains.mybatis.jsqlparser.statement.select.Select;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;

import java.util.Locale;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * MyWhereVisitor
 *
 * @author zhangzihang
 * @since 2024-01-17 15:56
 */

public class MyExpressionVisitor implements ExpressionVisitor {
    private static final Log logger = LogFactory.getLog(MyExpressionVisitor.class);

    @Override
    public void visit(BitwiseRightShift aThis) {
        logger.debug("BitwiseRightShift 被执行了");
    }

    @Override
    public void visit(BitwiseLeftShift aThis) {
        logger.debug("BitwiseLeftShift 被执行了");
    }

    @Override
    public void visit(NullValue nullValue) {
        logger.debug("NullValue 被执行了");
    }

    @Override
    public void visit(Function function) {
        //获取函数名
        String functionName = function.getName().toLowerCase(Locale.ROOT);
        //获取函数中的参数
        ExpressionList<?> list = function.getParameters();
        ExpressionList<Expression> expressions = new ExpressionList<>();
        if (list != null && !list.isEmpty()) {
            expressions.addAll(list.stream().filter(Objects::nonNull).collect(Collectors.toList()));
        }
        //对函数中的参数进行修改
        for (Expression expression : expressions) {
            expression.accept(this);
        }
        function.setParameters(expressions);
    }

    @Override
    public void visit(SignedExpression signedExpression) {
        logger.debug("SignedExpression 被执行了");
    }

    @Override
    public void visit(JdbcParameter jdbcParameter) {
        logger.debug("JdbcParameter 被执行了");
    }

    @Override
    public void visit(JdbcNamedParameter jdbcNamedParameter) {
        logger.debug("JdbcNamedParameter 被执行了");
    }

    @Override
    public void visit(DoubleValue doubleValue) {
        logger.debug("DoubleValue 被执行了");
    }

    @Override
    public void visit(LongValue longValue) {
        logger.debug("LongValue 被执行了");
    }

    @Override
    public void visit(HexValue hexValue) {
        logger.debug("HexValue 被执行了");
    }

    @Override
    public void visit(DateValue dateValue) {
        logger.debug("DateValue 被执行了");
    }

    @Override
    public void visit(TimeValue timeValue) {
        logger.debug("TimeValue 被执行了");
    }

    @Override
    public void visit(TimestampValue timestampValue) {
        logger.debug("TimestampValue 被执行了");
    }

    /**
     * @param parenthesis It represents an expression like "(" expression ")"
     */
    @Override
    public void visit(Parenthesis parenthesis) {
        logger.debug("Parenthesis 被执行了");
        parenthesis.getExpression().accept(this);
    }

    @Override
    public void visit(StringValue stringValue) {
        logger.debug("StringValue 被执行了");
    }

    @Override
    public void visit(Addition addition) {
        logger.debug("Addition 被执行了");
    }

    @Override
    public void visit(Division division) {
        logger.debug("Division 被执行了");
    }

    @Override
    public void visit(IntegerDivision division) {
        logger.debug("IntegerDivision 被执行了");
    }

    @Override
    public void visit(Multiplication multiplication) {
        logger.debug("Multiplication 被执行了");
    }

    /**
     * @param subtraction 减法
     */
    @Override
    public void visit(Subtraction subtraction) {
        logger.debug("Subtraction 被执行了");
        subtraction.getLeftExpression().accept(this);
        subtraction.getRightExpression().accept(this);
    }

    @Override
    public void visit(AndExpression andExpression) {
        logger.debug("AndExpression 被执行了");
        andExpression.getLeftExpression().accept(this);
        andExpression.getRightExpression().accept(this);
    }

    @Override
    public void visit(OrExpression orExpression) {
        logger.debug("OrExpression 被执行了");
        orExpression.getLeftExpression().accept(this);
        orExpression.getRightExpression().accept(this);
    }

    @Override
    public void visit(XorExpression orExpression) {
        logger.debug("XorExpression 被执行了");
    }

    /**
     * @param between A "BETWEEN" expr1 expr2 statement
     */
    @Override
    public void visit(Between between) {
        logger.debug("Between 被执行了");
    }

    @Override
    public void visit(OverlapsCondition overlapsCondition) {
        logger.debug("OverlapsCondition 被执行了");
    }

    @Override
    public void visit(EqualsTo equalsTo) {
        equalsTo.getLeftExpression().accept(this);
        equalsTo.getRightExpression().accept(this);
    }

    /**
     * @param greaterThan 大于
     */
    @Override
    public void visit(GreaterThan greaterThan) {
        logger.debug("GreaterThan 被执行了");
        greaterThan.getLeftExpression().accept(this);
        greaterThan.getRightExpression().accept(this);
    }

    /**
     * @param greaterThanEquals 大于等于
     */
    @Override
    public void visit(GreaterThanEquals greaterThanEquals) {
        logger.debug("GreaterThanEquals 被执行了");
        greaterThanEquals.getLeftExpression().accept(this);
        greaterThanEquals.getRightExpression().accept(this);
    }

    @Override
    public void visit(InExpression inExpression) {
        logger.debug("InExpression 被执行了");
        inExpression.getLeftExpression().accept(this);
        inExpression.getRightExpression().accept(this);
    }

    @Override
    public void visit(FullTextSearch fullTextSearch) {
        logger.debug("FullTextSearch 被执行了");
    }

    @Override
    public void visit(IsNullExpression isNullExpression) {
        logger.debug("IsNullExpression 被执行了");
        isNullExpression.getLeftExpression().accept(this);
    }

    @Override
    public void visit(IsBooleanExpression isBooleanExpression) {
        logger.debug("IsBooleanExpression 被执行了");
        isBooleanExpression.getLeftExpression().accept(this);
    }

    @Override
    public void visit(LikeExpression likeExpression) {
        logger.debug("LikeExpression 被执行了");
        likeExpression.getLeftExpression().accept(this);
        likeExpression.getRightExpression().accept(this);
    }

    /**
     * @param minorThan 小于
     */
    @Override
    public void visit(MinorThan minorThan) {
        logger.debug("MinorThan 被执行了");
        minorThan.getLeftExpression().accept(this);
        minorThan.getRightExpression().accept(this);
    }

    /**
     * @param minorThanEquals 小于等于
     */
    @Override
    public void visit(MinorThanEquals minorThanEquals) {
        logger.debug("MinorThanEquals 被执行了");
        minorThanEquals.getLeftExpression().accept(this);
        minorThanEquals.getRightExpression().accept(this);
    }

    @Override
    public void visit(NotEqualsTo notEqualsTo) {
        logger.debug("NotEqualsTo 被执行了");
        notEqualsTo.getLeftExpression().accept(this);
        notEqualsTo.getRightExpression().accept(this);
    }

    @Override
    public void visit(DoubleAnd doubleAnd) {
        logger.debug("DoubleAnd 被执行了");
    }

    @Override
    public void visit(Contains contains) {
        logger.debug("Contains 被执行了");
    }

    @Override
    public void visit(ContainedBy containedBy) {
        logger.debug("ContainedBy 被执行了");
    }

    @Override
    public void visit(ParenthesedSelect selectBody) {
        logger.debug("ParenthesedSelect 被执行了");
    }

    /**
     * @param tableColumn A column. It can have the table name it belongs to
     */
    @Override
    public void visit(Column tableColumn) {
        if (tableColumn.getTable() != null) {
            tableColumn.getTable().accept(MyJSqlVisitor.MY_FROM_ITEM_VISITOR);
        }
        if (tableColumn.getColumnName() != null) {
            String columnName = tableColumn.getColumnName().replace("`", "").replace("\"", "");
            tableColumn.setColumnName("\"" + columnName + "\"");
        }
    }

    @Override
    public void visit(CaseExpression caseExpression) {
        logger.debug("CaseExpression 被执行了");
    }

    @Override
    public void visit(WhenClause whenClause) {
        logger.debug("WhenClause 被执行了");
    }

    @Override
    public void visit(ExistsExpression existsExpression) {
        logger.debug("ExistsExpression 被执行了");
    }

    @Override
    public void visit(MemberOfExpression memberOfExpression) {
        logger.debug("MemberOfExpression 被执行了");
    }

    @Override
    public void visit(AnyComparisonExpression anyComparisonExpression) {
        logger.debug("AnyComparisonExpression 被执行了");
    }

    @Override
    public void visit(Concat concat) {
        logger.debug("Concat 被执行了");
    }

    @Override
    public void visit(Matches matches) {
        logger.debug("Matches 被执行了");
    }

    @Override
    public void visit(BitwiseAnd bitwiseAnd) {
        logger.debug("BitwiseAnd 被执行了");
    }

    @Override
    public void visit(BitwiseOr bitwiseOr) {
        logger.debug("BitwiseOr 被执行了");
    }

    @Override
    public void visit(BitwiseXor bitwiseXor) {
        logger.debug("BitwiseXor 被执行了");
    }

    @Override
    public void visit(CastExpression cast) {
        logger.debug("CastExpression 被执行了");
    }

    @Override
    public void visit(Modulo modulo) {
        logger.debug("Modulo 被执行了");
    }

    @Override
    public void visit(AnalyticExpression aexpr) {
        logger.debug("AnalyticExpression 被执行了");
    }

    @Override
    public void visit(ExtractExpression eexpr) {
        logger.debug("ExtractExpression 被执行了");
    }

    /**
     * @param iexpr Interval关键字
     */
    @Override
    public void visit(IntervalExpression iexpr) {
        logger.debug("IntervalExpression 被执行了");
        if (iexpr.getParameter() != null && !iexpr.getParameter().contains("'")) {
            iexpr.setParameter("'" + iexpr.getParameter() + "'");
        }

    }

    @Override
    public void visit(OracleHierarchicalExpression oexpr) {
        logger.debug("OracleHierarchicalExpression 被执行了");
    }

    @Override
    public void visit(RegExpMatchOperator rexpr) {
        logger.debug("RegExpMatchOperator 被执行了");
    }

    @Override
    public void visit(JsonExpression jsonExpr) {
        logger.debug("JsonExpression 被执行了");
    }

    @Override
    public void visit(JsonOperator jsonExpr) {
        logger.debug("JsonOperator 被执行了");
    }

    @Override
    public void visit(UserVariable var) {
        logger.debug("UserVariable 被执行了");
    }

    @Override
    public void visit(NumericBind bind) {
        logger.debug("NumericBind 被执行了");
    }

    @Override
    public void visit(KeepExpression aexpr) {
        logger.debug("KeepExpression 被执行了");
    }

    @Override
    public void visit(MySQLGroupConcat groupConcat) {
        logger.debug("MySQLGroupConcat 被执行了");
    }

    @Override
    public void visit(ExpressionList<?> expressionList) {
        logger.debug("ExpressionList 被执行了");
    }

    @Override
    public void visit(RowConstructor<?> rowConstructor) {
        logger.debug("RowConstructor 被执行了");
    }

    @Override
    public void visit(RowGetExpression rowGetExpression) {
        logger.debug("RowGetExpression 被执行了");
    }

    @Override
    public void visit(OracleHint hint) {
        logger.debug("OracleHint 被执行了");
    }

    @Override
    public void visit(TimeKeyExpression timeKeyExpression) {
        logger.debug("TimeKeyExpression 被执行了");
    }

    @Override
    public void visit(DateTimeLiteralExpression literal) {
        logger.debug("DateTimeLiteralExpression 被执行了");
    }

    @Override
    public void visit(NotExpression aThis) {
        logger.debug("NotExpression 被执行了");
    }

    @Override
    public void visit(NextValExpression aThis) {
        logger.debug("NextValExpression 被执行了");
    }

    @Override
    public void visit(CollateExpression aThis) {
        logger.debug("CollateExpression 被执行了");
    }

    @Override
    public void visit(SimilarToExpression aThis) {
        logger.debug("SimilarToExpression 被执行了");
    }

    @Override
    public void visit(ArrayExpression aThis) {
        logger.debug("ArrayExpression 被执行了");
    }

    @Override
    public void visit(ArrayConstructor aThis) {
        logger.debug("ArrayConstructor 被执行了");
    }

    @Override
    public void visit(VariableAssignment aThis) {
        logger.debug("VariableAssignment 被执行了");
    }

    @Override
    public void visit(XMLSerializeExpr aThis) {
        logger.debug("XMLSerializeExpr 被执行了");
    }

    @Override
    public void visit(TimezoneExpression aThis) {
        logger.debug("TimezoneExpression 被执行了");
    }

    @Override
    public void visit(JsonAggregateFunction aThis) {
        logger.debug("JsonAggregateFunction 被执行了");
    }

    @Override
    public void visit(JsonFunction aThis) {
        logger.debug("JsonFunction 被执行了");
    }

    @Override
    public void visit(ConnectByRootOperator aThis) {
        logger.debug("ConnectByRootOperator 被执行了");
    }

    @Override
    public void visit(OracleNamedFunctionParameter aThis) {
        logger.debug("OracleNamedFunctionParameter 被执行了");
    }

    @Override
    public void visit(AllColumns allColumns) {
        logger.debug("AllColumns 被执行了");
    }

    @Override
    public void visit(AllTableColumns allTableColumns) {
        logger.debug("AllTableColumns 被执行了");
    }

    @Override
    public void visit(AllValue allValue) {
        logger.debug("AllValue 被执行了");
    }

    @Override
    public void visit(IsDistinctExpression isDistinctExpression) {
        logger.debug("IsDistinctExpression 被执行了");
    }

    @Override
    public void visit(GeometryDistance geometryDistance) {
        logger.debug("GeometryDistance 被执行了");
    }

    @Override
    public void visit(Select selectBody) {
        logger.debug("Select 被执行了");
    }

    @Override
    public void visit(TranscodingFunction transcodingFunction) {
        logger.debug("TranscodingFunction 被执行了");
    }

    @Override
    public void visit(TrimFunction trimFunction) {
        logger.debug("TrimFunction 被执行了");
    }

    @Override
    public void visit(RangeExpression rangeExpression) {
        logger.debug("RangeExpression 被执行了");
    }

    @Override
    public void visit(TSQLLeftJoin tsqlLeftJoin) {
        logger.debug("TSQLLeftJoin 被执行了");
    }

    @Override
    public void visit(TSQLRightJoin tsqlRightJoin) {
        logger.debug("TSQLRightJoin 被执行了");
    }
}
