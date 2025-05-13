package io.datains.fill.service;

import cn.hutool.core.lang.Assert;
import com.google.gson.Gson;
import io.datains.auth.annotation.DeCleaner;
import io.datains.commons.constants.DePermissionType;
import io.datains.commons.constants.SysAuthConstants;
import io.datains.commons.utils.AuthUtils;
import io.datains.commons.utils.TreeUtils;
import io.datains.controller.ResultHolder;
import io.datains.dto.dataset.ExcelSheetData;
import io.datains.dto.datasource.TableField;
import io.datains.exception.DataInsException;
import io.datains.fill.constants.DataFillConstants;
import io.datains.fill.dto.DataFillFormTemplateDTO;
import io.datains.fill.dto.ExtTableField;
import io.datains.fill.entry.DataFillFormTemplate;
import io.datains.fill.entry.DataFillFormTemplateWithBLOBs;
import io.datains.fill.mapper.DataFillFormTemplateMapper;
import io.datains.fill.mapper.ExtDataFillFormMapper;
import io.datains.fill.request.DataFillFormTemplateRequest;
import io.datains.service.sys.SysAuthService;
import org.pentaho.di.core.util.UUIDUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * DataFillFormTemplateService
 *
 * @author zhangzihang
 * @since 2025-03-12 17:16
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class DataFillFormTemplateService {
    @Resource
    private DataFillFormTemplateMapper dataFillFormTemplateMapper;
    @Resource
    private ExtDataFillFormMapper extDataFillFormMapper;
    @Resource
    private SysAuthService sysAuthService;
    @Resource
    private DataFillService dataFillService;

    private final static Gson gson = new Gson();

    @DeCleaner(value = DePermissionType.DATA_FILL_TEMPLATE, key = "pid")
    public ResultHolder saveFormTemplate(DataFillFormTemplateWithBLOBs dataFillFormTemplate) {
        String uuid = UUIDUtil.getUUID().toString();
        dataFillFormTemplate.setId(uuid);
        dataFillFormTemplate.setCreateBy(AuthUtils.getUser().getUsername());
        dataFillFormTemplate.setUpdateBy(AuthUtils.getUser().getUsername());
        checkName(uuid, dataFillFormTemplate.getName(), dataFillFormTemplate.getPid(), dataFillFormTemplate.getNodeType(), DataFillConstants.OPT_TYPE_INSERT);
        dataFillFormTemplateMapper.insertSelective(dataFillFormTemplate);
        sysAuthService.copyAuth(uuid, SysAuthConstants.AUTH_SOURCE_TYPE_DATA_FILLING_TEMPLATE);
        return ResultHolder.success(uuid);
    }

    @DeCleaner(value = DePermissionType.DATA_FILL_TEMPLATE, key = "pid")
    public ResultHolder updateFormTemplate(DataFillFormTemplateWithBLOBs dataFillFormTemplate) {
        if (!checkPrivileges(dataFillFormTemplate.getId(), "manage")) {
            throw new RuntimeException("没有权限");
        }
        Assert.notNull(dataFillFormTemplate.getId(), "id不能为空");
        checkName(dataFillFormTemplate.getId(), dataFillFormTemplate.getName(), dataFillFormTemplate.getPid(), dataFillFormTemplate.getNodeType(), DataFillConstants.OPT_TYPE_UPDATE);
        dataFillFormTemplate.setUpdateTime(new Date());
        dataFillFormTemplateMapper.updateByPrimaryKeySelective(dataFillFormTemplate);
        return ResultHolder.success(dataFillFormTemplate.getId());
    }

    public DataFillFormTemplateDTO getWithPrivileges(String id) {
        Assert.notNull(id, "id不能为空");
        String userId = String.valueOf(AuthUtils.getUser().getUserId());
        DataFillFormTemplateRequest request = new DataFillFormTemplateRequest();
        request.setUserId(userId);
        request.setId(id);
        List<DataFillFormTemplateDTO> list = dataFillFormTemplateMapper.search(request);
        if (list == null || list.isEmpty()) {
            return null;
        }
        return list.stream().filter(dto -> dto.getId().equals(id)).collect(Collectors.toList()).get(0);
    }

    public DataFillFormTemplateWithBLOBs getById(String id) {
        Assert.notNull(id, "id不能为空");
        return dataFillFormTemplateMapper.selectByPrimaryKey(id);
    }

    private void checkName(String id, String name, String pid, String nodeType, String optType) {
        DataFillFormTemplate dataFillFormTemplate = new DataFillFormTemplate();
        Integer count = 0;
        if (DataFillConstants.OPT_TYPE_INSERT.equalsIgnoreCase(optType)) {
            dataFillFormTemplate.setPid(pid);
            dataFillFormTemplate.setName(name);
            dataFillFormTemplate.setNodeType(nodeType);
            count = this.dataFillFormTemplateMapper.countRepeatName(dataFillFormTemplate);
        } else if (DataFillConstants.OPT_TYPE_UPDATE.equalsIgnoreCase(optType)) {
            dataFillFormTemplate.setPid(pid);
            dataFillFormTemplate.setName(name);
            dataFillFormTemplate.setNodeType(nodeType);
            dataFillFormTemplate.setId(id);
            count = this.dataFillFormTemplateMapper.countRepeatName(dataFillFormTemplate);
        }
        if (count > 0) {
            DataInsException.throwException(DataFillConstants.DATA_FILL_NODE_TYPE_DATA_FILL.equals(nodeType) ? "当前模版名称在该目录下已经存在" : "当前名称在该目录下已经存在");
        }
    }

    private boolean checkPrivileges(String id, String needPrivileges) {
        //先查出权限信息
        DataFillFormTemplateRequest request = new DataFillFormTemplateRequest();
        String userId = String.valueOf(AuthUtils.getUser().getUserId());
        request.setUserId(userId);
        request.setId(id);
        List<DataFillFormTemplateDTO> dataFillForm = this.dataFillFormTemplateMapper.search(request);
        if (dataFillForm.isEmpty()) {
            return false;
        }
        return dataFillForm.get(0).getPrivileges().contains(needPrivileges);
    }

    public List<DataFillFormTemplateDTO> selectFormTemplate(DataFillFormTemplateRequest request) {
        String userId = String.valueOf(AuthUtils.getUser().getUserId());
        request.setUserId(userId);
        return dataFillFormTemplateMapper.selectTemplate(request);
    }

    public void deleteFormTemplate(String id) {
        if (!checkPrivileges(id, "manage")) {
            throw new RuntimeException("没有权限");
        }
        Assert.notNull(id, "id cannot be null");
        String stringStringMap = extDataFillFormMapper.searchChildrenIds(id, SysAuthConstants.AUTH_SOURCE_TYPE_DATA_FILLING_TEMPLATE);
        String[] split = stringStringMap.split(",");
        List<String> ids = new ArrayList<>();
        for (String dsId : split) {
            if (dsId != null) {
                ids.add(dsId);
            }
        }
        if (!ids.isEmpty()) {
            dataFillFormTemplateMapper.deleteByIds(ids);
        }
    }

    public List<DataFillFormTemplateDTO> tree(DataFillFormTemplateRequest request) {
        String userId = String.valueOf(AuthUtils.getUser().getUserId());
        request.setUserId(userId);
        List<DataFillFormTemplateDTO> list = dataFillFormTemplateMapper.search(request);
        return TreeUtils.mergeTree(list);
    }

    public void excelUploadToFrom(MultipartFile file, String pid) throws Exception {
        DataFillFormTemplateWithBLOBs dataFillForm = this.excelToFrom(file, pid);
        this.saveFormTemplate(dataFillForm);
    }

    public DataFillFormTemplateWithBLOBs excelToFrom(MultipartFile file, String pid) throws Exception {
        DataFillFormTemplateWithBLOBs dataFillForm = new DataFillFormTemplateWithBLOBs();
        String filename = file.getOriginalFilename();
        // parse file
        List<ExcelSheetData> excelSheetDataList = dataFillService.parseExcel(filename, file.getInputStream(), true);
        if (excelSheetDataList.isEmpty()) {
            DataInsException.throwException("未解析出表格，请检查表格");
        }
        List<TableField> fields = excelSheetDataList.get(0).getFields();
        if (fields.isEmpty()) {
            DataInsException.throwException("未解析出表格，请检查表格");
        }
        //根据表格构建表单结构
        List<ExtTableField> extFields = new ArrayList<>();
        for (TableField tableField : fields) {
            ExtTableField extTableField = new ExtTableField();
            extTableField.setType("input");
            extTableField.setTypeName("单行输入");
            extTableField.setIcon("icon_single-line_outlined");
            extTableField.setId(UUIDUtil.getUUID().toString());
            extTableField.setSettings(ExtTableField.ExtTableFieldSetting.builder()
                    .name(tableField.getFieldName())
                    .placeholder("")
                    .required(false)
                    .unique(false)
                    .inputType("text")
                    .mapping(ExtTableField.ExtTableFieldMapping.builder()
                            .columnName(UUIDUtil.getUUID().toString())
                            .type(ExtTableField.BaseType.nvarchar)
                            .build())
                    .build());
            extFields.add(extTableField);
        }
        String name = filename.substring(0, filename.lastIndexOf("."));
        dataFillForm.setName(name);
        dataFillForm.setTableName(UUIDUtil.getUUID().toString());
        dataFillForm.setDatasource("default-built-in");
        dataFillForm.setPid(pid);
        dataFillForm.setLevel(1);
        dataFillForm.setForms(gson.toJson(extFields));
        dataFillForm.setCreateIndex(false);
        dataFillForm.setTableIndexes("[]");
        dataFillForm.setCommitNewUpdate(false);
        dataFillForm.setNodeType("form");
        return dataFillForm;
    }

}
