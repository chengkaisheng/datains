package io.datains.service.sys;


import io.datains.base.mapper.ext.ExtSysAuthMapper;
import io.datains.commons.utils.AuthUtils;
import io.datains.i18n.Translator;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class SysAuthService {

    @Resource
    private ExtSysAuthMapper extSysAuthMapper;
    @Resource
    private SysDeptLeaderAuthService sysDeptLeaderAuthService;

    public void checkTreeNoManageCount(String modelType, String nodeId) {
        if (extSysAuthMapper.checkTreeNoManageCount(AuthUtils.getUser().getUserId(), modelType, nodeId)) {
            throw new RuntimeException(Translator.get("i18n_no_all_delete_privilege_folder"));
        }
    }

    public void copyAuth(String authSource, String authSourceType) {
        String userName = AuthUtils.getUser().getUsername();
        extSysAuthMapper.copyAuth(authSource, authSourceType, userName);
        sysDeptLeaderAuthService.addAuthToLeaders(AuthUtils.getUser().getUserId(), authSource, authSourceType);
    }

}
