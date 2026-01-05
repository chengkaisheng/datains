package io.datains.fill.controller;

import com.alibaba.excel.EasyExcel;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.gson.Gson;
import io.datains.commons.utils.AuthUtils;
import io.datains.commons.utils.PageUtils;
import io.datains.commons.utils.Pager;
import io.datains.controller.ResultHolder;
import io.datains.fill.dto.*;
import io.datains.fill.entry.DataFillData;
import io.datains.fill.entry.DataFillFormWithBLOBs;
import io.datains.fill.request.*;
import io.datains.fill.response.DataFillFormTableDataResponse;
import io.datains.fill.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.pentaho.di.core.util.UUIDUtil;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.*;

@RequestMapping("dataFilling")
@RestController
@Api("表单管理")
public class DataFillController {

    @Resource
    private DataFillService dataFillService;
    @Resource
    private DataFillLogService dataFillLogService;
    @Resource
    private DataFillTaskService dataFillTaskService;
    @Resource
    private DataFillDataService dataFillDataService;

    @ApiOperation("查询")
    @PostMapping("/form/selectForm/{goPage}/{pageSize}")
    public Pager<List<DataFillFormDTO>> selectForm(@PathVariable int goPage, @PathVariable int pageSize,
                                                   @RequestBody DataFillFormRequest request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        return PageUtils.setPageInfo(page, dataFillService.selectForm(request));
    }

    @ApiOperation("创建")
    @PostMapping("/form/save")
    public ResultHolder saveForm(@RequestBody DataFillFormWithBLOBs dataFillForm) throws Exception {
        if (dataFillForm.getName() == null || dataFillForm.getName().isEmpty()) {
            return ResultHolder.error("表单名称不能为空");
        }
        if ("selfReport".equals(dataFillForm.getNodeType()) || "selfReport_template".equals(dataFillForm.getNodeType())) {
            return dataFillService.saveCustomForm(dataFillForm);
        } else if ("selfReport_file".equals(dataFillForm.getNodeType())) {
            return dataFillService.saveCustomFile(dataFillForm);
        } else {
            dataFillForm.setTableName(UUIDUtil.getUUID().toString());
            dataFillForm.setDatasource("default-built-in");
            return dataFillService.saveForm(dataFillForm);
        }
    }

    @ApiOperation("更新名称")
    @PostMapping("/form/updateName")
    public ResultHolder updateFormName(@RequestBody DataFillFormWithBLOBs dataFillForm) throws Exception {
        return dataFillService.updateForm(dataFillForm, null);
    }

    @ApiOperation("更新")
    @PostMapping("/form/update")
    public ResultHolder updateForm(@RequestBody DataFillFormWithBLOBs dataFillForm) throws Exception {
        return dataFillService.updateForm(dataFillForm);
    }

    @ApiOperation("更新状态")
    @GetMapping("/form/updateStatus")
    public void updateFormStatus(@RequestParam("id") String id, @RequestParam("status") Integer status) throws Exception {
        dataFillService.updateFormStatus(id, status);
    }

    @ApiOperation("移动")
    @PostMapping("/form/move")
    public ResultHolder moveForm(@RequestBody DataFillFormWithBLOBs dataFillForm) throws Exception {
        return dataFillService.updateForm(dataFillForm, "move");
    }

    @PostMapping("/manage/form/{id}")
    public DataFillFormDTO getWithPrivileges(@PathVariable String id) throws Exception {
        return dataFillService.getWithPrivileges(id);
    }

    @ApiOperation("获取详情")
    @PostMapping("/form/get/{id}")
    public DataFillFormWithBLOBs get(@PathVariable String id) throws Exception {
        return dataFillService.get(id);
    }

    @ApiOperation("删除")
    @PostMapping("/form/delete/{id}")
    public void deleteForm(@PathVariable String id) throws Exception {
        dataFillService.deleteForm(id);
    }

    @ApiOperation("查询树")
    @PostMapping("/form/tree")
    public List<DataFillFormDTO> tree(@RequestBody DataFillFormRequest request) {
        return dataFillService.tree(request);
    }

