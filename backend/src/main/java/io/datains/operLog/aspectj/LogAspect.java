package io.datains.operLog.aspectj;

import com.alibaba.fastjson2.JSON;
import io.datains.auth.api.dto.CurrentUserDto;
import io.datains.commons.utils.AuthUtils;
import io.datains.operLog.annotation.Log;
import io.datains.operLog.entity.SysOperLog;
import io.datains.operLog.enums.BusinessStatus;
import io.datains.operLog.enums.BusinessType;
import io.datains.operLog.enums.HttpMethod;
import io.datains.operLog.file.PropertyPreExcludeFilter;
import io.datains.operLog.manager.AsyncManager;
import io.datains.operLog.manager.factory.AsyncFactory;
import io.datains.operLog.utils.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.NamedThreadLocal;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Date;
import java.util.Map;

/**
 * 操作日志记录处理
 *
 * @author engifile
 */
@Aspect
@Component
public class LogAspect {
    private static final Logger log = LoggerFactory.getLogger(LogAspect.class);
    /**
     * 计算操作消耗时间
     */
    private static final ThreadLocal<Long> TIME_THREADLOCAL = new NamedThreadLocal<Long>("Cost Time");

    @Pointcut("@within(org.springframework.stereotype.Controller) " +
            "|| @within(org.springframework.web.bind.annotation.RestController)")
    public void controllerPointcut() {
    }

    /**
     * 处理请求前执行
     */
    @Before(value = "controllerPointcut()")
    public void doBefore(JoinPoint joinPoint) {
        Log controllerLog = getLogAnnotation(joinPoint);
        if (controllerLog.isSaveLog()) {
            TIME_THREADLOCAL.set(System.currentTimeMillis());
        }
    }

    /**
     * 处理完请求后执行
     *
     * @param joinPoint 切点
     */
    @AfterReturning(pointcut = "controllerPointcut()", returning = "jsonResult")
    public void doAfterReturning(JoinPoint joinPoint, Object jsonResult) {
        Log controllerLog = getLogAnnotation(joinPoint);
        if (controllerLog.isSaveLog()) {
            handleLog(joinPoint, controllerLog, null, jsonResult);
        }
    }

    /**
     * 拦截异常操作
     *
     * @param joinPoint 切点
     * @param e         异常
     */
    @AfterThrowing(value = "controllerPointcut()", throwing = "e")
    public void doAfterThrowing(JoinPoint joinPoint, Exception e) {
        Log controllerLog = getLogAnnotation(joinPoint);
        if (controllerLog.isSaveLog()) {
            handleLog(joinPoint, controllerLog, e, null);
        }
    }

    protected void handleLog(final JoinPoint joinPoint, Log controllerLog, final Exception e, Object jsonResult) {
        try {
            // 获取当前的用户
            CurrentUserDto loginUser = AuthUtils.getUser();

            // *========数据库日志=========*//
            SysOperLog operLog = new SysOperLog();
            operLog.setStatus(BusinessStatus.SUCCESS.ordinal());
            // 请求的地址
            String ip = IpUtils.getIpAddr();
            operLog.setOperIp(ip);
            operLog.setOperUrl(StringUtils.substring(ServletUtils.getRequest().getRequestURI(), 0, 255));
            if (loginUser != null) {
                operLog.setOperName(loginUser.getNickName());
                operLog.setCreateBy(loginUser.getUsername());
            }

            if (e != null) {
                operLog.setStatus(BusinessStatus.FAIL.ordinal());
                operLog.setErrorMsg(StringUtils.substring(Convert.toStr(e.getMessage(), ExceptionUtil.getExceptionMessage(e)), 0, 2000));
            }
            // 设置方法名称
            String className = joinPoint.getTarget().getClass().getName();
            String methodName = joinPoint.getSignature().getName();
            operLog.setMethod(className + "." + methodName + "()");
            // 设置请求方式
            operLog.setRequestMethod(ServletUtils.getRequest().getMethod());
            // 处理设置注解上的参数
            getControllerMethodDescription(joinPoint, controllerLog, operLog, jsonResult);
            // 设置消耗时间
            operLog.setCostTime(System.currentTimeMillis() - TIME_THREADLOCAL.get());
            operLog.setOperTime(new Date());
            operLog.setCreateTime(new Date());
            // 保存数据库
            AsyncManager.me().execute(AsyncFactory.recordOper(operLog));
        } catch (Exception exp) {
            // 记录本地异常日志
            log.error("异常信息:{}", exp.getMessage());
            exp.printStackTrace();
        } finally {
            TIME_THREADLOCAL.remove();
        }
    }

    /**
     * 获取注解中对方法的描述信息 用于Controller层注解
     *
     * @param log     日志
     * @param operLog 操作日志
     */
    public void getControllerMethodDescription(JoinPoint joinPoint, Log log, SysOperLog operLog, Object jsonResult) {
        // 设置action动作
        operLog.setBusinessType(log.businessType().ordinal());
        // 设置标题
        if (log.title() != null && "needAuto".equals(log.title())) {
            operLog.setTitle(extractTitleFromSwaggerAnnotations(joinPoint));
        } else {
            operLog.setTitle(log.title());
        }

        // 是否需要保存request，参数和值
        if (log.isSaveRequestData()) {
            // 获取参数的信息，传入到数据库中。
            setRequestValue(joinPoint, operLog, log.excludeParamNames());
        }
        // 是否需要保存response，参数和值
        if (log.isSaveResponseData() && StringUtils.isNotNull(jsonResult)) {
            operLog.setJsonResult(StringUtils.substring(JSON.toJSONString(jsonResult), 0, 2000));
        }
    }

