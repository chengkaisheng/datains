package io.datains.controller.sys;


import io.datains.auth.config.RsaProperties;
import io.datains.base.domain.License;
import io.datains.base.mapper.LicenseMapper;
import io.datains.commons.license.F2CLicenseResponse;
import io.datains.commons.utils.EncryptUtil;
import io.datains.commons.utils.IsNullUtils;
import io.datains.commons.utils.LogUtil;
import io.datains.service.AboutService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.util.Date;
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

    @PostMapping("/license/update")
    public F2CLicenseResponse updateLicense(@RequestBody Map<String, String> map) {
        return aboutService.updateLicense(map.get("license"));
    }

    @PostMapping("/license/validate")
    public F2CLicenseResponse validateLicense(@RequestBody Map<String, String> map) {
        return aboutService.validateLicense(map.get("license"));
    }

    @ApiOperation(value = "修改授权文件")
    @RequestMapping(value = "/license/updates",method= RequestMethod.POST)
    public Object update(@RequestBody Map<String, String> map) {
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
            List<License> list = licenseMapper.lists();
            if (IsNullUtils.isNull(list)){
                License license1 = new License();
                license1.setLicense(license);
                license1.setId("datains_license");
                license1.setUpdateTime(new Date());
                licenseMapper.save(license1);
                return s3;
            }
            licenseMapper.update(license, "datains_license");
            return s3;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }
    @ApiOperation(value = "获取授权信息")
    @RequestMapping(value = "/license/validates",method= RequestMethod.POST)
    public Object getLicense() {
        try {
            List<License> list1 =  licenseMapper.lists();
            if (IsNullUtils.isNotNull(list1)){
                EncryptUtil instance = EncryptUtil.getInstance();
                //Base64解密
                String s1 = instance.Base64Decode(list1.get(0).getLicense());
                System.err.println(s1);
                //DES解密
                String s3 = instance.DESdecode(s1,key);
                return s3;
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    @GetMapping("/build/version")
    public Object getBuildVersion() {
        return aboutService.getBuildVersion();
    }
}
