package io.datains.service.panel;

import com.google.gson.Gson;
import io.datains.auth.api.dto.CurrentRoleDto;
import io.datains.auth.api.dto.CurrentUserDto;
import io.datains.base.domain.PanelGroup;
import io.datains.base.domain.PanelShare;
import io.datains.base.domain.PanelShareExample;
import io.datains.base.domain.XpackSysAuthDetailDTO;
import io.datains.base.mapper.PanelGroupMapper;
import io.datains.base.mapper.PanelShareMapper;
import io.datains.base.mapper.ext.ExtPanelShareMapper;
import io.datains.commons.constants.AuthConstants;
import io.datains.commons.model.AuthURD;
import io.datains.commons.model.ShareAuthInfo;
import io.datains.commons.utils.AuthUtils;
import io.datains.commons.utils.BeanUtils;
import io.datains.controller.request.panel.PanelShareFineDto;
import io.datains.controller.request.panel.PanelShareRemoveRequest;
import io.datains.controller.request.panel.PanelShareSearchRequest;
import io.datains.controller.sys.base.BaseGridRequest;
import io.datains.dto.panel.PanelShareDto;
import io.datains.dto.panel.PanelShareOutDTO;
import io.datains.dto.panel.PanelSharePo;
import io.datains.listener.util.CacheUtils;
import io.datains.service.message.DeMsgutil;
import io.datains.service.sys.impl.AuthXpackDefaultService;
import lombok.Data;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ShareService {

    @Autowired(required = false)
    private PanelShareMapper mapper;

    @Resource
    private PanelGroupMapper panelGroupMapper;

    @Resource
    private ExtPanelShareMapper extPanelShareMapper;
    @Resource
    private AuthXpackDefaultService authXpackDefaultService;

    /**
     * 1.查询当前节点已经分享给了哪些目标
     * 2.过滤出新增的目标
     * 3.过滤出减少的目标
     * 4.批量删除
     * 5.批量新增
     * 6.发送取消分享消息
     * 7.发送新增分享消息
     *
     * @param panelShareFineDto
     */
    @Transactional
    public void fineSave(PanelShareFineDto panelShareFineDto) {

        List<PanelShare> addShares = new ArrayList<>();// 新增的分享
        List<Long> redShareIdLists = new ArrayList<>();// 取消的分享

        String panelGroupId = panelShareFineDto.getResourceId();
        AuthURD sharedAuthURD = new AuthURD();
        AuthURD addAuthURD = new AuthURD();
        Set<Long> userIds = new HashSet<>();
        Set<Long> deptIds = new HashSet<>();
        Set<Long> roleIds = new HashSet<>();
        if (CollectionUtils.isNotEmpty(panelShareFineDto.getShareAuthInfos())) {
            for (ShareAuthInfo shareAuthInfo : panelShareFineDto.getShareAuthInfos()) {
                switch (shareAuthInfo.getAuthTargetType()) {
                    case "user":
                        userIds.add(Long.valueOf(shareAuthInfo.getAuthTarget()));
                        break;
                    case "dept":
                        deptIds.add(Long.valueOf(shareAuthInfo.getAuthTarget()));
                        break;
                    case "role":
                        roleIds.add(Long.valueOf(shareAuthInfo.getAuthTarget()));
                        break;
                }
            }
        }
        Map<Integer, List<Long>> authURDMap = new HashMap<>();
        authURDMap.put(0, new ArrayList<>(userIds));
        authURDMap.put(1, new ArrayList<>(roleIds));
        authURDMap.put(2, new ArrayList<>(deptIds));

        /*
         * PanelShareExample example = new PanelShareExample();
         * example.createCriteria().andPanelGroupIdEqualTo(panelGroupId);
         * List<PanelShare> panelShares = mapper.selectByExample(example);
         */
        PanelShareSearchRequest request = new PanelShareSearchRequest();
        request.setCurrentUserName(AuthUtils.getUser().getUsername());
        request.setResourceId(panelGroupId);
        // 当前用户已经分享出去的
        List<PanelShare> panelShares = extPanelShareMapper.queryWithResource(request);
        Map<Integer, List<TempShareNode>> typeSharedMap = panelShares.stream().map(this::convertNode)
                .collect(Collectors.groupingBy(TempShareNode::getType));

        for (Map.Entry<Integer, List<Long>> entry : authURDMap.entrySet()) {
            Integer key = entry.getKey();
            List<TempShareNode> shareNodes;
            if (null == typeSharedMap.get(key)) {
                shareNodes = new ArrayList<>();
            } else {
                shareNodes = typeSharedMap.get(key);
            }

            if (null != authURDMap.get(key)) {
                Map<String, Object> dataMap = filterData(authURDMap.get(key), shareNodes);
                List<Long> newIds = (List<Long>) dataMap.get("add");
                for (Long id : newIds) {
                    PanelShare share = new PanelShare();
                    share.setCreateTime(System.currentTimeMillis());
                    share.setPanelGroupId(panelGroupId);
                    share.setTargetId(id);
                    share.setType(key);
                    addShares.add(share);
                }
                List<TempShareNode> redNodes = (List<TempShareNode>) dataMap.get("red");
                List<Long> redIds = redNodes.stream().map(TempShareNode::getShareId).distinct()
                        .collect(Collectors.toList());

                redShareIdLists.addAll(redIds);
                buildRedAuthURD(key,
                        redNodes.stream().map(TempShareNode::getTargetId).distinct().collect(Collectors.toList()),
                        sharedAuthURD);
                buildRedAuthURD(key, newIds, addAuthURD);
            }

        }

        if (CollectionUtils.isNotEmpty(redShareIdLists)) {
            extPanelShareMapper.batchDelete(redShareIdLists);
        }

        if (CollectionUtils.isNotEmpty(addShares)) {
            extPanelShareMapper.batchInsert(addShares, AuthUtils.getUser().getUsername());
        }
        //进行权限方面的操作
        //清理权限缓存
        CacheUtils.removeAll(AuthConstants.USER_PANEL_NAME);
        List<ShareAuthInfo> shareAuthInfos = panelShareFineDto.getShareAuthInfos();
        if (CollectionUtils.isNotEmpty(shareAuthInfos)) {
            for (ShareAuthInfo shareAuthInfo : shareAuthInfos) {
                if (1 == shareAuthInfo.getPrivilegeValue()) {
                    authXpackDefaultService.authAddForShare(panelGroupId,
                            shareAuthInfo.getAuthTarget(),
                            "panel",
                            shareAuthInfo.getAuthTargetType(),
                            "share",
                            shareAuthInfo.getPrivilegeType());
                } else {
                    authXpackDefaultService.authDelForShare(panelGroupId,
                            shareAuthInfo.getAuthTarget(),
                            "panel",
                            shareAuthInfo.getAuthTargetType(),
                            "share",
                            shareAuthInfo.getPrivilegeType());
                }
            }
        }
        if (CollectionUtils.isNotEmpty(redShareIdLists)) {
            // 去除删除的分享的权限
            for (Long shareId : redShareIdLists) {
                for (PanelShare item : panelShares) {
                    if (item.getShareId().equals(shareId)) {
                        authXpackDefaultService.authDelForShare(
                                panelGroupId,
                                item.getTargetId().toString(),
                                "panel",
                                getAuthTargetType(String.valueOf(item.getType())),
                                "share",
                                null);
                    }
                }
            }
        }
        // 以上是业务代码
        // 下面是消息发送
        Set<Long> addUserIdSet = AuthUtils.userIdsByURD(addAuthURD);
        Set<Long> redUserIdSet = AuthUtils.userIdsByURD(sharedAuthURD);
        PanelGroup panelGroup = panelGroupMapper.selectByPrimaryKey(panelGroupId);
        CurrentUserDto user = AuthUtils.getUser();
        Gson gson = new Gson();
        String msg = panelGroup.getName();

        List<String> msgParam = new ArrayList<>();
        msgParam.add(panelGroupId);
        addUserIdSet.forEach(i -> {
            if (!redUserIdSet.contains(i) && !user.getUserId().equals(i)) {
                DeMsgutil.sendMsg(i, 2L, user.getNickName() + " 分享了仪表板【" + msg + "】，请查收!", gson.toJson(msgParam));
            }
        });

        redUserIdSet.forEach(i -> {
            if (!addUserIdSet.contains(i) && !user.getUserId().equals(i)) {
                DeMsgutil.sendMsg(i, 3L, user.getNickName() + " 取消分享了仪表板【" + msg + "】，请查收!",
                        gson.toJson(msgParam));
            }
        });

    }

    private void buildRedAuthURD(Integer type, List<Long> redIds, AuthURD authURD) {
        if (type == 0) {
            authURD.setUserIds(redIds);
        }
        if (type == 1) {
            authURD.setRoleIds(redIds);
        }
        if (type == 2) {
            authURD.setDeptIds(redIds);
        }
    }

    /**
     *
     * @param newTargets 新的分享目标
     * @param shareNodes 已景分享目标
     * @return
     */
    private Map<String, Object> filterData(List<Long> newTargets, List<TempShareNode> shareNodes) {
        Map<String, Object> result = new HashMap<>();
        List<Long> newUserIds = new ArrayList<>();
        for (Long newTargetId : newTargets) {
            boolean isNew = true;
            for (TempShareNode shareNode : shareNodes) {
                Long sharedId = shareNode.getTargetId();
                if (newTargetId.equals(sharedId)) {
                    shareNode.setMatched(true); // 已分享 重新命中
                    isNew = false;
                }
            }
            if (isNew) {
                // 获取新增的
                newUserIds.add(newTargetId);
            }
        }
        // 获取需要取消分享的
        List<TempShareNode> missNodes = shareNodes.stream().filter(item -> !item.getMatched())
                .collect(Collectors.toList());
        result.put("add", newUserIds);
        result.put("red", missNodes);
        return result;
    }

    @Data
    private static class TempShareNode {
        private Long shareId;
        private Integer type;
        private Long targetId;
        private Boolean matched = false;

        public boolean targetMatch(Long tid) {
            return targetId.equals(tid);
        }
    }

    private TempShareNode convertNode(PanelShare panelShare) {
        return BeanUtils.copyBean(new TempShareNode(), panelShare);
    }

    /**
     * panel_group_id建了索引 效率不会很差
     *
     * @param panel_group_id
     */
    @Transactional
    public void delete(String panel_group_id, Integer type) {
        PanelShareExample example = new PanelShareExample();
        PanelShareExample.Criteria criteria = example.createCriteria();
        criteria.andPanelGroupIdEqualTo(panel_group_id);
        if (type != null) {
            criteria.andTypeEqualTo(type);
        }
        mapper.deleteByExample(example);
    }

    public List<PanelSharePo> queryShareOut() {
        String username = AuthUtils.getUser().getUsername();
        List<PanelSharePo> list = extPanelShareMapper.queryOut(username);
        privilegesHandle(list);
        return list;
    }

    public List<PanelShareDto> queryTree(BaseGridRequest request) {
        CurrentUserDto user = AuthUtils.getUser();
        Long userId = user.getUserId();
        Long deptId = user.getDeptId();
        List<Long> roleIds = user.getRoles().stream().map(CurrentRoleDto::getId).collect(Collectors.toList());

        Map<String, Object> param = new HashMap<>();
        param.put("userId", userId);
        param.put("deptId", deptId);
        param.put("roleIds", roleIds);

        List<PanelSharePo> datas = extPanelShareMapper.query(param);
        privilegesHandle(datas);
        List<PanelShareDto> dtoLists = datas.stream().map(po -> BeanUtils.copyBean(new PanelShareDto(), po))
                .collect(Collectors.toList());
        return convertTree(dtoLists);
    }

    // List构建Tree
    private List<PanelShareDto> convertTree(List<PanelShareDto> datas) {
        String username = AuthUtils.getUser().getUsername();
        Map<String, List<PanelShareDto>> map = datas.stream()
                .filter(panelShareDto -> StringUtils.isNotEmpty(panelShareDto.getCreator())
                        && !StringUtils.equals(username, panelShareDto.getCreator()))
                .collect(Collectors.groupingBy(PanelShareDto::getCreator));
        return map.entrySet().stream().map(entry -> {
            PanelShareDto panelShareDto = new PanelShareDto();
            panelShareDto.setName(entry.getKey());
            panelShareDto.setChildren(entry.getValue());
            return panelShareDto;
        }).collect(Collectors.toList());
    }

    public List<PanelShare> queryWithResource(PanelShareSearchRequest request) {
        String username = AuthUtils.getUser().getUsername();
        request.setCurrentUserName(username);
        List<PanelShare> list = extPanelShareMapper.queryWithResource(request);
        if (CollectionUtils.isEmpty(list)) {
            return new ArrayList<>();
        }

        List<String> authTargets = list.stream().map(item -> item.getTargetId().toString()).collect(Collectors.toList());
        //拼装权限信息
        List<XpackSysAuthDetailDTO> auth = authXpackDefaultService.selectListForShare(
                Collections.singletonList(request.getResourceId()),
                "panel",
                authTargets,
                getAuthTargetType(request.getType())
        );
        if (!CollectionUtils.isEmpty(auth)) {
            //因为只有一个数据集，所以根据目标id进行分类
            Map<String, List<XpackSysAuthDetailDTO>> authMap = auth.stream()
                    .collect(Collectors.groupingBy(XpackSysAuthDetailDTO::getAuthTarget));
            for (PanelShare item : list) {
                //进行权限组装
                Set<String> privileges = new HashSet<>();
                if (authMap.containsKey(item.getTargetId().toString())) {
                    //理论上一个人一个数据集只会有一组权限
                    List<XpackSysAuthDetailDTO> auths = authMap.get(item.getTargetId().toString());
                    for (XpackSysAuthDetailDTO a : auths) {
                        if (a.getPrivilegeExtend() != null && 1 == a.getPrivilegeValue()) {
                            privileges.add(a.getPrivilegeExtend());
                        }
                    }
                }
                item.setPrivileges(String.join(",", privileges));
            }
        }
        return list;
    }

    public List<PanelShareOutDTO> queryTargets(String panelId) {
        String username = AuthUtils.getUser().getUsername();
        List<PanelShareOutDTO> targets = extPanelShareMapper.queryTargets(panelId, username);
        if (CollectionUtils.isEmpty(targets))
            return new ArrayList<>();
        return targets.stream().filter(item -> StringUtils.isNotEmpty(item.getTargetName()))
                .collect(Collectors.toList());
    }

    public List<PanelShare> queryByTarget(Long targetId, Integer targetType) {
        return extPanelShareMapper.queryByTarget(targetId, targetType);
    }

    @Transactional
    public void removeShares(PanelShareRemoveRequest removeRequest) {
        List<PanelShare> list = extPanelShareMapper.queryByPanelGroupId(removeRequest.getPanelId());
        //删除分享
        extPanelShareMapper.removeShares(removeRequest);
        //去除权限
        //清理权限缓存
        CacheUtils.removeAll(AuthConstants.USER_PANEL_NAME);
        for (PanelShare share : list) {
            authXpackDefaultService.authDelForShare(
                    share.getPanelGroupId(),
                    share.getTargetId().toString(),
                    "panel",
                    getAuthTargetType(String.valueOf(share.getType())),
                    "share",
                    null);
        }
    }

    private void privilegesHandle(List<PanelSharePo> list) {
        if (CollectionUtils.isEmpty(list)) {
            return;
        }

        List<String> authSources = list.stream().map(PanelSharePo::getId).collect(Collectors.toList());
        //拼装权限信息
        List<XpackSysAuthDetailDTO> auth = authXpackDefaultService.selectListForShare(
                authSources,
                "panel",
                Collections.singletonList(AuthUtils.getUser().getUserId().toString()),
                "user"
        );
        if (!CollectionUtils.isEmpty(auth)) {
            //因为只有一个用户，所以根据数据集id进行分类
            Map<String, List<XpackSysAuthDetailDTO>> authMap = auth.stream()
                    .collect(Collectors.groupingBy(XpackSysAuthDetailDTO::getAuthSource));
            for (PanelSharePo item : list) {
                //进行权限组装
                Set<String> privileges = new HashSet<>();
                if (authMap.containsKey(item.getId())) {
                    //理论上一个人一个数据集只会有一组权限
                    List<XpackSysAuthDetailDTO> auths = authMap.get(item.getId());
                    for (XpackSysAuthDetailDTO a : auths) {
                        if (a.getPrivilegeExtend() != null && 1 == a.getPrivilegeValue()) {
                            privileges.add(a.getPrivilegeExtend());
                        }
                    }
                }
                item.setPrivileges(String.join(",", privileges));
            }
        }
    }

    private String getAuthTargetType(String type) {
        if ("0".equals(type)) {
            return "user";
        } else if ("1".equals(type)) {
            return "role";
        } else {
            return "dept";
        }
    }
}
