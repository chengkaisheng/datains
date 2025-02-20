package io.datains.dto;

import io.datains.base.domain.XpackSysDept;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * XpackSysDeptDTO
 *
 * @author zhangzihang
 * @since 2025-02-19 13:19
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class XpackSysDeptDTO extends XpackSysDept {
    private Long leaderId;
}
