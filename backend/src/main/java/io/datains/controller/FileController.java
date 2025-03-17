package io.datains.controller;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.io.resource.ResourceUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * FileController
 *
 * @author zhangzihang
 * @since 2025-03-14 16:13
 */
@RestController
@RequestMapping("file")
public class FileController {
    @GetMapping("/download/{name}")
    public void downloadFile(@PathVariable("name") String name, HttpServletResponse response) {
        InputStream inputStream = null;
        try {
            inputStream = ResourceUtil.getStream("file/" + name);
            response.setContentType("application/octet-stream");
            String encodedFileName = URLEncoder.encode(name, StandardCharsets.UTF_8.name())
                    .replace("+", "%20");
            response.setHeader("Content-Disposition",
                    "attachment; filename=\"" + encodedFileName + "\"; filename*=utf-8''" + encodedFileName);

            // 3. 将输入流拷贝到响应输出流
            OutputStream outputStream = response.getOutputStream();
            IoUtil.copy(inputStream, outputStream);

            // 4. 刷新并关闭流
            outputStream.flush();
        } catch (Exception e) {
            e.printStackTrace();
            // 重置response
            response.reset();
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            throw new RuntimeException(e.getMessage());
        }finally {
            IoUtil.close(inputStream);
        }
    }
}
