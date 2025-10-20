package io.datains.controller.dataset.api;

import com.github.xiaoymin.knife4j.annotations.ApiSupport;
import io.datains.base.domain.DatasetShare;
import io.datains.controller.request.dataset.DatasetShareFineDto;
import io.datains.controller.request.dataset.DatasetShareRemoveRequest;
import io.datains.controller.request.dataset.DatasetShareSearchRequest;
import io.datains.dto.dataset.DatasetShareDto;
import io.datains.dto.dataset.DatasetShareOutDTO;
import io.datains.dto.dataset.DatasetSharePo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * 分享API
 */
@Api(tags = "数据集：分享管理")
@ApiSupport(order = 180)
@RequestMapping("/api/datasetShare")
public interface DatasetShareApi {

    @ApiOperation("查询分享给我")
    @PostMapping("/treeList")
    List<DatasetShareDto> treeList();

    @ApiOperation("查询我分享的")
    @PostMapping("/shareOut")
    List<DatasetSharePo> shareOut();

    @ApiOperation("根据资源查询分享")
    @PostMapping("/queryWithResourceId")
    List<DatasetShare> queryWithResourceId(DatasetShareSearchRequest request);

    @ApiOperation("查询分享目标")
    @PostMapping("/queryTargets/{datasetId}")
    @ApiImplicitParam(paramType = "path", value = "数据集ID", name = "datasetId", required = true, dataType = "String")
    List<DatasetShareOutDTO> queryTargets(@PathVariable("datasetId") String datasetId);

    @ApiOperation("创建分享")
    @PostMapping("/fineSave")
    void fineSave(DatasetShareFineDto datasetShareFineDto);

    @ApiOperation("删除分享")
    @PostMapping("/removeShares")
    void removeShares(DatasetShareRemoveRequest request);

}
