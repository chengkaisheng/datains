package io.datains.plugins.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.datains.base.domain.License;
import io.datains.base.mapper.LicenseMapper;
import io.datains.commons.license.DefaultLicenseService;
import io.datains.commons.license.F2CLicense;
import io.datains.commons.license.F2CLicenseResponse;
import io.datains.commons.utils.EncryptUtil;
import io.datains.commons.utils.IsNullUtils;
import io.datains.commons.utils.MacUtil;
import io.datains.controller.sys.response.LicenseVo;
import io.datains.plugins.common.dto.PluginSysMenu;
import io.datains.plugins.common.service.PluginMenuService;
import io.datains.plugins.config.SpringContextUtil;
import io.datains.service.AboutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class PluginUtils {


    private static DefaultLicenseService defaultLicenseService;

    private static LicenseMapper licenseMapper;

    private static String key = "DataIns";

    /*@Value("${datains.plugin.dir:/opt/datains/plugins/menus/menus.key}")*/
    //private static String menusDir = "/opt/datains/plugins/menus/menus.key";

    /*@Value("${datains.plugin.dir:/opt/datains/plugins/menus/menus.key}")*/
    private static String mac = "/opt/datains/plugins/mac/mac.txt";

    @Autowired
    public void setDefaultLicenseService(DefaultLicenseService defaultLicenseService) {
        PluginUtils.defaultLicenseService = defaultLicenseService;
    }

    @Autowired
    public void setLicenseMapper(LicenseMapper licenseMapper) {
        PluginUtils.licenseMapper = licenseMapper;
    }

    public static List<PluginSysMenu> pluginMenus() throws IOException {
        F2CLicenseResponse f2CLicenseResponse = LicenseProving();
        if (f2CLicenseResponse.getStatus() != F2CLicenseResponse.Status.valid) return new ArrayList<>();
/*        Map<String, PluginMenuService> pluginMenuServiceMap = SpringContextUtil.getApplicationContext().getBeansOfType(PluginMenuService.class);
        List<PluginSysMenu> menus = pluginMenuServiceMap.values().stream().flatMap(item -> item.menus().stream()).collect(Collectors.toList());*/
        List<PluginSysMenu> menus = getMenus();
        return menus;
    }

    public static   F2CLicenseResponse LicenseProving(){
        F2CLicenseResponse f2CLicenseResponse = new F2CLicenseResponse();
        f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.no_record);
        try {
            List<License> list1 =  licenseMapper.lists();
            if (IsNullUtils.isNotNull(list1)){
                EncryptUtil instance = EncryptUtil.getInstance();
                //Base64解密
                String s1 = instance.Base64Decode(list1.get(0).getLicense());
                System.err.println(s1);
                //DES解密
                String s3 = instance.DESdecode(s1,key);
                ObjectMapper mapper = new ObjectMapper();
                LicenseVo licenseVo = null;
                licenseVo = mapper.readValue(s3, LicenseVo.class);
                F2CLicense licenseResponse= new F2CLicense();
                licenseResponse.setCorporation(licenseVo.getCompany());
                licenseResponse.setCount(Long.valueOf(licenseVo.getAmount()));
                licenseResponse.setEdition("Standard");
                licenseResponse.setExpired(licenseVo.getExpirationTime());
                licenseResponse.setLicenseVersion(licenseVo.getEdition());
                licenseResponse.setProduct(licenseVo.getProduct());
                //判断此服务器是否授权
                MacUtil macUtil = new MacUtil();
                String currentIpLocalMac = null;
                Map<String, String> mac = getMac();
                if (mac.get("code").equals("200")){
                    currentIpLocalMac = mac.get("mac");
                }else {
                    currentIpLocalMac = macUtil.getCurrentIpLocalMac();
                }
                if (!licenseVo.getMacAdress().equals(currentIpLocalMac) || !licenseVo.getMacAdress().toLowerCase().equals(currentIpLocalMac)){
                    f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.no_record);
                    return f2CLicenseResponse;
                }
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date expirationTime = simpleDateFormat.parse(licenseVo.getExpirationTime());
                String format = simpleDateFormat.format(new Date());
                Date newData = simpleDateFormat.parse(format);
                //转换成数字类型
                long endTime = expirationTime.getTime();
                long nowTime = newData.getTime();
                if (endTime < nowTime){
                    f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.expired);
                }else {
                    f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.valid);
                }
                f2CLicenseResponse.setLicense(licenseResponse);
                return f2CLicenseResponse;
            }
            return f2CLicenseResponse;
        } catch (Exception e) {
            e.printStackTrace();
            f2CLicenseResponse.setMessage(e.getMessage());
            return f2CLicenseResponse;
        }

    }


    public static Map<String,String> getMac(){
        try{
            Map<String,String> map = new HashMap<>();
            String fileName = mac;
            Path path = Paths.get(fileName);
            byte[] bytes = Files.readAllBytes(path);
            List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);
            if (IsNullUtils.isNotNull(allLines.size())){
                map.put("code","200");
                map.put("mac",allLines.get(0));
                return map;
            }
            map.put("code","500");
            return map;
        }catch (Exception e) {
            Map<String,String> map = new HashMap<>();
            map.put("code","500");
            return map;
        }
    }

    public static List<PluginSysMenu> getMenus() throws IOException {
        try{
            ClassLoader classLoader = PluginUtils.class.getClassLoader();
            /*String fileName = menusDir;
            Path path = Paths.get(fileName);
            byte[] bytes = Files.readAllBytes(path);
            List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);*/
            InputStream inputStream = classLoader.getResourceAsStream("menus/menus.key");
            InputStreamReader isr = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
            BufferedReader br = new BufferedReader(isr);
            EncryptUtil instance = EncryptUtil.getInstance();
            String s1 = instance.Base64Decode(br.readLine());
            //DES解密
            String s3 = instance.DESdecode(s1,"DataIns");
            String res = JSON.toJSON(s3).toString();
            List<PluginSysMenu> list = null;

            list = JSONArray.parseArray(res,PluginSysMenu.class);
            return list;
        }catch (Exception e) {
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
        try{
            F2CLicenseResponse f2CLicenseResponse = PluginUtils.currentLic();
            if (f2CLicenseResponse.getStatus() != F2CLicenseResponse.Status.valid) return false;
        }catch (Exception e) {
            return false;
        }
        return true;
    }




}
