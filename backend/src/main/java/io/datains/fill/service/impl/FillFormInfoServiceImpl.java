package io.datains.fill.service.impl;

import io.datains.auth.api.dto.CurrentUserDto;
import io.datains.commons.utils.AuthUtils;
import io.datains.fill.controller.vo.FillFormDataCreateReqVo;
import io.datains.fill.controller.vo.FillFormInfoReqVo;
import io.datains.fill.controller.vo.FillFormInfoVo;
import io.datains.fill.entry.FillFormData;
import io.datains.fill.entry.FillFormInfo;
import io.datains.fill.entry.FillFormTemplate;
import io.datains.fill.mapper.FillFormDataMapper;
import io.datains.fill.mapper.FillFormInfoMapper;
import io.datains.fill.mapper.FillFormTemplateMapper;
import io.datains.fill.service.FillFormInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * FillFormInfoServiceImpl
 *
 * @author zhangzihang
 * @since 2025-02-24 16:57
 */
@Service
public class FillFormInfoServiceImpl implements FillFormInfoService {
    @Resource
    private FillFormInfoMapper infoMapper;
    @Resource
    private FillFormDataMapper dataMapper;
    @Resource
    private FillFormTemplateMapper templateMapper;

    @Override
    public FillFormInfo insert(FillFormInfo fillFormInfo) {
        Long userId = AuthUtils.getUser().getUserId();
        fillFormInfo.setCreator(userId);
        fillFormInfo.setUpdater(userId);
        //处理版本号
        if (fillFormInfo.getParentId() != null) {
            Integer maxVersion = this.infoMapper.selectMaxVersionByParentId(fillFormInfo.getParentId());
            fillFormInfo.setVersion(maxVersion + 1);
        }
        this.infoMapper.insert(fillFormInfo);
        return fillFormInfo;
    }

    @Override
    public void update(FillFormInfo fillFormInfo) {
        if (fillFormInfo.getId() == null) {
            throw new IllegalArgumentException("id不能为空");
        }
        Long userId = AuthUtils.getUser().getUserId();
        fillFormInfo.setUpdater(userId);
        this.infoMapper.update(fillFormInfo);
    }

    @Override
    public void delete(Long id) {
        Long userId = AuthUtils.getUser().getUserId();
        //查出所有的表单信息id，即包含父节点和子节点的id
        List<Long> ids = infoMapper.selectIdsById(id);
        //删除表单对应的数据
        this.dataMapper.logicalDeleteByFormIds(ids, userId);
        //删除表单信息
        this.infoMapper.logicalDelete(id, userId);
    }

    @Override
    public List<FillFormInfoVo> select(FillFormInfoReqVo request) {
        CurrentUserDto user = AuthUtils.getUser();
        if (!user.getIsAdmin()) {
            request.setUserId(user.getUserId());
        }
        //分页查询父节点
        List<FillFormInfoVo> allNodes = infoMapper.select(request);
        if (allNodes.isEmpty()) {
            return allNodes;
        }
        //查询所有子节点
        List<FillFormInfo> allChildren = infoMapper.selectByParentIds(allNodes.stream().map(FillFormInfo::getId).collect(Collectors.toList()));
        Map<Long, List<FillFormInfo>> childrenMap = allChildren.stream().collect(Collectors.groupingBy(FillFormInfo::getParentId));
        //构建父子关系
        allNodes.forEach(parent -> parent.setChildren(
                childrenMap.getOrDefault(parent.getId(), Collections.emptyList())
                        .stream()
                        //排序
                        .sorted(Comparator.comparing(FillFormInfo::getCreateTime).reversed())
                        .collect(Collectors.toList())));
        return allNodes.stream()
                .sorted(Comparator.comparing(FillFormInfo::getCreateTime).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public void saveFormData(FillFormDataCreateReqVo vo) {
        //先判断是否已经存在数据
        FillFormData fillFormData = this.dataMapper.getByFormId(vo.getFormId());
        Long userId = AuthUtils.getUser().getUserId();
        if (fillFormData != null) {
            fillFormData.setFormData(vo.getFormData());
            fillFormData.setUpdater(userId);
            this.dataMapper.update(fillFormData);
        } else {
            fillFormData = new FillFormData();
            fillFormData.setFormData(vo.getFormData());
            fillFormData.setFormId(vo.getFormId());
            fillFormData.setCreator(userId);
            fillFormData.setUpdater(userId);
            this.dataMapper.insert(fillFormData);
        }
    }

    @Override
    public FillFormData getFormData(Long formId) {
        return this.dataMapper.getByFormId(formId);
    }

    @Override
    public FillFormTemplate getFormTemplate(Long id) {
        return templateMapper.getById(id);
    }
}
