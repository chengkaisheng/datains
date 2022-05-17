package io.datains.base.domain;

import lombok.Data;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:21
 * @Description
 */
@Data
public class ThemeRequest {
    private ThemeDto themeDto;

    private List<ThemeItem> themeItems;
}
