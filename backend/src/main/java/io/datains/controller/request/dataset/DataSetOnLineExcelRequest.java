package io.datains.controller.request.dataset;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.multipart.MultipartFile;

/**
 * DataSetOnLineExcelRequest
 *
 * @author zhangzihang
 * @since 2025-06-13 13:15
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class DataSetOnLineExcelRequest extends DataSetTableRequest {

    private MultipartFile file;
}
