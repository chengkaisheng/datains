package io.datains.fill.service.impl;

import io.datains.commons.utils.AuthUtils;
import io.datains.commons.utils.TreeUtils;
import io.datains.fill.controller.vo.FillFormDataCreateReqVo;
import io.datains.fill.controller.vo.FillFormInfoCreateReqVo;
import io.datains.fill.controller.vo.FillFormInfoReqVo;
import io.datains.fill.controller.vo.FillFormInfoVo;
import io.datains.fill.entry.FillFormData;
import io.datains.fill.entry.FillFormInfo;
import io.datains.fill.mapper.FillFormDataMapper;
import io.datains.fill.mapper.FillFormInfoMapper;
import io.datains.fill.service.FillFormInfoService;
import org.pentaho.di.core.util.UUIDUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

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

    @Override
    @Transactional
    public FillFormInfo insert(FillFormInfoCreateReqVo fillFormInfo) {
        Long userId = AuthUtils.getUser().getUserId();
        fillFormInfo.setId(UUIDUtil.getUUID().toString());
        fillFormInfo.setCreator(userId);
        fillFormInfo.setUpdater(userId);
        //创建表单信息
        this.infoMapper.insert(fillFormInfo);
        if ("form".equals(fillFormInfo.getNodeType())) {
            //创建表单数据
            FillFormDataCreateReqVo saveFormData = new FillFormDataCreateReqVo();
            saveFormData.setFormId(fillFormInfo.getId());
            saveFormData.setFormData(fillFormInfo.getFormData());
            this.saveFormData(saveFormData);
        }
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
    public void delete(String id) {
        //查出所有的表单信息id，即包含父节点和子节点的id
        List<String> ids = findAllChildIds(id);
        //删除表单对应的数据
        this.dataMapper.deleteByFormIds(ids);
        //删除表单信息
        this.infoMapper.deleteByIds(ids);
    }

    private List<String> findAllChildIds(String pid) {
        Set<String> allIds = new HashSet<>();
        Queue<String> queue = new LinkedList<>();
        queue.add(pid);
        allIds.add(pid);

        while (!queue.isEmpty()) {
            List<String> parentIds = new ArrayList<>(queue);
            queue.clear();
            List<String> childrenIds = infoMapper.findChildrenIds(parentIds);
            for (String childId : childrenIds) {
                if (!allIds.contains(childId)) { // 防止重复处理q
                    allIds.add(childId);
                    queue.add(childId);
                }
            }
        }
        if (!allIds.isEmpty()) {
            return new ArrayList<>(allIds);
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<FillFormInfoVo> tree(FillFormInfoReqVo request) {
        if (request.getName() == null || request.getName().isEmpty()) {
            return infoMapper.select(request);
        }
        // 1.查询基础匹配节点
        List<FillFormInfoVo> matchedNodes = infoMapper.searchByName(request.getName());
        if (matchedNodes.isEmpty()) return Collections.emptyList();

        // 2.收集所有相关节点ID
        Set<String> allIds = new HashSet<>();
        for (FillFormInfoVo node : matchedNodes) {
            // 2.1 添加当前节点
            allIds.add(node.getId());

            // 2.2 查询父链节点
            List<String> parentIds = infoMapper.getParentChain(node.getId());
            allIds.addAll(parentIds);

            // 2.3 查询所有子节点
            List<String> childrenIds = infoMapper.findAllChildrenIds(node.getId());
            allIds.addAll(childrenIds);
        }

        // 3.返回完整节点数据
        return TreeUtils.mergeTree(infoMapper.getNodesByIds(new ArrayList<>(allIds)));
    }

    @Override
    public List<FillFormInfoVo> selectForm(FillFormInfoReqVo request) {
        return infoMapper.selectForm(request);
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
            fillFormData.setId(UUIDUtil.getUUID().toString());
            fillFormData.setFormData(vo.getFormData());
            fillFormData.setFormId(vo.getFormId());
            fillFormData.setCreator(userId);
            fillFormData.setUpdater(userId);
            this.dataMapper.insert(fillFormData);
        }
    }

    @Override
    public FillFormData getFormData(String formId) {
        return this.dataMapper.getByFormId(formId);
    }
}
