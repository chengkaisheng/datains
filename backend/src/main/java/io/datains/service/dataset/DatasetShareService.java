package io.datains.service.dataset;

import com.google.gson.Gson;
import io.datains.auth.api.dto.CurrentRoleDto;
import io.datains.auth.api.dto.CurrentUserDto;
import io.datains.base.domain.DatasetShare;
import io.datains.base.domain.DatasetTable;
import io.datains.base.domain.XpackSysAuthDetailDTO;
import io.datains.base.mapper.DatasetTableMapper;
import io.datains.base.mapper.ext.ExtDatasetShareMapper;
import io.datains.commons.model.AuthURD;
import io.datains.commons.model.ShareAuthInfo;
import io.datains.commons.utils.AuthUtils;
import io.datains.commons.utils.BeanUtils;
import io.datains.controller.request.dataset.DatasetShareFineDto;
import io.datains.controller.request.dataset.DatasetShareRemoveRequest;
import io.datains.controller.request.dataset.DatasetShareSearchRequest;
import io.datains.dto.dataset.DatasetShareDto;
import io.datains.dto.dataset.DatasetShareOutDTO;
import io.datains.dto.dataset.DatasetSharePo;
import io.datains.service.message.DeMsgutil;
import io.datains.service.sys.impl.AuthXpackDefaultService;
import lombok.Data;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DatasetShareService {

    @Resource
    private DatasetTableMapper datasetTableMapper;

    @Resource
    private ExtDatasetShareMapper extDatasetShareMapper;
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
     * @param datasetShareFineDto
     */
    @Transactional
    public void fineSave(DatasetShareFineDto datasetShareFineDto) {

        List<DatasetShare> addShares = new ArrayList<>();// 新增的分享
        List<Long> redShareIdLists = new ArrayList<>();// 取消的分享

        String datasetId = datasetShareFineDto.getResourceId();
        AuthURD sharedAuthURD = new AuthURD();
        AuthURD addAuthURD = new AuthURD();
        Set<Long> userIds = new HashSet<>();
        Set<Long> deptIds = new HashSet<>();
        Set<Long> roleIds = new HashSet<>();
        if (CollectionUtils.isNotEmpty(datasetShareFineDto.getShareAuthInfos())) {
            for (ShareAuthInfo shareAuthInfo : datasetShareFineDto.getShareAuthInfos()) {
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

        DatasetShareSearchRequest request = new DatasetShareSearchRequest();
        request.setCurrentUserName(AuthUtils.getUser().getUsername());
        request.setResourceId(datasetId);
        // 当前用户已经分享出去的
        List<DatasetShare> datasetShares = extDatasetShareMapper.queryWithResource(request);
        Map<Integer, List<TempShareNode>> typeSharedMap = datasetShares.stream().map(this::convertNode)
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
                    DatasetShare share = new DatasetShare();
                    share.setCreateTime(System.currentTimeMillis());
                    share.setDatasetId(datasetId);
                    share.setTargetId(id);
                    share.setType(key);
                    share.setDatasetType(datasetShareFineDto.getDatasetType());
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
            extDatasetShareMapper.batchDelete(redShareIdLists);
        }

        if (CollectionUtils.isNotEmpty(addShares)) {
            extDatasetShareMapper.batchInsert(addShares, AuthUtils.getUser().getUsername());
        }
        //进行权限方面的操作
        List<ShareAuthInfo> shareAuthInfos = datasetShareFineDto.getShareAuthInfos();
        if (CollectionUtils.isNotEmpty(shareAuthInfos)) {
            for (ShareAuthInfo shareAuthInfo : shareAuthInfos) {
                if (1 == shareAuthInfo.getPrivilegeValue()) {
                    authXpackDefaultService.authAddForShare(datasetId,
                            shareAuthInfo.getAuthTarget(),
                            "dataset",
                            shareAuthInfo.getAuthTargetType(),
                            "share",
                            shareAuthInfo.getPrivilegeType());
                } else {
                    authXpackDefaultService.authDelForShare(datasetId,
                            shareAuthInfo.getAuthTarget(),
                            "dataset",
                            shareAuthInfo.getAuthTargetType(),
                            "share",
                            shareAuthInfo.getPrivilegeType());
                }
            }
        }
        if (CollectionUtils.isNotEmpty(redShareIdLists)) {
            // 去除删除的分享的权限
            for (Long shareId : redShareIdLists) {
                for (DatasetShare item : datasetShares) {
                    if (item.getShareId().equals(shareId)) {
                        authXpackDefaultService.authDelForShare(
                                datasetId,
                                item.getTargetId().toString(),
                                "dataset",
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
        DatasetTable datasetTable = datasetTableMapper.selectByPrimaryKey(datasetId);
        CurrentUserDto user = AuthUtils.getUser();
        Gson gson = new Gson();
        String msg = datasetTable.getName();

        List<String> msgParam = new ArrayList<>();
        msgParam.add(datasetId);
        addUserIdSet.forEach(userId -> {
            if (!redUserIdSet.contains(userId) && !user.getUserId().equals(userId)) {
                DeMsgutil.sendMsg(userId, 10L, user.getNickName() + " 分享了数据集【" + msg + "】，请查收!", gson.toJson(msgParam));
            }
        });

        redUserIdSet.forEach(userId -> {
            if (!addUserIdSet.contains(userId) && !user.getUserId().equals(userId)) {
                DeMsgutil.sendMsg(userId, 11L, user.getNickName() + " 取消分享了数据集【" + msg + "】，请查收!",
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

    private TempShareNode convertNode(DatasetShare datasetShare) {
        return BeanUtils.copyBean(new TempShareNode(), datasetShare);
    }

    /**
     * datasetId建了索引 效率不会很差
     *
     * @param datasetId
     */
    @Transactional
    public void delete(String datasetId, Integer type) {
        extDatasetShareMapper.deleteById(datasetId, type);
    }

    public List<DatasetSharePo> queryShareOut() {
        String username = AuthUtils.getUser().getUsername();
        List<DatasetSharePo> list = extDatasetShareMapper.queryOut(username);
        privilegesHandle(list);
        return list;
    }

    public List<DatasetShareDto> queryTree() {
        CurrentUserDto user = AuthUtils.getUser();
        Long userId = user.getUserId();
        Long deptId = user.getDeptId();
        List<Long> roleIds = user.getRoles().stream().map(CurrentRoleDto::getId).collect(Collectors.toList());

        Map<String, Object> param = new HashMap<>();
        param.put("userId", userId);
        param.put("deptId", deptId);
        param.put("roleIds", roleIds);

        List<DatasetSharePo> datas = extDatasetShareMapper.query(param);
        privilegesHandle(datas);
        List<DatasetShareDto> dtoLists = datas.stream().map(po -> BeanUtils.copyBean(new DatasetShareDto(), po))
                .collect(Collectors.toList());
        return convertTree(dtoLists);
    }

    // List构建Tree
    private List<DatasetShareDto> convertTree(List<DatasetShareDto> datas) {
        String username = AuthUtils.getUser().getUsername();
        Map<String, List<DatasetShareDto>> map = datas.stream()
                .filter(datasetShareDto -> StringUtils.isNotEmpty(datasetShareDto.getCreator())
                        && !StringUtils.equals(username, datasetShareDto.getCreator()))
                .collect(Collectors.groupingBy(DatasetShareDto::getCreator));
        return map.entrySet().stream().map(entry -> {
            DatasetShareDto datasetShareDto = new DatasetShareDto();
            datasetShareDto.setName(entry.getKey());
            datasetShareDto.setChildren(entry.getValue());
            return datasetShareDto;
        }).collect(Collectors.toList());
    }

    public List<DatasetShare> queryWithResource(DatasetShareSearchRequest request) {
        String username = AuthUtils.getUser().getUsername();
        request.setCurrentUserName(username);
        List<DatasetShare> list = extDatasetShareMapper.queryWithResource(request);
        if (CollectionUtils.isEmpty(list)) {
            return new ArrayList<>();
        }

        List<String> authTargets = list.stream().map(item -> item.getTargetId().toString()).collect(Collectors.toList());
        //拼装权限信息
        List<XpackSysAuthDetailDTO> auth = authXpackDefaultService.selectListForShare(
                Collections.singletonList(request.getResourceId()),
                "dataset",
                authTargets,
                getAuthTargetType(request.getType())
        );
        if (!CollectionUtils.isEmpty(auth)) {
            //因为只有一个数据集，所以根据目标id进行分类
            Map<String, List<XpackSysAuthDetailDTO>> authMap = auth.stream()
                    .collect(Collectors.groupingBy(XpackSysAuthDetailDTO::getAuthTarget));
            for (DatasetShare item : list) {
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

    public List<DatasetShareOutDTO> queryTargets(String datasetId) {
        String username = AuthUtils.getUser().getUsername();
        List<DatasetShareOutDTO> targets = extDatasetShareMapper.queryTargets(datasetId, username);
        if (CollectionUtils.isEmpty(targets))
            return new ArrayList<>();
        return targets.stream().filter(item -> StringUtils.isNotEmpty(item.getTargetName()))
                .collect(Collectors.toList());
    }

    public List<DatasetShare> queryByTarget(Long targetId, Integer targetType) {
        return extDatasetShareMapper.queryByTarget(targetId, targetType);
    }

    @Transactional
    public void removeShares(DatasetShareRemoveRequest removeRequest) {
        List<DatasetShare> list = extDatasetShareMapper.queryByDatasetId(removeRequest.getDatasetId());
        //删除分享
        extDatasetShareMapper.removeShares(removeRequest);
        //去除权限
        for (DatasetShare datasetShare : list) {
            authXpackDefaultService.authDelForShare(
                    datasetShare.getDatasetId(),
                    datasetShare.getTargetId().toString(),
                    "dataset",
                    getAuthTargetType(String.valueOf(datasetShare.getType())),
                    "share",
                    null);
        }
    }

    private void privilegesHandle(List<DatasetSharePo> list) {
        if (CollectionUtils.isEmpty(list)) {
            return;
        }

        List<String> authSources = list.stream().map(DatasetSharePo::getId).collect(Collectors.toList());
        //拼装权限信息
        List<XpackSysAuthDetailDTO> auth = authXpackDefaultService.selectListForShare(
                authSources,
                "dataset",
                Collections.singletonList(AuthUtils.getUser().getUserId().toString()),
                "user"
        );
        if (!CollectionUtils.isEmpty(auth)) {
            //因为只有一个用户，所以根据数据集id进行分类
            Map<String, List<XpackSysAuthDetailDTO>> authMap = auth.stream()
                    .collect(Collectors.groupingBy(XpackSysAuthDetailDTO::getAuthSource));
            for (DatasetSharePo item : list) {
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
