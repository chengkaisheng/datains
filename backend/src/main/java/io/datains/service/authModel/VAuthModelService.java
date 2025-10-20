package io.datains.service.authModel;

import io.datains.base.domain.DatasetShare;
import io.datains.base.mapper.ext.ExtVAuthModelMapper;
import io.datains.commons.utils.AuthUtils;
import io.datains.commons.utils.TreeUtils;
import io.datains.controller.request.authModel.VAuthModelRequest;
import io.datains.dto.authModel.VAuthModelDTO;
import io.datains.service.dataset.DatasetShareService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Author: wangjiahao
 * Date: 2021/11/24
 * Description:
 */
@Service
public class VAuthModelService {

    @Resource
    private ExtVAuthModelMapper extVAuthModelMapper;
    @Resource
    private DatasetShareService datasetShareService;

    public List<VAuthModelDTO> queryAuthModel(VAuthModelRequest request) {
        request.setUserId(String.valueOf(AuthUtils.getUser().getUserId()));
        List<VAuthModelDTO> result = extVAuthModelMapper.queryAuthModel(request);

        if (request.getPrivileges() != null) {
            result = filterPrivileges(request, result);
        }
        if (request.isClearEmptyDir()) {
            List<VAuthModelDTO> vAuthModelDTOS = TreeUtils.mergeTree(result);
            setAllLeafs(vAuthModelDTOS);
            removeEmptyDir(vAuthModelDTOS);
            return vAuthModelDTOS;
        }
        if ("dataset".equals(request.getModelType())) {
            //进行分享过滤，过滤掉通过分享得来的数据集
            List<DatasetShare> datasetShare = datasetShareService.queryByTarget(AuthUtils.getUser().getUserId(), 0);
            List<VAuthModelDTO> result1 = result.stream().filter(vAuthModelDTO -> {
                for (DatasetShare datasetShare1 : datasetShare) {
                    if (vAuthModelDTO.getId().equals(datasetShare1.getDatasetId())) {
                        return false;
                    }
                }
                return true;
            }).collect(Collectors.toList());
            return TreeUtils.mergeTree(result1, "dataset_list");
        }
        return TreeUtils.mergeTree(result);
    }

    private List<VAuthModelDTO> filterPrivileges(VAuthModelRequest request, List<VAuthModelDTO> result) {
        if (request.getPrivileges() != null) {
            result = result.stream().filter(vAuthModelDTO -> {
                if (vAuthModelDTO.getNodeType().equalsIgnoreCase("spine") || (vAuthModelDTO.getNodeType().equalsIgnoreCase("leaf") && vAuthModelDTO.getPrivileges() != null && vAuthModelDTO.getPrivileges().contains(request.getPrivileges()))) {
                    return true;
                } else {
                    return false;
                }
            }).collect(Collectors.toList());
        }
        return result;
    }

    private void removeEmptyDir(List<VAuthModelDTO> result) {
        if (CollectionUtils.isEmpty(result)) {
            return;
        }
        Iterator iterator = result.listIterator();
        while (iterator.hasNext()) {
            VAuthModelDTO tmp = (VAuthModelDTO) iterator.next();
            if (tmp.getNodeType().equalsIgnoreCase("spine") && tmp.getAllLeafs() == 0) {
                iterator.remove();
            } else {
                removeEmptyDir(tmp.getChildren());
            }
        }
    }

    private void setAllLeafs(List<VAuthModelDTO> result) {
        for (VAuthModelDTO vAuthModelDTO : result) {
            if (CollectionUtils.isEmpty(vAuthModelDTO.getChildren())) {
                vAuthModelDTO.setAllLeafs(0);
                continue;
            }
            long leafs = 0l;
            for (VAuthModelDTO child : vAuthModelDTO.getChildren()) {
                if (child.getNodeType().equalsIgnoreCase("leaf")) {
                    leafs = leafs + 1;
                } else {
                    leafs = +leafs + getLeafs(child);
                }
            }
            vAuthModelDTO.setAllLeafs(leafs);
        }
    }

    private long getLeafs(VAuthModelDTO child) {
        long leafs = 0l;
        if (CollectionUtils.isEmpty(child.getChildren())) {
            child.setAllLeafs(0);
            return leafs;
        }
        for (VAuthModelDTO childChild : child.getChildren()) {
            if (childChild.getNodeType().equalsIgnoreCase("leaf")) {
                leafs = leafs + 1;
            } else {
                leafs = +leafs + getLeafs(childChild);
            }
        }
        child.setAllLeafs(leafs);
        return leafs;
    }
}

