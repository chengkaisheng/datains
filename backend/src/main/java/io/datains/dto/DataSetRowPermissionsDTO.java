package io.datains.dto;

import io.datains.plugins.xpack.auth.dto.request.DatasetRowPermissions;
import lombok.Data;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 15:34
 * @Description
 */
@Data
public class DataSetRowPermissionsDTO extends DatasetRowPermissions {
    private String datasetName;
    private String fieldName;
    private String authTargetName;
    private List<Long> authTargetIds;
}
