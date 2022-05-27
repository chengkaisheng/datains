package io.datains.dto;

import io.datains.base.domain.SysAuthDetail;
import lombok.Data;

/**
 * Author: wangjiahao
 * Date: 2021-06-03
 * Description:
 */
@Data
public class SysAuthDetailDTO extends SysAuthDetail {
    private String authSource;

    private String authSourceType;

    private String authTarget;

    private String authTargetType;
}