package io.datains.fill.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import io.datains.commons.utils.PageUtils;
import io.datains.commons.utils.Pager;
import io.datains.fill.dto.DataFillFormLogDTO;
import io.datains.fill.request.DataFillFormLogRequest;
import io.datains.fill.service.DataFillFormLogService;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.util.List;

/**
 * DataFillFormLogContriller
 *
 * @author zhangzihang
 * @since 2025-03-19 10:50
 */
@ApiIgnore
@RequestMapping("dataFillLog")
@RestController
public class DataFillFormLogController {
    @Resource
    private DataFillFormLogService dataFillFormLogService;
    @ApiIgnore
    @PostMapping("/form/select/{goPage}/{pageSize}")
    public Pager<List<DataFillFormLogDTO>> selectForm(@PathVariable int goPage, @PathVariable int pageSize,
                                                      @RequestBody DataFillFormLogRequest request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        return PageUtils.setPageInfo(page, dataFillFormLogService.select(request));
    }
}