    @ApiOperation("获取表单填报数据")
    @PostMapping("/form/{id}/tableData")
    public DataFillFormTableDataResponse tableData(@PathVariable String id, @RequestBody DataFillFormTableDataRequest request) throws Exception {
        request.setId(id);
        return dataFillDataService.listData(request);
    }

    @ApiOperation("获取字段")
    @PostMapping("/form/fields/{id}")
    public List<ExtTableField> listFields(@PathVariable String id) throws Exception {
        return dataFillService.listFields(id);
    }

    @ApiOperation("删除数据")
    @PostMapping("/form/{formId}/delete/{id}")
    public void deleteRowData(@PathVariable String formId, @PathVariable String id) throws Exception {
        dataFillDataService.deleteRowData(formId, id);
    }

    @ApiOperation("新增数据")
    @PostMapping("/form/{formId}/rowData/save")
    public String newRowData(@PathVariable String formId, @RequestBody Map<String, Object> data) throws Exception {
        return dataFillDataService.updateOrInsertRowData(formId, Collections.singletonList(new RowDataDatum().setData(data))).get(0);
    }

    @ApiOperation("新增数据")
    @PostMapping("/form/{formId}/rowData/save/{id}")
    public String updateRowData(@PathVariable String formId, @PathVariable String id, @RequestBody Map<String, Object> data) throws Exception {
        return dataFillDataService.updateOrInsertRowData(formId, Collections.singletonList(new RowDataDatum().setId(id).setData(data))).get(0);
    }


    @ApiOperation("查询日志")
    @PostMapping("/form/{formId}/commitLog/{goPage}/{pageSize}")
    public Pager<List<DataFillCommitLogDTO>> commitLogs(@PathVariable String formId, @PathVariable int goPage, @PathVariable int pageSize, @RequestBody DataFillCommitLogSearchRequest request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        List<DataFillCommitLogDTO> logs = dataFillLogService.commitLogs(formId, request);

        return PageUtils.setPageInfo(page, logs);
    }

    @ApiOperation("查询任务")
    @PostMapping("/form/{formId}/task/{goPage}/{pageSize}")
    public Pager<List<DataFillTaskDTO>> tasks(@PathVariable String formId, @PathVariable int goPage, @PathVariable int pageSize, @RequestBody DataFillTaskSearchRequest request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        List<DataFillTaskDTO> tasks = dataFillTaskService.tasks(formId, request);

        return PageUtils.setPageInfo(page, tasks);
    }

    @ApiOperation("保存任务")
    @PostMapping("/form/{formId}/task/save")
    public void saveTask(@PathVariable String formId, @RequestBody DataFillTaskSearchRequest request) throws Exception {

        dataFillTaskService.saveTask(formId, request);

    }

    @ApiOperation("删除任务")
    @PostMapping("/form/task/{taskId}/delete")
    public void deleteTask(@PathVariable Long taskId) {

        dataFillTaskService.deleteTask(taskId);

    }

    @ApiOperation("开启任务")
    @PostMapping("/form/task/{taskId}/enable")
    public void enableTask(@PathVariable Long taskId) throws Exception {

        dataFillTaskService.enableTask(taskId);

    }

    @ApiOperation("关闭任务")
    @PostMapping("/form/task/{taskId}/disable")
    public void disableTask(@PathVariable Long taskId) throws Exception {

        dataFillTaskService.disableTask(taskId);

    }

    @ApiOperation("查询我的任务")
    @PostMapping("/myTask/{type}/{goPage}/{pageSize}")
    public Pager<List<DataFillUserTaskDTO>> userTasks(@PathVariable String type, @PathVariable int goPage, @PathVariable int pageSize, @RequestBody DataFillUserTaskSearchRequest request) {
        Long userId = AuthUtils.getUser().getUserId();
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        List<DataFillUserTaskDTO> tasks = dataFillTaskService.userTasks(userId, type, request);

        return PageUtils.setPageInfo(page, tasks);
    }


