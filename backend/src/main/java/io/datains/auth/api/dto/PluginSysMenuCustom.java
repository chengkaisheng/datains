package io.datains.auth.api.dto;

import io.datains.plugins.common.dto.PluginSysMenu;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * PluginSysMenu
 *
 * @author zhangzihang
 * @since 2025-02-12 17:30
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class PluginSysMenuCustom extends PluginSysMenu {
    private Boolean isPlugin;
}
