package io.datains.auth.aop;

import io.datains.auth.annotation.DeCleaner;
import io.datains.auth.api.dto.CurrentUserDto;
import io.datains.commons.constants.AuthConstants;
import io.datains.commons.constants.DePermissionType;
import io.datains.commons.model.AuthURD;
import io.datains.commons.utils.AopUtils;
import io.datains.commons.utils.AuthUtils;
import io.datains.commons.utils.LogUtil;
import io.datains.listener.util.CacheUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Optional;

@Aspect
@Component
public class DeCleanerAnnotationHandler {

    @AfterReturning(value = "@annotation(io.datains.auth.annotation.DeCleaner)")
    public void CleanerAround(JoinPoint point) {
        try {
            MethodSignature ms = (MethodSignature) point.getSignature();
            Method method = ms.getMethod();
            DeCleaner deCleaner = method.getAnnotation(DeCleaner.class);
            DePermissionType type = deCleaner.value();
            String key = deCleaner.key();
            Object[] args = point.getArgs();
            Object paramValue = null;
            if (ObjectUtils.isNotEmpty(key) && ArrayUtils.isNotEmpty(args)) {
                int pi = deCleaner.paramIndex();
                Object arg = point.getArgs()[pi];
                paramValue = AopUtils.getParamValue(arg, key, 0);
            }
            switch (type.name()) {
                case "DATA_FILL":
                    cleanDataFiling(paramValue);
                    break;
                case "DATASOURCE":
                    cleanDataSource(paramValue);
                    break;
                case "DATASET":
                    cleanDataSet(paramValue);
                    break;
                default:
                    cleanPanel(paramValue);
                    break;
            }
        } catch (Throwable e) {
            LogUtil.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    public void cleanPanel(Object pid) {
        CurrentUserDto user = AuthUtils.getUser();
        CacheUtils.remove(AuthConstants.USER_PANEL_NAME, "user" + user.getUserId());
        CacheUtils.remove(AuthConstants.DEPT_PANEL_NAME, "dept" + user.getDeptId());
        user.getRoles().forEach(role -> {
            CacheUtils.remove(AuthConstants.ROLE_PANEL_NAME, "role" + role.getId());
        });

        Optional.ofNullable(pid).ifPresent(resourceId -> {
            cleanCacheParent(resourceId.toString(), "panel");
        });
    }

    public void cleanDataSet(Object pid) {
        CurrentUserDto user = AuthUtils.getUser();
        CacheUtils.remove(AuthConstants.USER_DATASET_NAME, "user" + user.getUserId());
        CacheUtils.remove(AuthConstants.DEPT_DATASET_NAME, "dept" + user.getDeptId());
        user.getRoles().forEach(role -> {
            CacheUtils.remove(AuthConstants.ROLE_DATASET_NAME, "role" + role.getId());
        });

        Optional.ofNullable(pid).ifPresent(resourceId -> {
            cleanCacheParent(resourceId.toString(), "dataset");
        });
    }

    public void cleanDataSource(Object pid) {
        CurrentUserDto user = AuthUtils.getUser();
        CacheUtils.remove(AuthConstants.USER_LINK_NAME, "user" + user.getUserId());
        CacheUtils.remove(AuthConstants.DEPT_LINK_NAME, "dept" + user.getDeptId());
        user.getRoles().forEach(role -> {
            CacheUtils.remove(AuthConstants.ROLE_LINK_NAME, "role" + role.getId());
        });

        Optional.ofNullable(pid).ifPresent(resourceId -> {
            cleanCacheParent(resourceId.toString(), "link");
        });
    }
    public void cleanDataFiling(Object pid) {
        CurrentUserDto user = AuthUtils.getUser();
        CacheUtils.remove(AuthConstants.USER_DATA_FILL_NAME, "user" + user.getUserId());
        CacheUtils.remove(AuthConstants.DEPT_DATA_FILL_NAME, "dept" + user.getDeptId());
        user.getRoles().forEach(role -> {
            CacheUtils.remove(AuthConstants.ROLE_DATA_FILL_NAME, "role" + role.getId());
        });

        Optional.ofNullable(pid).ifPresent(resourceId -> {
            cleanCacheParent(resourceId.toString(), "data_fill");
        });
    }
    private void cleanCacheParent(String pid, String type) {
        if (StringUtils.isBlank(pid) || StringUtils.isBlank(type)) {
            return;
        }
        CurrentUserDto user = AuthUtils.getUser();
        List<String> resourceIds = AuthUtils.parentResources(pid.toString(), type);
        if (CollectionUtils.isEmpty(resourceIds))return;
        resourceIds.forEach(resourceId -> {
            AuthURD authURD = AuthUtils.authURDR(resourceId);
            Optional.ofNullable(authURD.getUserIds()).ifPresent(ids -> {
                ids.forEach(id -> {
                    CacheUtils.remove("user_"+type, "user" + id);
                });
            });
            Optional.ofNullable(authURD.getRoleIds()).ifPresent(ids -> {
                ids.forEach(id -> {
                    CacheUtils.remove("role_"+type, "role" + id);
                });
            });
            Optional.ofNullable(authURD.getDeptIds()).ifPresent(ids -> {
                ids.forEach(id -> {
                    List<String> depts = AuthUtils.getAuthModels(id.toString(), "dept", user.getUserId(), user.getIsAdmin());
                    depts.forEach(deptId -> {
                        CacheUtils.remove("dept_"+type, "dept" + deptId);
                    });
                });
            });
        });
    }
}
