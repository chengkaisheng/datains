package io.datains.fill.service.impl;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.alibaba.excel.EasyExcel;
import io.datains.commons.utils.LogUtil;
import io.datains.fill.service.DataFillAiService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

/**
 * DataFillAiServiceImpl
 *
 * @author zhangzihang
 * @since 2025-03-05 15:45
 */
@Service
public class DataFillAiServiceImpl implements DataFillAiService {
    @Override
    public void excelUploadAiHandle(MultipartFile file, HttpServletResponse response) throws IOException {
        // 保存原始文件名
        String filename = file.getOriginalFilename();
        String originalFilename = filename == null ? "文件" : filename.substring(0, filename.lastIndexOf("."));

        // 转发文件到AI服务器并获取处理结果
        String processedFileContent = aiHandle(file);
        //确定表头
        JSONArray jsonArray = JSONUtil.parseArray(processedFileContent);
        List<List<String>> headList = new ArrayList<>();
        List<List<String>> dataList = new ArrayList<>();
        // 4. 动态生成表头和数据
        //先确定表头
        List<String> head = new ArrayList<>();
        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            obj.keySet().forEach(key -> {
                if (!head.contains(key)) {
                    head.add(key);
                }
            });
        }
        for (String headItem : head){
            List<String> headColumn = new ArrayList<>();
            headColumn.add(headItem);
            headList.add(headColumn);
        }
        //根据表头填充数据
        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            List<String> s = new ArrayList<>();
            for (String headItem : head) {
                if (obj.containsKey(headItem)) {
                    s.add(obj.getStr(headItem));
                } else {
                    s.add(null);
                }
            }
            dataList.add(s);
        }
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码
        String fileName = URLEncoder.encode(originalFilename, "UTF-8").replaceAll("\\+", "%20");
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
        // 这里需要设置不关闭流
        EasyExcel.write(response.getOutputStream())
                .head(headList)
                .automaticMergeHead(false)
                .inMemory(true)
                .autoCloseStream(Boolean.FALSE)
                .sheet("数据")
                .doWrite(dataList);
    }

    private String aiHandle(MultipartFile file) throws IOException {
        // 1. 构建MultipartBody
        HttpResponse response = HttpRequest.post("http://121.229.107.155:50001/xunfei/analy")
                .header("Content-Type", "multipart/form-data")
                .form("file", file.getBytes(), file.getOriginalFilename())
                .execute();
        // 3. 处理响应
        if (response.isOk()) {
            JSONObject json = JSONUtil.parseObj(response.body());
            if (json.getInt("code") == 200) {
                // 解析data字段中的JSON数组字符串
                return json.getStr("data");
            } else {
                LogUtil.error(response.body());
                throw new RuntimeException("远程服务请求失败");
            }
        } else {
            LogUtil.error(response.body());
            throw new RuntimeException("远程服务请求失败");
        }
    }

    private List<List<String>> generateHead(JSONArray jsonArray) {
        List<List<String>> head = new ArrayList<>();
        if (!jsonArray.isEmpty()) {
            JSONObject firstRow = jsonArray.getJSONObject(0);
            firstRow.keySet().forEach(key -> {
                List<String> headColumn = new ArrayList<>();
                headColumn.add(key);
                head.add(headColumn);
            });
        }
        return head;
    }

    private List<List<Object>> generateData(JSONArray jsonArray) {
        List<List<Object>> dataList = new ArrayList<>();
        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            List<Object> data = new ArrayList<>(obj.values());
            dataList.add(data);
        }
        return dataList;
    }
}
