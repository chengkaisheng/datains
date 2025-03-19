package io.datains.fill.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import io.datains.commons.utils.PageUtils;
import io.datains.commons.utils.Pager;
import io.datains.controller.ResultHolder;
import io.datains.fill.dto.DataFillFormTemplateDTO;
import io.datains.fill.entry.DataFillFormTemplateWithBLOBs;
import io.datains.fill.request.DataFillFormTemplateRequest;
import io.datains.fill.service.DataFillFormTemplateService;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.util.List;

/**
 * DataFillFormTemplateTemplateController
 *
 * @author zhangzihang
 * @since 2025-03-12 17:12
 */
@ApiIgnore
@RequestMapping("dataFillingTemplate")
@RestController
public class DataFillFormTemplateController {
    @Resource
    private DataFillFormTemplateService templateService;

    @ApiIgnore
    @PostMapping("/form/selectForm/{goPage}/{pageSize}")
    public Pager<List<DataFillFormTemplateDTO>> selectForm(@PathVariable int goPage, @PathVariable int pageSize,
                                                           @RequestBody DataFillFormTemplateRequest request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        return PageUtils.setPageInfo(page, templateService.selectFormTemplate(request));
    }

    @ApiIgnore
    @PostMapping("/form/save")
    public ResultHolder saveFormTemplate(@RequestBody DataFillFormTemplateWithBLOBs dataFillFormTemplate) {
        return templateService.saveFormTemplate(dataFillFormTemplate);
    }
    @ApiIgnore
    @PostMapping("/form/updateName")
    public ResultHolder updateFormName(@RequestBody DataFillFormTemplateWithBLOBs dataFillFormTemplate) {
        return templateService.updateFormTemplate(dataFillFormTemplate);
    }
    @ApiIgnore
    @PostMapping("/form/update")
    public ResultHolder updateForm(@RequestBody DataFillFormTemplateWithBLOBs dataFillFormTemplate) {
        return templateService.updateFormTemplate(dataFillFormTemplate);
    }

    @PostMapping("/manage/form/{id}")
    public DataFillFormTemplateDTO getWithPrivileges(@PathVariable String id) {
        return templateService.getWithPrivileges(id);
    }

    @PostMapping("/form/get/{id}")
    public DataFillFormTemplateWithBLOBs get(@PathVariable String id) throws Exception {
        return templateService.getById(id);
    }

    @ApiIgnore
    @PostMapping("/form/delete/{id}")
    public void deleteForm(@PathVariable String id) {
        templateService.deleteFormTemplate(id);
    }

    @ApiOperation("查询树")
    @PostMapping("/form/tree")
    public List<DataFillFormTemplateDTO> tree(@RequestBody DataFillFormTemplateRequest request) {
        return templateService.tree(request);
    }
    @ApiIgnore
    @PostMapping("/form/excel/excelUploadToFrom/{pid}")
    public void excelUploadToFrom(@RequestParam("file") MultipartFile file, @PathVariable String pid) throws Exception {
        templateService.excelUploadToFrom(file, pid);
    }
}
