package io.datains.fill.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import io.datains.commons.utils.PageUtils;
import io.datains.commons.utils.Pager;
import io.datains.fill.controller.vo.FillFormDataCreateReqVo;
import io.datains.fill.controller.vo.FillFormInfoCreateReqVo;
import io.datains.fill.controller.vo.FillFormInfoReqVo;
import io.datains.fill.controller.vo.FillFormInfoVo;
import io.datains.fill.entry.FillFormData;
import io.datains.fill.entry.FillFormInfo;
import io.datains.fill.entry.FillFormTemplate;
import io.datains.fill.service.FillFormInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * FillFormInfoController
 *
 * @author zhangzihang
 * @since 2025-02-24 17:08
 */
@Api(tags = "数据填报")
@RestController
@RequestMapping("fill")
public class FillFormInfoController {
    @Resource
    private FillFormInfoService fillFormInfoService;

    @ApiOperation("查询数据填报信息")
    @PostMapping("/select/{goPage}/{pageSize}")
    public Pager<List<FillFormInfoVo>> select(@PathVariable int goPage, @PathVariable int pageSize,
                                              @RequestBody FillFormInfoReqVo request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        return PageUtils.setPageInfo(page, fillFormInfoService.select(request));
    }

    @ApiOperation("新增数据填报信息")
    @PostMapping("/insert")
    @Transactional
    public FillFormInfo insert(@RequestBody FillFormInfoCreateReqVo request) {
        return this.fillFormInfoService.insert(request);
    }

    @ApiOperation("更新数据填报信息")
    @PostMapping("/update")
    @Transactional
    public void update(@RequestBody FillFormInfo request) {
        this.fillFormInfoService.update(request);
    }

    @ApiOperation("删除数据填报信息")
    @PostMapping("/delete/{id}")
    @Transactional
    public void delete(@PathVariable Long id) {
        this.fillFormInfoService.delete(id);
    }

    @ApiOperation("保存表单数据")
    @PostMapping("/saveFormData")
    @Transactional
    public void saveFormDate(@RequestBody FillFormDataCreateReqVo formData) {
        this.fillFormInfoService.saveFormData(formData);
    }

    @ApiOperation("获取表单数据")
    @PostMapping("/getFormData/{id}")
    @Transactional
    public FillFormData getFormData(@PathVariable Long id) {
        return this.fillFormInfoService.getFormData(id);
    }

    @ApiOperation("获取表单模版数据")
    @PostMapping("/getFormTemplate/{id}")
    @Transactional
    public FillFormTemplate getFormTemplate(@PathVariable Long id) {
        return this.fillFormInfoService.getFormTemplate(id);
    }
}
