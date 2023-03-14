package io.datains.plugins.loader;

import io.datains.base.domain.MyPlugin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class MybatisLoader {



    @Resource
    private MyScanner myScanner;



    public void loadMybatis(MyPlugin myPlugin) {
        if (!myPlugin.getLoadMybatis()) return;
        myScanner.scanner();
    }

}
