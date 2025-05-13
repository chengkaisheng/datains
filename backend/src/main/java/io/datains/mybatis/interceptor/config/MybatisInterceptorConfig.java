package io.datains.mybatis.interceptor.config;


import io.datains.mybatis.interceptor.MybatisCustomInterceptor;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.List;

/**
 * Mybatis拦截器执行顺序配置类
 * 多个拦截器存在时，这里对执行顺序进行配置
 *
 * @author zhangzihang
 * @since 2024-01-17 10:41
 */
@Configuration
public class MybatisInterceptorConfig {
    private static final Log logger = LogFactory.getLog(MybatisInterceptorConfig.class);
    @Resource
    private List<SqlSessionFactory> sqlSessionFactories;

    @PostConstruct
    public void addMybatisCustomInterceptor() {
        for (SqlSessionFactory sqlSessionFactory : sqlSessionFactories) {
            org.apache.ibatis.session.Configuration configuration = sqlSessionFactory.getConfiguration();

            // 最后添加的会更早执行
            logger.debug("自定义拦截器 {MybatisCustomInterceptor} 已被添加");
            configuration.addInterceptor(new MybatisCustomInterceptor());
        }
    }
}
