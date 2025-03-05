package io.datains.fill.controller;

import com.google.gson.Gson;
import io.datains.fill.service.DataFillAiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * DataFillAiController
 *
 * @author zhangzihang
 * @since 2025-03-05 15:43
 */
@ApiIgnore
@RequestMapping("dataFillingAi")
@RestController
public class DataFillAiController {
    @Resource
    private DataFillAiService dataFillAiService;

    @ApiIgnore
    @PostMapping("/form/excel/excelUploadAiHandle")
    public void excelUploadAiHandle(@RequestParam("file") MultipartFile file, HttpServletResponse response) throws Exception {
        try {
            this.dataFillAiService.excelUploadAiHandle(file, response);
        } catch (Exception e) {
            e.printStackTrace();
            // 重置response
            response.reset();
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.setStatus(500);
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("message", e.getMessage());
            response.getWriter().println(new Gson().toJson(map));
        }
    }
}
