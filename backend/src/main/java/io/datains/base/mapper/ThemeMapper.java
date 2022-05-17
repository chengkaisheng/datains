package io.datains.base.mapper;

import io.datains.base.domain.ThemeDto;
import io.datains.base.domain.ThemeItem;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:26
 * @Description
 */
public interface ThemeMapper {
    List<ThemeItem> selectItems(int paramInt);

    void activeFirst();

    void deleteTheme(int paramInt);

    List<ThemeDto> selectThemes();

    Integer insertTheme(ThemeDto paramThemeDto);

    void updateTheme(ThemeDto paramThemeDto);

    ThemeDto selectOneTheme(int paramInt);

    void insertItems(@Param("themeId") int paramInt, @Param("themeItems") List<ThemeItem> paramList);

    void resetStatus();

    void deleteItems(int paramInt);
}