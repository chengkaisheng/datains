package io.datains.plugins.server;

import java.util.List;

import io.datains.base.domain.ThemeDto;
import io.datains.base.domain.ThemeItem;
import io.datains.base.domain.ThemeRequest;
import io.datains.i18n.Translator;
import io.datains.plugins.config.SpringContextUtil;
import io.datains.service.sys.ThemeXpackService;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.datains.commons.exception.DEException;
import io.datains.commons.utils.LogUtil;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@RequestMapping("/plugin/theme")
@RestController
public class ThemeServer {

    @Autowired
    private ThemeXpackService themeXpackService;

    @PostMapping("/themes")
    public List<ThemeDto> themes() {
        return themeXpackService.themes();
    }

    @PostMapping("/items/{themeId}")
    public List<ThemeItem> themeItems(@PathVariable("themeId") int themeId) {
        return themeXpackService.queryItems(themeId);
    }

    @RequiresPermissions("sysparam:read")
    @PostMapping("/save")
    public void save(@RequestPart("request") ThemeRequest request,
            @RequestPart(value = "file", required = false) MultipartFile bodyFile) {
        ThemeXpackService themeXpackService = SpringContextUtil.getBean(ThemeXpackService.class);
        try {
            themeXpackService.save(request, bodyFile);
        } catch (Exception e) {
            LogUtil.error(e.getMessage(), e);
            if (ObjectUtils.isNotEmpty(e.getMessage()) && e.getMessage().indexOf("theme_name_repeat") != -1) {
                DEException.throwException(Translator.get("theme_name_repeat"));
            } else if (ObjectUtils.isNotEmpty(e.getMessage()) && e.getMessage().indexOf("theme_name_empty") != -1) {
                DEException.throwException(Translator.get("theme_name_empty"));
            } else {
                DEException.throwException(e);
            }
        }

    }

    @RequiresPermissions("sysparam:read")
    @PostMapping("/delete/{themeId}")
    public void delete(@PathVariable("themeId") int themeId) {
        themeXpackService.deleteTheme(themeId);
    }

}
