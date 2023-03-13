package io.datains.base.domain;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:19
 * @Description
 */
@Data
public class ThemeDto {
    private Integer id;

    private String name;

    private String imgId;

    private String img;

    private Boolean status;
}
