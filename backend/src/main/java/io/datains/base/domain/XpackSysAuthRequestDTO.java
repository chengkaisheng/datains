package io.datains.base.domain;

import lombok.Data;

import java.util.List;

/**
 * XpackSysAuthRequestDTO
 *
 * @author zhangzihang
 * @since 2025-02-11 15:30
 */
@Data
public class XpackSysAuthRequestDTO {
    private List<XpackSysAuthRequest> auths;
}
