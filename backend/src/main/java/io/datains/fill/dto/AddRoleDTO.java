package io.datains.fill.dto;

import io.datains.qyy.service.AddRoleService;
import lombok.Data;

import java.util.List;

/**
 * AddRoleDTO
 *
 * @author zhangzihang
 * @since 2025-04-26 20:42
 */
@Data
public class AddRoleDTO {
    private List<AddRoleService.Role> role;
    private String key;
    private String scenId;
    private String url;
}
