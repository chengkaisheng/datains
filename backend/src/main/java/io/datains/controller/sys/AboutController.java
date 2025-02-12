package io.datains.controller.sys;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.datains.base.domain.License;
import io.datains.base.mapper.LicenseMapper;
import io.datains.commons.license.F2CLicense;
import io.datains.commons.license.F2CLicenseResponse;
import io.datains.commons.utils.EncryptUtil;
import io.datains.commons.utils.IsNullUtils;
import io.datains.commons.utils.LogUtil;
import io.datains.commons.utils.MacUtil;
import io.datains.controller.sys.response.LicenseVo;
import io.datains.service.AboutService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
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
        f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.no_record);
//        public ReturnT<Object> updateLicense(@RequestParam String license) {
        try {
            String license = map.get("license");
            EncryptUtil instance = EncryptUtil.getInstance();
            //Base64解密
            String s1 = instance.Base64Decode(license);
            System.err.println(s1);
            //DES解密
            String s3 = instance.DESdecode(s1, key);
            if (IsNullUtils.isNull(s3)) {
                LogUtil.error("update valid lic, expired date is {}");
            }
            ObjectMapper mapper = new ObjectMapper();
            LicenseVo licenseVo = null;
            licenseVo = mapper.readValue(s3, LicenseVo.class);
            F2CLicense licenseResponse = new F2CLicense();
            licenseResponse.setCorporation(licenseVo.getCompany());
            licenseResponse.setCount(Long.valueOf(licenseVo.getAmount()));
            licenseResponse.setEdition("Standard");
            licenseResponse.setExpired(licenseVo.getExpirationTime());
            licenseResponse.setLicenseVersion(licenseVo.getEdition());
            licenseResponse.setProduct(licenseVo.getProduct());
            f2CLicenseResponse.setLicense(licenseResponse);
            //判断此服务器是否授权
            List<String> macs = MacUtil.getAllLocalMac();
            System.err.println("服务器mac:" + macs);
            String licenseMac = licenseVo.getMacAdress().toLowerCase()
                    .replaceAll(":", "")
                    .replaceAll("-", "");
            System.err.println("license文件中的mac:" + licenseMac);
            if (!macs.contains(licenseMac)) {
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
            if (endTime < nowTime) {
                f2CLicenseResponse.setMessage("授权文件已失效");
                f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.expired);
                return f2CLicenseResponse;
            } else {
                List<License> list = licenseMapper.lists();
                if (IsNullUtils.isNull(list)) {
                    License license1 = new License();
                    license1.setLicense(license);
                    license1.setId("datains_license");
                    license1.setUpdateTime(new Date());
                    licenseMapper.save(license1);
                } else {
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
    @RequestMapping(value = "/license/validate", method = RequestMethod.POST)
    public F2CLicenseResponse getLicense() {
        F2CLicenseResponse f2CLicenseResponse = new F2CLicenseResponse();
        f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.no_record);
        try {
            List<License> list1 = licenseMapper.lists();
            if (IsNullUtils.isNotNull(list1)) {
                EncryptUtil instance = EncryptUtil.getInstance();
                //Base64解密
                String s1 = instance.Base64Decode(list1.get(0).getLicense());
                System.err.println(s1);
                //DES解密
                String s3 = instance.DESdecode(s1, key);
                ObjectMapper mapper = new ObjectMapper();
                LicenseVo licenseVo = null;
                licenseVo = mapper.readValue(s3, LicenseVo.class);
                F2CLicense licenseResponse = new F2CLicense();
                licenseResponse.setCorporation(licenseVo.getCompany());
                licenseResponse.setCount(Long.valueOf(licenseVo.getAmount()));
                licenseResponse.setEdition("Standard");
                licenseResponse.setExpired(licenseVo.getExpirationTime());
                licenseResponse.setLicenseVersion(licenseVo.getEdition());
                licenseResponse.setProduct(licenseVo.getProduct());
                //判断此服务器是否授权
                List<String> macs = MacUtil.getAllLocalMac();
                System.err.println("服务器mac:" + macs);
                String licenseMac = licenseVo.getMacAdress().toLowerCase()
                        .replaceAll(":", "")
                        .replaceAll("-", "");
                System.err.println("license文件中的mac:" + licenseMac);
                if (!macs.contains(licenseMac)) {
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
                if (endTime < nowTime) {
                    f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.expired);
                } else {
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
