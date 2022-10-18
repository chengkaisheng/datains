package io.datains.commons.license;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import io.datains.base.domain.License;
import io.datains.commons.exception.DEException;
import io.datains.commons.utils.EncryptUtil;
import io.datains.commons.utils.IsNullUtils;
import io.datains.commons.utils.LogUtil;
import io.datains.commons.utils.MacUtil;
import io.datains.controller.sys.response.LicenseVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class DefaultLicenseService {
    @Resource
    private InnerLicenseService innerLicenseService;

    private static final String LICENSE_ID = "datains_license";
    private static final String validatorUtil = "/usr/bin/validator";
    private static final String product = "DataIns";
    private static String mac = "/opt/datains/plugins/mac/mac.txt";

    /*public F2CLicenseResponse validateLicense(String product, String licenseKey) {
        List<String> command = new ArrayList<String>();
        StringBuilder result = new StringBuilder();
        command.add(validatorUtil);
        command.add(licenseKey);
        try {
            execCommand(result, command);
            LogUtil.info("read lic content is : " + result.toString());
            F2CLicenseResponse f2CLicenseResponse = new Gson().fromJson(result.toString(), F2CLicenseResponse.class);
            if (f2CLicenseResponse.getStatus() != F2CLicenseResponse.Status.valid) {
                return f2CLicenseResponse;
            }
            if (!StringUtils.equals(f2CLicenseResponse.getLicense().getProduct(), product)) {
                f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.invalid);
                f2CLicenseResponse.setLicense(null);
                f2CLicenseResponse.setMessage("The license is unavailable for this product.");
                return f2CLicenseResponse;
            }
            return f2CLicenseResponse;
        } catch (Exception e) {
            LogUtil.error(e.getMessage());
            return F2CLicenseResponse.noRecord();
        }
    }*/

    public F2CLicenseResponse validateLicense(String product, String licenseKey) {
        F2CLicenseResponse f2CLicenseResponse = new F2CLicenseResponse();
        f2CLicenseResponse.setStatus(F2CLicenseResponse.Status.no_record);
        try {
            if (IsNullUtils.isNotNull(licenseKey)){
                EncryptUtil instance = EncryptUtil.getInstance();
                //Base64解密
                String s1 = instance.Base64Decode(licenseKey);
                System.err.println(s1);
                //DES解密
                String s3 = instance.DESdecode(s1,product);
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


    private static int execCommand(StringBuilder result, List<String> command) throws Exception {
        ProcessBuilder builder = new ProcessBuilder();
        builder.command(command);
        Process process = builder.start();
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line = null;
        while ((line = bufferedReader.readLine()) != null) {
            result.append(line).append("\n");
        }
        int exitCode = process.waitFor();
        command.clear();
        return exitCode;
    }

    public F2CLicenseResponse validateLicense() {
        try {
            License license = readLicense();
            return validateLicense(product, license.getLicense());
        } catch (Exception e) {
            return F2CLicenseResponse.noRecord();
        }
    }

    public F2CLicenseResponse updateLicense(String product, String licenseKey) {
        // 验证license
        F2CLicenseResponse response = validateLicense(product, licenseKey);
        if (response.getStatus() != F2CLicenseResponse.Status.valid) {
            return response;
        }
        // 覆盖原license
        writeLicense(licenseKey, response);
        return response;
    }

    // 从数据库读取License
    public License readLicense() {
        License license = innerLicenseService.getLicense(LICENSE_ID);
        if (license == null) {
            DEException.throwException("i18n_no_license_record");
        }
        if (StringUtils.isBlank(license.getLicense())) {
            DEException.throwException("i18n_license_is_empty");
        }
        return license;
    }

    // 创建或更新License
    private void writeLicense(String licenseKey, F2CLicenseResponse response) {
        if (StringUtils.isBlank(licenseKey)) {
            DEException.throwException("i18n_license_is_empty");
        }
        License license = new License();
        license.setId(LICENSE_ID);
        license.setLicense(licenseKey);
        license.setF2cLicense(new Gson().toJson(response));
        innerLicenseService.saveLicense(license);
    }
}
