package io.datains.dto.authModel;

import lombok.Data;

/**
 * AuthChangeForDeptLeaderDTO
 *
 * @author zhangzihang
 * @since 2025-06-25 16:30
 */
@Data
public class AuthChangeForDeptLeaderDTO {
    /**
     * 权限来源
     */
    private String authSource;
    /**
     * 权限来源类型
     */
    private String authSourceType;
}
