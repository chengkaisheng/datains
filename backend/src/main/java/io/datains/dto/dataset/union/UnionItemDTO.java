package io.datains.dto.dataset.union;

import io.datains.base.domain.DatasetTableField;
import lombok.Data;

/**
 * @Author gin
 * @Date 2021/12/1 3:54 下午
 */
@Data
public class UnionItemDTO {
    private DatasetTableField parentField;
    private DatasetTableField currentField;
}