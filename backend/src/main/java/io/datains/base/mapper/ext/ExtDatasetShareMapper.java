package io.datains.base.mapper.ext;

import io.datains.base.domain.DatasetShare;
import io.datains.controller.request.dataset.DatasetShareRemoveRequest;
import io.datains.controller.request.dataset.DatasetShareSearchRequest;
import io.datains.dto.dataset.DatasetShareOutDTO;
import io.datains.dto.dataset.DatasetSharePo;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ExtDatasetShareMapper {

    int batchInsert(@Param("shares") List<DatasetShare> shares, @Param("userName") String userName);

    int batchDelete(@Param("shareIds") List<Long> shareIds);

    List<DatasetSharePo> query(Map<String, Object> param);

    List<DatasetSharePo> queryOut(String userName);

    List<DatasetShare> queryWithResource(DatasetShareSearchRequest request);

    DatasetShare queryByShareId(@Param("shareId") String shareId);

    List<DatasetShare> queryByDatasetId(@Param("datasetId") String datasetId);

    List<DatasetShare> queryByTarget(@Param("targetId") Long targetId, @Param("targetType") Integer targetType);

    List<DatasetShareOutDTO> queryTargets(@Param("datasetId") String datasetId, @Param("userName") String userName);

    void removeShares(@Param("request") DatasetShareRemoveRequest request);

    List<Long> queryUserIdWithRoleIds(Map<String, List<Long>> param);

    List<Long> queryUserIdWithDeptIds(Map<String, List<Long>> param);

    int deleteById(@Param("datasetId") String datasetId, @Param("type") Integer type);
}
