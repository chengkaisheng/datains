package io.datains.auth.config.TokenInterceptor;


import com.alibaba.fastjson.JSONObject;
import io.datains.auth.api.dto.CurrentUserDto;
import io.datains.auth.util.JWTUtils;
import io.datains.auth.util.RedisService;
import io.datains.auth.util.UserKey;
import lombok.extern.log4j.Log4j2;
import net.minidev.json.annotate.JsonIgnore;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import redis.clients.jedis.Jedis;

import javax.annotation.Nullable;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.Enumeration;


/**
 * @author Mr.zhang
 * @date 2022/04/11 9:20
 * token拦截器
 */
@Log4j2
@Component
public class TokenInterceptor  implements HandlerInterceptor {
    @Resource
    private RedisService redisService;
    // 这个方法是在访问接口之前执行的，我们只需要在这里写验证登陆状态的业务逻辑，就可以在用户调用指定接口之前验证登陆状态了
    @Override
    @JsonIgnore
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("Authorization");
        if (StringUtils.isEmpty(token)){
            return true;
        }
        Long userId = JWTUtils.tokenInfoByToken(token).getUserId();
        String s = redisService.get(UserKey.getById, "datains_"+userId.toString());
        if (StringUtils.isEmpty(s)){
            return false;
        }
        // 否则返回true 进入controller
        return true;
    }
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
    }

}
