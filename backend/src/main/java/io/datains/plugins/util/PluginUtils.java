package io.datains.plugins.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import io.datains.auth.api.dto.PluginSysMenuCustom;
import io.datains.base.mapper.LicenseMapper;
import io.datains.commons.license.DefaultLicenseService;
import io.datains.commons.license.F2CLicenseResponse;
import io.datains.commons.utils.EncryptUtil;
import io.datains.plugins.common.dto.PluginSysMenu;
import io.datains.plugins.config.SpringContextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class PluginUtils {


    private static DefaultLicenseService defaultLicenseService;

    private static LicenseMapper licenseMapper;

    private static String key = "DataIns";

    /*@Value("${datains.plugin.dir:/opt/datains/plugins/menus/menus.key}")*/
    //private static String menusDir = "/opt/datains/plugins/menus/menus.key";
    /*@Value("${datains.plugin.dir:/opt/datains/plugins/menus/menus.key}")*/
    private static String mac = "/opt/datains/hostinfo/address";

    @Autowired
    public void setDefaultLicenseService(DefaultLicenseService defaultLicenseService) {
        PluginUtils.defaultLicenseService = defaultLicenseService;
    }

    @Autowired
    public void setLicenseMapper(LicenseMapper licenseMapper) {
        PluginUtils.licenseMapper = licenseMapper;
    }

    public static List<PluginSysMenu> pluginMenus() throws IOException {
//        F2CLicenseResponse f2CLicenseResponse = LicenseProving();
//        if (f2CLicenseResponse.getStatus() != F2CLicenseResponse.Status.valid) return new ArrayList<>();
/*        Map<String, PluginMenuService> pluginMenuServiceMap = SpringContextUtil.getApplicationContext().getBeansOfType(PluginMenuService.class);
        List<PluginSysMenu> menus = pluginMenuServiceMap.values().stream().flatMap(item -> item.menus().stream()).collect(Collectors.toList());*/
        List<PluginSysMenu> menus = getMenus();
        return menus;
    }
    public static F2CLicenseResponse LicenseProving() {
        F2CLicenseResponse f2CLicenseResponse = new F2CLicenseResponse();
        f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.valid);
        return f2CLicenseResponse;
    }

    public static List<PluginSysMenuCustom> getMenusPluginSysMenuCustom() {
        try {
//            F2CLicenseResponse f2CLicenseResponse = LicenseProving();
//            if (f2CLicenseResponse.getStatus() != F2CLicenseResponse.Status.valid) return new ArrayList<>();
            String res = getMenusFromKey();
            return JSONArray.parseArray(res, PluginSysMenuCustom.class);
        } catch (Exception e) {
            return null;
        }
    }

    public static String getMenusFromKey() throws IOException {
        ClassLoader classLoader = PluginUtils.class.getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream("menus/menus.key");
        InputStreamReader isr = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
        BufferedReader br = new BufferedReader(isr);
        EncryptUtil instance = EncryptUtil.getInstance();
        String s1 = instance.Base64Decode(br.readLine());
        //DES解密
        String s3 = instance.DESdecode(s1, "DataIns");
        return JSON.toJSON(s3).toString();
    }

    public static List<PluginSysMenu> getMenus() throws IOException {
        try {
            String res = getMenusFromKey();
            return JSONArray.parseArray(res, PluginSysMenu.class);
        } catch (Exception e) {
            return null;
        }
    }


    public static F2CLicenseResponse currentLic() {
        Environment environment = SpringContextUtil.getBean(Environment.class);
        Boolean need_validate_lic = environment.getProperty("datains.need_validate_lic", Boolean.class, true);
        if (!need_validate_lic) {
            F2CLicenseResponse f2CLicenseResponse = new F2CLicenseResponse();
            f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.valid);
            return f2CLicenseResponse;
        }
        F2CLicenseResponse f2CLicenseResponse = defaultLicenseService.validateLicense();
        return f2CLicenseResponse;
    }

    public static Boolean licValid() {
        try {
            F2CLicenseResponse f2CLicenseResponse = PluginUtils.currentLic();
            if (f2CLicenseResponse.getStatus() != F2CLicenseResponse.Status.valid) return false;
        } catch (Exception e) {
            return false;
        }
        return true;
    }


}
