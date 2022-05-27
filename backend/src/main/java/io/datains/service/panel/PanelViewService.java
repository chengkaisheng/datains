package io.datains.service.panel;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import io.datains.base.domain.PanelGroupWithBLOBs;
import io.datains.base.domain.PanelView;
import io.datains.base.domain.PanelViewExample;
import io.datains.base.mapper.PanelViewMapper;
import io.datains.base.mapper.ext.ExtChartViewMapper;
import io.datains.base.mapper.ext.ExtPanelGroupMapper;
import io.datains.base.mapper.ext.ExtPanelViewMapper;
import io.datains.commons.utils.AuthUtils;
import io.datains.commons.utils.BeanUtils;
import io.datains.dto.panel.PanelViewDto;
import io.datains.dto.panel.PanelViewTableDTO;
import io.datains.dto.panel.po.PanelViewInsertDTO;
import io.datains.dto.panel.po.PanelViewPo;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PanelViewService {

    @Autowired(required = false)
    private ExtPanelViewMapper extPanelViewMapper;

    @Resource
    private PanelViewMapper panelViewMapper;

    @Resource
    private ExtChartViewMapper extChartViewMapper;

    private ExtPanelGroupMapper extPanelGroupMapper;

    private final static String SCENE_TYPE = "scene";

    public List<PanelViewDto> groups() {
        return extPanelViewMapper.groups(String.valueOf(AuthUtils.getUser().getUserId()));
    }

    public List<PanelViewDto> views() {
        return extPanelViewMapper.views(String.valueOf(AuthUtils.getUser().getUserId()));
    }

    public List<PanelViewDto> buildTree(List<PanelViewPo> groups, List<PanelViewPo> views) {
        if (CollectionUtils.isEmpty(groups) || CollectionUtils.isEmpty(views)) return null;
        Map<String, List<PanelViewPo>> viewsMap = views.stream().collect(Collectors.groupingBy(PanelViewPo::getPid));
        List<PanelViewDto> dtos = groups.stream().map(group -> BeanUtils.copyBean(new PanelViewDto(), group)).collect(Collectors.toList());
        List<PanelViewDto> roots = new ArrayList<>();
        dtos.forEach(group -> {
            // 查找跟节点
            if (ObjectUtils.isEmpty(group.getPid())) {
                roots.add(group);
            }
            // 查找当前节点的子节点
            // 当前group是场景
            if (StringUtils.equals(group.getType(), SCENE_TYPE)) {
                Optional.ofNullable(viewsMap.get(group.getId())).ifPresent(lists -> lists.forEach(view -> {
                    PanelViewDto dto = BeanUtils.copyBean(new PanelViewDto(), view);
                    group.addChild(dto);
                }));
                return;
            }
            // 当前group是分组
            dtos.forEach(item -> {
                if (StringUtils.equals(item.getPid(), group.getId())) {
                    group.addChild(item);
                }
            });
        });
        // 最后 没有孩子的老东西淘汰
        return roots.stream().filter(item -> CollectionUtils.isNotEmpty(item.getChildren())).collect(Collectors.toList());
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<String> syncPanelViews(PanelGroupWithBLOBs panelGroup) {
        List<String> viewIds = new ArrayList<>();
        Boolean mobileLayout = null;
        String panelId = panelGroup.getId();
        Assert.notNull(panelId, "panelId cannot be null");
        String panelData = panelGroup.getPanelData();
        if (StringUtils.isNotEmpty(panelData)) {
            mobileLayout = false;
            JSONArray dataArray = JSON.parseArray(panelData);
            List<PanelViewInsertDTO> panelViewInsertDTOList = new ArrayList<>();
            for (int i = 0; i < dataArray.size(); i++) {
                JSONObject jsonObject = dataArray.getJSONObject(i);
                if ("view".equals(jsonObject.getString("type"))) {
                    panelViewInsertDTOList.add(new PanelViewInsertDTO(jsonObject.getJSONObject("propValue").getString("viewId"), panelId));
                }
                // 选项卡内部视图
                if ("de-tabs".equals(jsonObject.getString("type"))) {
                    JSONObject options = jsonObject.getJSONObject("options");
                    if (options != null) {
                        JSONArray tabList = options.getJSONArray("tabList");
                        if (CollectionUtils.isNotEmpty(tabList)) {
                            for (int y = 0; y < tabList.size(); y++) {
                                if(tabList.getJSONObject(y).getString("content").indexOf("viewId")>-1){
                                    panelViewInsertDTOList.add(new PanelViewInsertDTO(tabList.getJSONObject(y).getJSONObject("content").getJSONObject("propValue").getString("viewId"), panelId,"tab"));
                                }
                            }
                        }
                    }
                }
                if (jsonObject.getBoolean("mobileSelected") != null && jsonObject.getBoolean("mobileSelected")) {
                    mobileLayout = true;
                }
            }
            extPanelViewMapper.deleteWithPanelId(panelId);
            if (CollectionUtils.isNotEmpty(panelViewInsertDTOList)) {
                extPanelViewMapper.savePanelView(panelViewInsertDTOList);
                //将视图从cache表中更新到正式表中
                viewIds = panelViewInsertDTOList.stream().map(panelView ->panelView.getChartViewId()).collect(Collectors.toList());
                extChartViewMapper.copyCacheToView(viewIds);
            }
            extChartViewMapper.deleteCacheWithPanel(viewIds,panelId);
            extChartViewMapper.deleteNoUseView(viewIds,panelId);
        }
        panelGroup.setMobileLayout(mobileLayout);
        return viewIds;
    }

    public List<PanelViewTableDTO> detailList(String panelId) {
        return extPanelViewMapper.getPanelViewDetails(panelId);
    }

    public List<PanelView> findPanelViews(String copyId){
        PanelViewExample panelViewExample = new PanelViewExample();
        panelViewExample.createCriteria().andCopyIdEqualTo(copyId);
        return panelViewMapper.selectByExample(panelViewExample);
    }

    public PanelView findByViewId(String viewId){
        PanelViewExample panelViewExample = new PanelViewExample();
        panelViewExample.createCriteria().andChartViewIdEqualTo(viewId);
        List<PanelView>  result =  panelViewMapper.selectByExample(panelViewExample);
        if(CollectionUtils.isNotEmpty(result)){
            return result.get(0);
        }else{
            return null;
        }
    }
}