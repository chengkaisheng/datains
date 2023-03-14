package io.datains.service.sys;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:18
 * @Description
 */

import java.util.List;

import io.datains.base.domain.ThemeDto;
import io.datains.base.domain.ThemeItem;
import io.datains.base.domain.ThemeRequest;
import org.springframework.web.multipart.MultipartFile;

public interface ThemeXpackService  {
    public abstract List<ThemeDto> themes();

    public abstract void save(ThemeRequest paramThemeRequest, MultipartFile paramMultipartFile);

    public abstract List<ThemeItem> queryItems(int paramInt);

    public abstract void deleteTheme(int paramInt);
}