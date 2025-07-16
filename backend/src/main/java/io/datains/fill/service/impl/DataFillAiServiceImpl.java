package io.datains.fill.service.impl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.alibaba.excel.EasyExcel;
import io.datains.commons.utils.LogUtil;
import io.datains.fill.service.DataFillAiService;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
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
    @Value("${ai.url}")
    private String aiUrl;
    @Value("${ai.enable}")
    private String aiEnable;

    @Override
    public void excelUploadAiHandle(MultipartFile file, HttpServletResponse response) throws IOException {
        // 保存原始文件名
        String filename = file.getOriginalFilename();
        String originalFilename = filename == null ? "文件" : filename.substring(0, filename.lastIndexOf("."));
        //获取文件类型
        String type = getFileType(file);
        // 转发文件到AI服务器并获取处理结果
        String processedFileContent = aiHandle(file, type);
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
        for (String headItem : head) {
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

    private String aiHandle(MultipartFile file, String type) throws IOException {
        // 1. 构建MultipartBody
        HttpResponse response = HttpRequest.post(aiUrl)
                .header("Content-Type", "multipart/form-data")
                .form("file", file.getBytes(), file.getOriginalFilename())
                .form("fileType", type)
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

    private String getFileType(MultipartFile file) throws IOException {
        String type = FileUtil.extName(file.getOriginalFilename());
        if (type == null) {
            throw new RuntimeException("不支持的文件类型");
        }
        switch (type) {
            case "xls":
            case "xlsx":
            case "csv":
                return "1";
            case "pdf":
                return "3";
            case "doc":
            case "docx":
                return "4";
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
                return "2";
            default:
                throw new RuntimeException("不支持的文件类型");
        }
    }

    @Override
    public void excelUploadAiHandle2(MultipartFile file, HttpServletResponse response) throws IOException {
        // 保存原始文件名
        String filename = file.getOriginalFilename();
        String originalFilename = filename == null ? "文件" : filename.substring(0, filename.lastIndexOf("."));
        if (!"true".equals(aiEnable)) {
            //ai未开启，直接返回原文件
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setCharacterEncoding("utf-8");
            // 这里URLEncoder.encode可以防止中文乱码
            String fileName = URLEncoder.encode(originalFilename, "UTF-8").replaceAll("\\+", "%20");
            response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
            // 将接口返回的文件流写入响应
            throw new RuntimeException("ai解析失败xxxxxxxxxxxxxx");
//            IoUtil.write(response.getOutputStream(), true, file.getBytes());

        }else {
            //获取文件类型
            String type = getFileType(file);
            // 1. 构建MultipartBody
            HttpResponse apiResponse = HttpRequest.post(aiUrl)
                    .header("Content-Type", "multipart/form-data")
                    .form("file", file.getBytes(), file.getOriginalFilename())
                    .form("fileType", type)
                    .execute();
            // 3. 处理响应
            if (apiResponse.isOk()) {
                byte[] fileBytes = apiResponse.bodyBytes();
                response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                response.setCharacterEncoding("utf-8");
                // 这里URLEncoder.encode可以防止中文乱码
                String fileName = URLEncoder.encode(originalFilename, "UTF-8").replaceAll("\\+", "%20");
                response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
                // 将接口返回的文件流写入响应
                IoUtil.write(response.getOutputStream(), true, fileBytes);
            } else {
                LogUtil.error(apiResponse.body());
                throw new RuntimeException(apiResponse.body());
            }
        }
    }

    private byte[] toXlsx(byte[] fileBytes) {
        try (ByteArrayInputStream bis = new ByteArrayInputStream(fileBytes);
             HSSFWorkbook oldWorkbook = new HSSFWorkbook(bis);
             XSSFWorkbook newWorkbook = new XSSFWorkbook();
             ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            for (int i = 0; i < oldWorkbook.getNumberOfSheets(); i++) {
                HSSFSheet sheet = oldWorkbook.getSheetAt(i);
                newWorkbook.createSheet(sheet.getSheetName());
                for (int j = 0; j < sheet.getPhysicalNumberOfRows(); j++) {
                    HSSFRow row = sheet.getRow(j);
                    if (row == null) {
                        continue;
                    }
                    XSSFRow newRow = newWorkbook.getSheet(sheet.getSheetName()).createRow(j);
                    for (int k = 0; k < row.getPhysicalNumberOfCells(); k++) {
                        HSSFCell cell = row.getCell(k);
                        if (cell == null) {
                            continue;
                        }
                        XSSFCell newCell = newRow.createCell(k);
                        newCell.setCellValue(cell.getStringCellValue());
                    }
                }
            }
            newWorkbook.write(bos);
            return bos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

