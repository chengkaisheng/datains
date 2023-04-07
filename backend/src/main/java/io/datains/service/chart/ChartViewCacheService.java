package io.datains.service.chart;

import io.datains.base.mapper.ext.ExtChartViewMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Author: wangjiahao
 * Date: 2022/4/2
 * Description:
 */
@Service
public class ChartViewCacheService {

    @Resource
    private ExtChartViewMapper extChartViewMapper;


    public void refreshCache(String viewId){
        if(extChartViewMapper.updateToCache(viewId)==0){
            extChartViewMapper.copyToCache(viewId);
        }
    }

}
