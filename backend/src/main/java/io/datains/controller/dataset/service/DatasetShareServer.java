package io.datains.controller.dataset.service;

import io.datains.base.domain.DatasetShare;
import io.datains.controller.dataset.api.DatasetShareApi;
import io.datains.controller.request.dataset.DatasetShareFineDto;
import io.datains.controller.request.dataset.DatasetShareRemoveRequest;
import io.datains.controller.request.dataset.DatasetShareSearchRequest;
import io.datains.dto.dataset.DatasetShareDto;
import io.datains.dto.dataset.DatasetShareOutDTO;
import io.datains.dto.dataset.DatasetSharePo;
import io.datains.service.dataset.DatasetShareService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class DatasetShareServer implements DatasetShareApi {

    @Resource
    private DatasetShareService datasetShareService;

    @Override
    public List<DatasetShareDto> treeList() {
        return datasetShareService.queryTree();
    }

    @Override
    public List<DatasetSharePo> shareOut() {
        return datasetShareService.queryShareOut();
    }

    @Override
    public List<DatasetShare> queryWithResourceId(@RequestBody DatasetShareSearchRequest request) {
        return datasetShareService.queryWithResource(request);
    }

    @Override
    public List<DatasetShareOutDTO> queryTargets(@PathVariable("datasetId") String datasetId) {
        return datasetShareService.queryTargets(datasetId);
    }

    @Override
    public void fineSave(@RequestBody DatasetShareFineDto datasetShareFineDto) {
        datasetShareService.fineSave(datasetShareFineDto);
    }

    @Override
    public void removeShares(@RequestBody DatasetShareRemoveRequest request) {
        datasetShareService.removeShares(request);
    }
}
