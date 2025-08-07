package io.datains.service.wizard;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Author: wangjiahao
 * Date: 2022/1/11
 * Description:
 */
@Service
public class ReptileService {
    String blogUrl = "https://blog.fit2cloud.com/?cat=321";
    //获取最新的前几条数据
    private static int infoCount = 1;

    public List<Map<String, String>> lastActive() {
        List<Map<String, String>> result = new ArrayList<>();
        Map<String, String> infoMap = new HashMap<>();
        infoMap.put("title", "支持移动端展示，数据源新增对DB2的支持，数据可视化分析平台");
        infoMap.put("href", "http://mivicelab.com/");
        infoMap.put("time", "2022年1月10日");
        result.add(infoMap);
        return result;
    }


}