    @ApiOperation("我的任务")
    @PostMapping("/myTask/fill/{taskId}")
    public void userFillData(@PathVariable String taskId, @RequestBody List<Map<String, Object>> data) throws Exception {
        dataFillService.fillFormData(taskId, data);
    }

    @ApiOperation("下载模版")
    @PostMapping("/form/{formId}/excel/template")
    public void getExcelTemplate(@PathVariable String formId, HttpServletResponse response) throws Exception {
        try {
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setCharacterEncoding("utf-8");
            // 这里URLEncoder.encode可以防止中文乱码
            String fileName = URLEncoder.encode("template", "UTF-8").replaceAll("\\+", "%20");
            response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
            // 这里需要设置不关闭流
            EasyExcel.write(response.getOutputStream())
                    .head(dataFillService.getExcelHead(formId))
                    .automaticMergeHead(false)
                    .inMemory(true)
                    .registerWriteHandler(dataFillService.getCommentWriteHandler(formId))
                    .autoCloseStream(Boolean.FALSE)
                    .sheet("模板")
                    .doWrite(new ArrayList<>());
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

    @ApiOperation("导出表单数据")
    @GetMapping("/form/{formId}/excel/exportExcelData")
    public void exportExcelData(@PathVariable String formId, @RequestParam("password") String password, HttpServletResponse response) throws Exception {
        dataFillService.getExcelData(formId, password, response);
    }

    @ApiOperation("导入表单数据")
    @PostMapping("/form/{formId}/excel/upload")
    public void excelUpload(@RequestParam("file") MultipartFile file, @PathVariable String formId) throws Exception {
        String filename = file.getOriginalFilename();
        dataFillDataService.importExcelData(file, formId);
    }

    @ApiOperation("导入表单数据")
    @PostMapping("/form/{optionDatasource}/options")
    public List<ExtTableField.Option> listColumnData(@PathVariable String optionDatasource, @RequestBody DatasourceOptionsRequest request) throws Exception {
        return dataFillDataService.listColumnData(optionDatasource, request.getOptionTable(), request.getOptionColumn(), request.getOptionOrder());
    }

    @ApiOperation("导入表格形成表单")
    @PostMapping("/form/excel/excelUploadToFrom/{pid}")
    public void excelUploadToFrom(@RequestParam("file") MultipartFile file, @PathVariable String pid) throws Exception {
        dataFillService.excelUploadToFrom(file, pid);
    }

    @ApiOperation("保存自主填报文件")
    @PostMapping("/form/saveFormData/{formId}")
    public void saveFormDate(MultipartFile file, @PathVariable String formId) {
        dataFillService.saveFormData(formId, file);
    }

    @ApiOperation("获取自主填报版本文件列表")
    @GetMapping("/form/getFormData/{formId}")
    public List<DataFillData> getFormData(@PathVariable String formId) {
        return dataFillService.getFormData(formId);
    }

    @ApiOperation("导出自主填报某个版本的文件")
    @GetMapping("/form/exportFormDataData/{formId}/{id}")
    public void exportFormDataData(@PathVariable String formId, @PathVariable String id, @RequestParam String password, HttpServletResponse response) {
        dataFillService.exportFormDataData(formId, id, password, response);
    }

    @ApiOperation("获取自主填报某个版本的文件")
    @GetMapping("/form/getFormDataData/{formId}/{id}")
    public void getFormDataData(@PathVariable String formId, @PathVariable String id, HttpServletResponse response) {
        dataFillService.getFormDataData(formId, id, response);
    }

    @ApiOperation("获取自主填报模版")
    @GetMapping("/form/getSelfReportTemplate/{formId}")
    public void getSelfReportTemplate(@PathVariable String formId, HttpServletResponse response) {
        dataFillService.getSelfReportTemplate(formId, response);
    }

    @ApiOperation("批量导出文件夹下所有填报")
    @GetMapping("/form/exportBatch/{pid}")
    public void exportBatch(@PathVariable String pid, @RequestParam String taskId, @RequestParam String password, HttpServletResponse response) {
        dataFillService.exportBatch(taskId, pid, password, response);
    }
}