    /**
     * 获取请求的参数，放到log中
     *
     * @param operLog 操作日志
     */
    private void setRequestValue(JoinPoint joinPoint, SysOperLog operLog, String[] excludeParamNames) {
        Map<?, ?> paramsMap = ServletUtils.getParamMap(ServletUtils.getRequest());
        String requestMethod = operLog.getRequestMethod();
        if (StringUtils.isEmpty(paramsMap) && StringUtils.equalsAny(requestMethod, HttpMethod.PUT.name(), HttpMethod.POST.name(), HttpMethod.DELETE.name())) {
            String params = argsArrayToString(joinPoint.getArgs(), excludeParamNames);
            operLog.setOperParam(params);
        } else {
            operLog.setOperParam(JSON.toJSONString(paramsMap, excludePropertyPreFilter(excludeParamNames)));
        }
    }

    /**
     * 参数拼装
     */
    private String argsArrayToString(Object[] paramsArray, String[] excludeParamNames) {
        String params = "";
        if (paramsArray != null && paramsArray.length > 0) {
            for (Object o : paramsArray) {
                if (StringUtils.isNotNull(o) && !isFilterObject(o)) {
                    try {
                        String jsonObj = JSON.toJSONString(o, excludePropertyPreFilter(excludeParamNames));
                        params += jsonObj.toString() + " ";
                    } catch (Exception e) {
                    }
                }
            }
        }
        return params.trim();
    }

    /**
     * 忽略指定属性
     */
    public PropertyPreExcludeFilter excludePropertyPreFilter(String[] excludeParamNames) {
        return new PropertyPreExcludeFilter().addExcludes(excludeParamNames);
    }

    /**
     * 判断是否需要过滤的对象。
     *
     * @param o 对象信息。
     * @return 如果是需要过滤的对象，则返回true；否则返回false。
     */
    @SuppressWarnings("rawtypes")
    public boolean isFilterObject(final Object o) {
        Class<?> clazz = o.getClass();
        if (clazz.isArray()) {
            return clazz.getComponentType().isAssignableFrom(MultipartFile.class);
        } else if (Collection.class.isAssignableFrom(clazz)) {
            Collection collection = (Collection) o;
            for (Object value : collection) {
                return value instanceof MultipartFile;
            }
        } else if (Map.class.isAssignableFrom(clazz)) {
            Map map = (Map) o;
            for (Object value : map.entrySet()) {
                Map.Entry entry = (Map.Entry) value;
                return entry.getValue() instanceof MultipartFile;
            }
        }
        return o instanceof MultipartFile || o instanceof HttpServletRequest || o instanceof HttpServletResponse
                || o instanceof BindingResult;
    }

    /**
     * 从Swagger注解中提取标题信息
     */
    private String extractTitleFromSwaggerAnnotations(JoinPoint joinPoint) {
        try {
            MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
            Method method = methodSignature.getMethod();
            Class<?> targetClass = joinPoint.getTarget().getClass();

            // 获取方法上的@ApiOperation注解
            ApiOperation apiOperation = method.getAnnotation(ApiOperation.class);
            String operationValue = "";
            if (apiOperation != null) {
                operationValue = apiOperation.value();
            }

            // 获取类上的@Api注解
            Api api = targetClass.getAnnotation(Api.class);
            String apiValue = "";
            if (api != null && api.tags().length > 0) {
                apiValue = api.tags()[0];
            }

            // 组合标题
            if (!apiValue.isEmpty() && !operationValue.isEmpty()) {
                return apiValue + " - " + operationValue;
            } else if (!apiValue.isEmpty()) {
                return apiValue;
            } else if (!operationValue.isEmpty()) {
                return operationValue;
            } else {
                // 如果都没有注解，使用类名+方法名
                return targetClass.getSimpleName() + "." + method.getName();
            }
        } catch (Exception e) {
            log.warn("提取Swagger注解信息失败: {}", e.getMessage());
            return "未知操作";
        }
    }

    /**
     * 获取方法上的Log注解，如果没有则返回一个默认的Log注解
     */
    private Log getLogAnnotation(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();
        Log logAnnotation = method.getAnnotation(Log.class);

        // 如果方法上有Log注解，直接返回
        if (logAnnotation != null) {
            return logAnnotation;
        }

        // 否则返回一个默认的Log注解（通过动态代理创建）
        return createDefaultLog();
    }

    /**
     * 创建默认的Log注解实例
     */
    private Log createDefaultLog() {
        return new Log() {
            @Override
            public Class<? extends java.lang.annotation.Annotation> annotationType() {
                return Log.class;
            }

            @Override
            public String title() {
                return "needAuto";
            }

            @Override
            public BusinessType businessType() {
                return BusinessType.OTHER;
            }

            @Override
            public boolean isSaveRequestData() {
                return true;
            }

            @Override
            public boolean isSaveResponseData() {
                return false;
            }

            @Override
            public boolean isSaveLog() {
                return true;
            }

            @Override
            public String[] excludeParamNames() {
                return new String[0];
            }
        };
    }
}
