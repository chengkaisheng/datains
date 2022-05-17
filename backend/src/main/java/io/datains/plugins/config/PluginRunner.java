package io.datains.plugins.config;

import io.datains.base.domain.MyPlugin;
import io.datains.commons.utils.LogUtil;
import io.datains.controller.sys.base.BaseGridRequest;
import io.datains.service.sys.PluginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import java.io.File;
import java.util.List;

@Component
public class PluginRunner implements ApplicationRunner {

    @Value("${datains.plugin.dir:/opt/datains/plugins/}")
    private String pluginDir;

    @Autowired
    private PluginService pluginService;



    @Override
    public void run(ApplicationArguments args) {
        // 执行加载插件逻辑
        BaseGridRequest request = new BaseGridRequest();
        List<MyPlugin> plugins = pluginService.query(request);
        plugins.stream().forEach(plugin -> {
            String store = plugin.getStore();
            String version = plugin.getVersion();
            String moduleName = plugin.getModuleName();
            String fileName = moduleName + "-" + version + ".jar";
            String path = pluginDir + store + "/" + fileName;
            LogUtil.error("插件路径: {} ", path);
            File jarFile = new File(path);

            String jarPath = jarFile.getAbsolutePath();
            try {
                if (jarFile.exists()) {
                    pluginService.loadJar(jarPath, plugin);
                }else {
                    LogUtil.error("插件路径不存在 {} ", jarPath);
                }
            } catch (Exception e) {
                System.err.println(e);
                LogUtil.error(e);
            }
        });

    }

}
