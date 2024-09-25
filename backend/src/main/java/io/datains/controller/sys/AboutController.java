package io.datains.controller.sys;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.datains.auth.api.dto.DynamicMenuDto;
import io.datains.auth.config.RsaProperties;
import io.datains.base.domain.License;
import io.datains.base.mapper.LicenseMapper;
import io.datains.commons.license.F2CLicense;
import io.datains.commons.license.F2CLicenseResponse;
import io.datains.commons.utils.EncryptUtil;
import io.datains.commons.utils.IsNullUtils;
import io.datains.commons.utils.LogUtil;
import io.datains.commons.utils.MacUtil;

import io.datains.controller.sys.response.LicenseVo;
import io.datains.plugins.common.dto.PluginSysMenu;
import io.datains.service.AboutService;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApiIgnore
@RequestMapping("/about")
@RestController
public class AboutController {

    @Value("${License.key}")
    private String key;

    @Resource
    private AboutService aboutService;

    @Autowired(required=false)
    private LicenseMapper licenseMapper;

    //private static String mac = "/opt/datains/hostinfo/address";
    private static String mac = "/opt/datains/hostinfo/address";

 /*   @PostMapping("/license/update")
    public F2CLicenseResponse updateLicense(@RequestBody Map<String, String> map) {
        return aboutService.updateLicense(map.get("license"));
    }*/

  /*  @PostMapping("/license/validate")
    public F2CLicenseResponse validateLicense(@RequestBody Map<String, String> map) {
        return aboutService.validateLicense(map.get("license"));
    }*/

