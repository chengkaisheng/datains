package io.datains.controller.sys;



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
import io.datains.controller.ResultHolder;
import io.datains.controller.sys.response.LicenseVo;
import io.datains.exception.DataInsException;
import io.datains.plugins.common.dto.PluginSysMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
@RestController
@RequestMapping(headers = "Accept=application/json")
public class LicenseController {

    @Value("${datains.need_validate_lic:true}")
    private Boolean need_validate_lic;

    @Resource
    private DefaultLicenseService defaultLicenseService;

    @Autowired
    private LicenseMapper licenseMapper;

    @Value("${License.key}")
    private String key;

    private static String mac = "/opt/datains/plugins/mac/mac.txt";

    @GetMapping(value = "anonymous/license/validate")
    public ResultHolder validateLicense() throws Exception {
        if (!need_validate_lic) {
            return ResultHolder.success(null);
        }
//        F2CLicenseResponse f2CLicenseResponse = defaultLicenseService.validateLicense();
        F2CLicenseResponse f2CLicenseResponse = LicenseProving();
        switch (f2CLicenseResponse.getStatus()) {
            case no_record:
                return ResultHolder.success(f2CLicenseResponse);
            case valid:
                return ResultHolder.success(null);
            case expired:
                String expired = f2CLicenseResponse.getLicense().getExpired();
                DataInsException.throwException("License has expired since " + expired + ", please update license.");
            case invalid:
                DataInsException.throwException(f2CLicenseResponse.getMessage());
            default:
                DataInsException.throwException("Invalid License.");
        }
        return new ResultHolder();
    }


    public F2CLicenseResponse LicenseProving(){
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
                    return f2CLicenseResponse;
                }
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
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

    public static void main(String[] args) throws IOException {
        String fileName = mac;
        Path path = Paths.get(fileName);
        byte[] bytes = Files.readAllBytes(path);
        List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);
        System.err.println(allLines.get(0));
    }
}
