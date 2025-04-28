package io.datains.fill.controller;

import io.datains.fill.dto.AddRoleDTO;
import io.datains.fill.service.DataFillAiService;
import io.datains.qyy.service.AddRoleService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

/**
 * DataFillAiController
 *
 * @author zhangzihang
 * @since 2025-03-05 15:43
 */
@ApiIgnore
@RequestMapping("/dataFillingAi")
@RestController
public class DataFillAiController {
    @Resource
    private DataFillAiService dataFillAiService;
    @Resource
    private AddRoleService addRoleService;

    @ApiIgnore
    @PostMapping("/form/excel/excelUploadAiHandle")
    public void excelUploadAiHandle(@RequestParam("file") MultipartFile file, HttpServletResponse response) throws Exception {
        try {
            this.dataFillAiService.excelUploadAiHandle2(file, response);
        } catch (Exception e) {
            e.printStackTrace();
            // 重置response
            response.reset();
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            throw new RuntimeException(e.getMessage());
        }
    }
    @PostMapping("/addRole")
    public void addRole(@RequestBody AddRoleDTO roleDTO){
        this.addRoleService.addRoles(roleDTO.getRole(), roleDTO.getKey(), roleDTO.getScenId(), roleDTO.getUrl());
    }
}