    @ApiOperation(value = "修改授权文件")
    @RequestMapping(value = "/license/update",method= RequestMethod.POST)
    public F2CLicenseResponse update(@RequestBody Map<String, String> map) {
        F2CLicenseResponse f2CLicenseResponse = new F2CLicenseResponse();
        f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.no_record);
//        public ReturnT<Object> updateLicense(@RequestParam String license) {
        try {
            String license = map.get("license");
            EncryptUtil instance = EncryptUtil.getInstance();
            //Base64解密
            String s1 = instance.Base64Decode(license);
            System.err.println(s1);
            //DES解密
            String s3 = instance.DESdecode(s1,key);
            if (IsNullUtils.isNull(s3)){
                LogUtil.error("update valid lic, expired date is {}");
            }
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
            f2CLicenseResponse.setLicense(licenseResponse);
            //判断此服务器是否授权
            MacUtil macUtil = new MacUtil();
            String currentIpLocalMac = null;
            Map<String, String> mac = this.getMac();
            if (mac.get("code").equals("200")){
                currentIpLocalMac = mac.get("mac");
            }else {
                currentIpLocalMac = macUtil.getCurrentIpLocalMac();
            }
            if (!licenseVo.getMacAdress().equals(currentIpLocalMac) || !licenseVo.getMacAdress().toLowerCase().equals(currentIpLocalMac)){
                f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.no_record);
                f2CLicenseResponse.setMessage("mac地址错误");
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
                f2CLicenseResponse.setMessage("授权文件已失效");
                f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.expired);
                return f2CLicenseResponse;
            }else {
                List<License> list = licenseMapper.lists();
                if (IsNullUtils.isNull(list)){
                    License license1 = new License();
                    license1.setLicense(license);
                    license1.setId("datains_license");
                    license1.setUpdateTime(new Date());
                    licenseMapper.save(license1);
                }else {
                    licenseMapper.update(license, "datains_license");
                }
                f2CLicenseResponse.setMessage("授权成功");
                f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.valid);
            }
            return f2CLicenseResponse;
        } catch (Exception e) {
            e.printStackTrace();
            f2CLicenseResponse.setMessage(e.getMessage());
            return f2CLicenseResponse;
        }
    }
    @ApiOperation(value = "获取授权信息")
    @RequestMapping(value = "/license/validate",method= RequestMethod.POST)
    public F2CLicenseResponse getLicense() {
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
                Map<String, String> mac = this.getMac();
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


    public Map<String,String> getMac(){
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

    @GetMapping("/build/version")
    public Object getBuildVersion() {
        return aboutService.getBuildVersion();
    }


    /*public static void main(String[] args) throws IOException {
        String fileName = "C:/Users/Mr.zhang/Desktop/test.key";
        Path path = Paths.get(fileName);
        byte[] bytes = Files.readAllBytes(path);
        List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);//原文出自【易百教程】，商业转载请联系作者获得授权，非商业请保留原文链接：https://www.yiibai.com/java/java-read-text-file.html
        System.out.println(allLines.get(0));

    }*/

    public static void main(String[] args) {

            LicenseVo license = new LicenseVo();
            license.setCompany("上海哲锦科技");
            license.setExpirationTime("2022-12-01 17:16:18");
            license.setEdition("2.1.2");
            license.setProduct("DataIns");
            license.setCreateTime("2022-10-19 17:16:18");
            license.setEditionName("标准版");
            MacUtil macUtil = new MacUtil();
            String currentIpLocalMac = macUtil.getCurrentIpLocalMac();
            System.err.println(currentIpLocalMac);
            license.setMacAdress(currentIpLocalMac);
            license.setAmount("30");
            String s1 = JSON.toJSONString(license);

            JSON.toJSONString(license);

            EncryptUtil instance = EncryptUtil.getInstance();

            //DES加密
            String dataEase = instance.DESencode(JSON.toJSONString(license), "DataIns");
            //Base64加密
            String s = instance.Base64Encode(dataEase);
            System.err.println(s);


/*
        EncryptUtil instance = EncryptUtil.getInstance();
        String a= "[{\n" +
                "\t\t\"path\": \"role\",\n" +
                "\t\t\"component\": \"SystemRole\",\n" +
                "\t\t\"redirect\": null,\n" +
                "\t\t\"name\": \"system-role\",\n" +
                "\t\t\"title\": \"角色管理\",\n" +
                "\t\t\"icon\": \"role\",\n" +
                "\t\t\"pid\": 1,\n" +
                "\t\t\"menuId\": 5,\n" +
                "\t\t\"permission\": \"role:read\",\n" +
                "\t\t\"hidden\": false,\n" +
                "\t\t\"type\": 1,\n" +
                "\t\t\"menuSort\": 2,\n" +
                "\t\t\"isPlugin\": true,\n" +
                "\t\t\"noLayout\": false,\n" +
                "\t\t\"children\": null\n" +
                "\t}, {\n" +
                "\t\t\"path\": \"dept\",\n" +
                "\t\t\"component\": \"SystemDept\",\n" +
                "\t\t\"redirect\": null,\n" +
                "\t\t\"name\": \"system-dept\",\n" +
                "\t\t\"title\": \"组织管理\",\n" +
                "\t\t\"icon\": \"dept\",\n" +
                "\t\t\"pid\": 1,\n" +
                "\t\t\"menuId\": 4,\n" +
                "\t\t\"permission\": \"dept:read\",\n" +
                "\t\t\"hidden\": false,\n" +
                "\t\t\"type\": 1,\n" +
                "\t\t\"menuSort\": 3,\n" +
                "\t\t\"isPlugin\": true,\n" +
                "\t\t\"noLayout\": false,\n" +
                "\t\t\"children\": null\n" +
                "\t}, {\n" +
                "\t\t\"path\": \"system-auth\",\n" +
                "\t\t\"component\": \"SystemAuth\",\n" +
                "\t\t\"redirect\": null,\n" +
                "\t\t\"name\": \"system-auth\",\n" +
                "         \"title\": \"权限管理\",\n" +
                "\t\t\"icon\": \"password\",\n" +
                "\t\t\"pid\": 1,\n" +
                "\t\t\"menuId\": 41,\n" +
                "\t\t\"permission\": \"auth:read\",\n" +
                "\t\t\"hidden\": false,\n" +
                "\t\t\"type\": 1,\n" +
                "\t\t\"menuSort\": 4,\n" +
                "\t\t\"isPlugin\": true,\n" +
                "\t\t\"noLayout\": true,\n" +
                "\t\t\"children\": null\n" +
                "\t}, {\n" +
                "\t\t\"path\": \"emailtask\",\n" +
                "\t\t\"component\": \"EmailTask\",\n" +
                "\t\t\"redirect\": null,\n" +
                "\t\t\"name\": \"sys-task-email\",\n" +
                "        \"title\": \"定时报告\",\n" +
                "\t\t\"icon\": \"email-task\",\n" +
                "\t\t\"pid\": 60,\n" +
                "\t\t\"menuId\": 61,\n" +
                "\t\t\"permission\": \"task-email:read\",\n" +
                "\t\t\"hidden\": false,\n" +
                "\t\t\"type\": 1,\n" +
                "\t\t\"menuSort\": 1002,\n" +
                "\t\t\"isPlugin\": true,\n" +
                "\t\t\"noLayout\": false,\n" +
                "\t\t\"children\": null\n" +
                "\t}, {\n" +
                "\t\t\"path\": \"dept-form\",\n" +
                "\t\t\"component\": \"SystemDeptForm\",\n" +
                "\t\t\"redirect\": null,\n" +
                "\t\t\"name\": \"system-dept-form\",\n" +
                "\t\t\"title\": \"组织表单\",\n" +
                "\t\t\"icon\": null,\n" +
                "\t\t\"pid\": 1,\n" +
                "\t\t\"menuId\": 37,\n" +
                "\t\t\"permission\": null,\n" +
                "\t\t\"hidden\": true,\n" +
                "\t\t\"type\": 1,\n" +
                "\t\t\"menuSort\": 999,\n" +
                "\t\t\"isPlugin\": true,\n" +
                "\t\t\"noLayout\": false,\n" +
                "\t\t\"children\": null\n" +
                "\t}, {\n" +
                "\t\t\"path\": \"role-form\",\n" +
                "\t\t\"component\": \"SystemRoleForm\",\n" +
                "\t\t\"redirect\": null,\n" +
                "\t\t\"name\": \"system-role-form\",\n" +
                "\t\t\"title\": \"角色表单\",\n" +
                "\t\t\"icon\": null,\n" +
                "\t\t\"pid\": 1,\n" +
                "\t\t\"menuId\": 38,\n" +
                "\t\t\"permission\": null,\n" +
                "\t\t\"hidden\": true,\n" +
                "\t\t\"type\": 1,\n" +
                "\t\t\"menuSort\": 999,\n" +
                "\t\t\"isPlugin\": true,\n" +
                "\t\t\"noLayout\": false,\n" +
                "\t\t\"children\": null\n" +
                "\t}, {\n" +
                "\t\t\"path\": \"emailtask-form\",\n" +
                "\t\t\"component\": \"EmailTaskForm\",\n" +
                "\t\t\"redirect\": null,\n" +
                "\t\t\"name\": \"sys-task-email-form\",\n" +
                "\t\t\"title\": \"报告信息\",\n" +
                "        \"icon\": \"task\",\n" +
                "\t\t\"pid\": 1,\n" +
                "\t\t\"menuId\": 62,\n" +
                "\t\t\"permission\": \"task-email:read\",\n" +
                "\t\t\"hidden\": true,\n" +
                "\t\t\"type\": 1,\n" +
                "\t\t\"menuSort\": 1003,\n" +
                "\t\t\"isPlugin\": true,\n" +
                "\t\t\"noLayout\": false,\n" +
                "\t\t\"children\": null\n" +
                "\t}, {\n" +
                "\t\t\"path\": \"/ukey\",\n" +
                "\t\t\"component\": \"SystemUkey\",\n" +
                "\t\t\"redirect\": null,\n" +
                "\t\t\"name\": \"system-ukey\",\n" +
                "\t\t\"title\": \"用户key\",\n" +
                "\t\t\"icon\": \"ukey\",\n" +
                "\t\t\"pid\": 0,\n" +
                "\t\t\"menuId\": 70,\n" +
                "\t\t\"permission\": \"\",\n" +
                "\t\t\"hidden\": true,\n" +
                "\t\t\"type\": 1,\n" +
                "\t\t\"menuSort\": 1002,\n" +
                "\t\t\"isPlugin\": true,\n" +
                "\t\t\"noLayout\": false,\n" +
                "\t\t\"children\": null\n" +
                "\t}]\n" +
                "\n";
      *//*  a = a.replaceAll("\r|\n", "");
        System.err.println("fwwfwgwgw"+a);
        String trim = a.replaceAll(" ", "");
        trim = trim.replaceAll("\\\\", "");
        System.err.println(trim);
        String s2 = JSON.toJSONString(trim);
        System.err.println(s2);*//*
        //DES加密s
        String dataEase = instance.DESencode(a, "DataIns");
        //Base64加密
        String s = instance.Base64Encode(dataEase);
        System.err.println(s);


        *//*      String a = "Q0ZDMzE1MUYxRjU2NjU2N0M2NDk5NkYyNUI5N0Y2RDMyRDY1RkNBQTY2RThCRTkzNkU5QzE5REY3QzE2MEVDMzlDNTk0OTY3N0M0QjA1OTc3NjU4MERDMjA3NTk2QjkxRjE2NDlCQURFQTZFOEExODk4RTBGQkQ2NDEyQ0I5NkMyODc5M0MwMDhFNTAwM0MyM0I0NjdBMEM4OTQwQ0U2N0VBRjg4MEU2NzAyMEIwRkY0NTJGRjBGNDcyMzQ5RjJGNERENkYwNDM2ODM3N0RGQ0IxOUEyNTI1NEExN0E0NUMwODA4RDk1MDYwQThFNDlCQ0REQzE0Q0UzMDYwQUYxQUJCNDNBMzAxM0RGNEJBNzIxQzU3RDlEMzhDNTE2MTAwOEI5NzVBMkM2MkFFNDI5OENFNTcxRTIyNzI2NUY1MUEyNDJDN0RDNzUzRDNDODEwRjkyRDgyRDYxMjJGMzQyRTNENTY4RDI0QzU3NDlGRUYwMThBNjk3NzUyNEMzQUNC";
         *//*
        //Base64解密
        String s1 = instance.Base64Decode(s);
        System.err.println(s1);
        //DES解密
        String s3 = instance.DESdecode(s1,"DataIns");
        String res = JSON.toJSON(s3).toString();
        System.err.println(res);
        List<PluginSysMenu> list = null;

            list = JSONArray.parseArray(res,PluginSysMenu.class);
        System.err.println(list);*/
    }
}
