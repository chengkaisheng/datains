package io.datains.mybatis.interceptor;


import io.datains.mybatis.jsqlparser.JSQLParserException;
import io.datains.mybatis.jsqlparser.parser.CCJSqlParserManager;
import io.datains.mybatis.jsqlparser.statement.Statement;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;

import java.io.StringReader;
import java.lang.reflect.Proxy;
import java.sql.Connection;
import java.util.Properties;

/**
 * MyBatisInterceptor
 *
 * @author zhangzihang
 * @since 2024-01-17 10:08
 */
@Intercepts(
        {
                @Signature(method = "prepare", type = StatementHandler.class, args = {Connection.class, Integer.class}),
        }
)
public class MybatisCustomInterceptor implements Interceptor {
    private static final Log logger = LogFactory.getLog(MybatisCustomInterceptor.class);
    final static String LOG_TAG = "====SQL拦截器====";

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        try {
            StatementHandler statementHandler = realTarget(invocation.getTarget());
            MetaObject metaObject = SystemMetaObject.forObject(statementHandler);
            //获取原始sql
            String sql = statementHandler.getBoundSql().getSql();
            logger.debug("raw sql 原始SQL: " + sql);
            //修改sql语句适配达梦
            sql = keywordsHandle(sql);

            //替换修改后的sql
            metaObject.setValue("delegate.boundSql.sql", sql);
        } catch (Exception e) {
            //防止解析错误影响SQL执行
            logger.error(LOG_TAG + "解析错误");
            logger.error(e.getMessage(), e);
        }

        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        if (target instanceof StatementHandler) {
            return Plugin.wrap(target, this);
        }
        return target;
    }

    @Override
    public void setProperties(Properties properties) {

    }

    public <T> T realTarget(Object target) {
        if (Proxy.isProxyClass(target.getClass())) {
            MetaObject metaObject = SystemMetaObject.forObject(target);
            return realTarget(metaObject.getValue("h.target"));
        }
        return (T) target;
    }

    private String keywordsHandle(String sql) throws JSQLParserException {
        CCJSqlParserManager mgr = new CCJSqlParserManager();
        Statement statement = mgr.parse(new StringReader(sql));
        statement.accept(new MyJSqlVisitor());
        return statement.toString();
    }

}
