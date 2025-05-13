package io.datains.mybatis.interceptor;

import io.datains.mybatis.jsqlparser.statement.select.OrderByElement;
import io.datains.mybatis.jsqlparser.statement.select.OrderByVisitor;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;

/**
 * MyOrderByVisitor
 *
 * @author zhangzihang
 * @since 2024-01-18 17:48
 */
public class MyOrderByVisitor implements OrderByVisitor {
    private static final Log logger = LogFactory.getLog(MyOrderByVisitor.class);

    @Override
    public void visit(OrderByElement orderBy) {
        //添加默认null值顺序
        if (orderBy.getNullOrdering() == null) {
            orderBy.setNullOrdering(OrderByElement.NullOrdering.NULLS_LAST);
        }
        orderBy.getExpression().accept(MyJSqlVisitor.MY_EXPRESSION_VISITOR);
    }
}
