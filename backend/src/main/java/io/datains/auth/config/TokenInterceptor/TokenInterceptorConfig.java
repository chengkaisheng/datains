package io.datains.auth.config.TokenInterceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

/**
 * @Author Mr.zhang
 * @Date: 2022/04/11/ 15:13
 * @Description
 */
@Configuration
public class TokenInterceptorConfig implements WebMvcConfigurer {
    @Resource
    TokenInterceptor interceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 设置所有的路径都要进行拦截，除了/test/login
        registry.addInterceptor(interceptor).addPathPatterns("/**")
                .excludePathPatterns("/api/auth/login","/api/user/singleSignOn/*")
                .excludePathPatterns("/api/user/singleSignOn/*")
                .excludePathPatterns("/api/user/existLdapUsers")
                .excludePathPatterns("/system/requestTimeOut")
                .excludePathPatterns("/system/requestTimeOut2")
                .excludePathPatterns("/api/pluginCommon/component/ThemeSetting")
                .excludePathPatterns("/api/auth/isPluginLoaded")
                .excludePathPatterns("/api/auth/isOpenLdap")
                .excludePathPatterns("/api/auth/isOpenOidc")
                .excludePathPatterns("/api/auth/getPublicKey")
                .excludePathPatterns("/system/ui/info")
                .excludePathPatterns("/api/auth/userInfo")
                .excludePathPatterns("/api/dynamicMenu/menus")
                .excludePathPatterns("/anonymous/license/validate")
                .excludePathPatterns("/plugin/theme/themes")
                .excludePathPatterns("/plugin/theme/items/*")
                .excludePathPatterns("/api/link/validate")
                .excludePathPatterns("/api/link/resourceDetail/*")
                .excludePathPatterns("/api/link/shortUrl")
                .excludePathPatterns("/system/requestTimeOut")
                .excludePathPatterns("/pluginCommon/component/ThemeSetting")
                .excludePathPatterns("/linkage/getPanelAllLinkageInfo/*")
                .excludePathPatterns("/chart/view/*/*")
                .excludePathPatterns("/linkage/getPanelAllLinkageInfo/*")
                .excludePathPatterns("/plugin/theme/themes")
                .excludePathPatterns("/plugin/theme/items/*")
                .excludePathPatterns("/chart/view/getData/*/*")


        ;

//        registry.addInterceptor(authorizeInterceptor)
//                .addPathPatterns("/**")
//                .excludePathPatterns("/api/user/updatePassWorld");
    }
}
