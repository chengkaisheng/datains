package io.datains.fill.controller;

import io.datains.fill.dto.AddRoleDTO;
import io.datains.fill.service.DataFillAiService;
import io.datains.qyy.service.AddRoleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

/**
 * DataFillAiController
 *
 * @author zhangzihang
 * @since 2025-03-05 15:43
 */
@Api("ai服务")
@RequestMapping("/dataFillingAi")
@RestController
public class DataFillAiController {
    @Resource
    private DataFillAiService dataFillAiService;
    @Resource
    private AddRoleService addRoleService;

    @PostMapping("/form/excel/excelUploadAiHandle")
    @ApiOperation("调用ai识别")
    public void excelUploadAiHandle(@RequestParam("file") MultipartFile file, HttpServletResponse response) throws Exception {
        this.dataFillAiService.excelUploadAiHandle2(file, response);
    }

    @PostMapping("/addRole")
    @ApiOperation("添加轻应用角色")
    public void addRole(@RequestBody AddRoleDTO roleDTO) {
        this.addRoleService.addRoles(roleDTO.getRole(), roleDTO.getKey(), roleDTO.getScenId(), roleDTO.getUrl());
    }
}
