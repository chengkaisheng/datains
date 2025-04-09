package io.datains.fill.utils;

import cn.hutool.core.io.IoUtil;
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.ExcelReader;
import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.read.metadata.ReadSheet;
import com.alibaba.excel.write.metadata.WriteSheet;
import io.datains.commons.utils.AuthUtils;
import io.datains.fill.excelHandler.CustomCellWriteWidthConfig;
import io.datains.fill.excelHandler.WaterMarkHandler;
import org.apache.commons.io.IOUtils;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

/**
 * ExcelUtil
 *
 * @author zhangzihang
 * @since 2025-04-09 15:17
 */
public class ExcelUtil {
    public static void addWaterMark(InputStream inputStream, OutputStream outputStream, String password,String waterMark) throws IOException {
        // 缓存流到字节数组
        byte[] excelBytes = IOUtils.toByteArray(inputStream); // 使用 Apache Commons IO 或手动实现

        // 为 Reader 和 Writer 创建独立流
        ByteArrayInputStream readerStream = new ByteArrayInputStream(excelBytes);
        ByteArrayInputStream writerStream = new ByteArrayInputStream(excelBytes);


        // 1. 读取模板文件获取所有Sheet名称
        ExcelReader reader = EasyExcel.read(readerStream).build();
        List<ReadSheet> sheets = reader.excelExecutor().sheetList();

        // 2. 创建ExcelWriter并注册全局处理器
        ExcelWriter excelWriter = EasyExcel.write(outputStream)
                .withTemplate(writerStream)
                .registerWriteHandler(new WaterMarkHandler(AuthUtils.getUser().getNickName())) // 全局水印处理器
                .password(password)
                .inMemory(true)
                .autoCloseStream(Boolean.FALSE)
                .build();

        // 3. 遍历所有Sheet并触发写入
        for (ReadSheet sheet : sheets) {
            WriteSheet writeSheet = EasyExcel.writerSheet(sheet.getSheetName()).build();
            excelWriter.write(null, writeSheet); // 写入空数据，仅触发模板渲染
        }
        excelWriter.finish();
        reader.finish();
    }

    public static void createExcelWithWaterMark(List<List<String>> head, List<List<Object>> data, String password, OutputStream outputStream) {
        EasyExcel.write(outputStream)
                .head(head)
                .automaticMergeHead(false)
                .password(password)
                .inMemory(true)
                .registerWriteHandler(new WaterMarkHandler(AuthUtils.getUser().getNickName()))
                .autoCloseStream(Boolean.FALSE)
                .sheet("数据")
                .registerWriteHandler(new CustomCellWriteWidthConfig())
                .doWrite(data);
    }

    public static void createExcelWithWaterMark(List<List<String>> head, List<List<Object>> data, String password, String fileName, HttpServletResponse response) throws Exception {
        responseHandle(response, fileName);
        EasyExcel.write(response.getOutputStream())
                .head(head)
                .automaticMergeHead(false)
                .password(password)
                .inMemory(true)
                .registerWriteHandler(new WaterMarkHandler(AuthUtils.getUser().getNickName()))
                .autoCloseStream(Boolean.FALSE)
                .sheet("数据")
                .registerWriteHandler(new CustomCellWriteWidthConfig())
                .doWrite(data);
    }

    /**
     * 下载excel文件到前端
     */
    public static void downloadExcel(String fileName, HttpServletResponse response, byte[] content) throws Exception {
        responseHandle(response, fileName);
        // 输出附件
        IoUtil.write(response.getOutputStream(), false, content);
    }

    public static void responseHandle(HttpServletResponse response, String fileName) throws Exception {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码
        fileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
    }
}
