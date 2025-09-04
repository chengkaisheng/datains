package io.datains.operLog.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import io.datains.commons.utils.PageUtils;
import io.datains.commons.utils.Pager;
import io.datains.operLog.annotation.Log;
import io.datains.operLog.entity.SysOperLog;
import io.datains.operLog.enums.BusinessType;
import io.datains.operLog.service.SysOperLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 操作日志记录
 *
 * @author engifile
 */
@RestController
@RequestMapping("/monitor/operlog")
public class SysOperlogController {
    @Autowired
    private SysOperLogService operLogService;

    @PostMapping("/list/{goPage}/{pageSize}")
    @Log(title = "操作日志: 查询操作日志列表", businessType = BusinessType.SELECT)
    public Pager<List<SysOperLog>> list(@PathVariable int goPage, @PathVariable int pageSize, @RequestBody SysOperLog operLog) {
        Page<SysOperLog> page = PageHelper.startPage(goPage, pageSize, true);
        List<SysOperLog> list = operLogService.selectOperLogList(operLog);
        return PageUtils.setPageInfo(page, list);
    }

    @Log(title = "操作日志：删除操作日志", businessType = BusinessType.DELETE)
    @DeleteMapping("/{operIds}")
    public void remove(@PathVariable Long[] operIds) {
        operLogService.deleteOperLogByIds(operIds);
    }

    @Log(title = "操作日志：清空操作日志", businessType = BusinessType.CLEAN)
    @DeleteMapping("/clean")
    public void clean() {
        operLogService.cleanOperLog();
    }
}
