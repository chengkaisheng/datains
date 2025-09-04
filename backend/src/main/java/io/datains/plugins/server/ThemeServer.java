package io.datains.plugins.server;

import io.datains.base.domain.ThemeDto;
import io.datains.base.domain.ThemeItem;
import io.datains.base.domain.ThemeRequest;
import io.datains.commons.exception.DEException;
import io.datains.commons.utils.LogUtil;
import io.datains.i18n.Translator;
import io.datains.operLog.annotation.Log;
import io.datains.operLog.enums.BusinessType;
import io.datains.plugins.config.SpringContextUtil;
import io.datains.service.sys.ThemeXpackService;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@ApiIgnore
@RequestMapping("/plugin/theme")
@RestController
public class ThemeServer {

    @Autowired
    private ThemeXpackService themeXpackService;

    @PostMapping("/themes")
    @Log(title = "主题：获取主题列表", businessType = BusinessType.SELECT)
    public List<ThemeDto> themes() {
        return themeXpackService.themes();
    }

    @PostMapping("/items/{themeId}")
    @Log(title = "主题：获取主题详情", businessType = BusinessType.SELECT)
    public List<ThemeItem> themeItems(@PathVariable("themeId") int themeId) {
        return themeXpackService.queryItems(themeId);
    }

    @RequiresPermissions("sysparam:read")
    @PostMapping("/save")
    @Log(title = "主题：保存主题信息", businessType = BusinessType.UPDATE)
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
    @Log(title = "系统参数：删除主题", businessType = BusinessType.DELETE)
    public void delete(@PathVariable("themeId") int themeId) {
        themeXpackService.deleteTheme(themeId);
    }

}
