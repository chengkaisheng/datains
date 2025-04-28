package io.datains.controller.sys;


import io.datains.base.mapper.LicenseMapper;
import io.datains.commons.license.F2CLicenseResponse;
import io.datains.commons.utils.MacUtil;
import io.datains.service.AboutService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.util.Map;

@ApiIgnore
@RequestMapping("/about")
@RestController
public class AboutController {

    @Value("${License.key}")
    private String key;

    @Resource
    private AboutService aboutService;

    @Autowired(required = false)
    private LicenseMapper licenseMapper;

    //private static String mac = "/opt/datains/hostinfo/address";


 /*   @PostMapping("/license/update")
    public F2CLicenseResponse updateLicense(@RequestBody Map<String, String> map) {
        return aboutService.updateLicense(map.get("license"));
    }*/

  /*  @PostMapping("/license/validate")
    public F2CLicenseResponse validateLicense(@RequestBody Map<String, String> map) {
        return aboutService.validateLicense(map.get("license"));
    }*/

    @ApiOperation(value = "修改授权文件")
    @RequestMapping(value = "/license/update", method = RequestMethod.POST)
    public F2CLicenseResponse update(@RequestBody Map<String, String> map) {
        F2CLicenseResponse f2CLicenseResponse = new F2CLicenseResponse();
        f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.valid);
//        public ReturnT<Object> updateLicense(@RequestParam String license) {
        return f2CLicenseResponse;
    }

    @ApiOperation(value = "获取授权信息")
    @RequestMapping(value = "/license/validate", method = RequestMethod.POST)
    public F2CLicenseResponse getLicense() {
        F2CLicenseResponse f2CLicenseResponse = new F2CLicenseResponse();
        f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.valid);
        return f2CLicenseResponse;
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
        System.out.println(MacUtil.getAllLocalMac());
    }

   /* public static void main(String[] args) {

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

    }*/
}
