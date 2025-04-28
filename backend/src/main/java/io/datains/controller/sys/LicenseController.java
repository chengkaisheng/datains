package io.datains.controller.sys;


import io.datains.base.mapper.LicenseMapper;
import io.datains.commons.license.DefaultLicenseService;
import io.datains.commons.utils.IsNullUtils;
import io.datains.controller.ResultHolder;
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

    private static String mac = "/opt/datains/hostinfo/address";

    @GetMapping(value = "anonymous/license/validate")
    public ResultHolder validateLicense() throws Exception {
        return ResultHolder.success(null);
    }


    public Map<String, String> getMac() {
        try {
            Map<String, String> map = new HashMap<>();
            String fileName = mac;
            Path path = Paths.get(fileName);
            byte[] bytes = Files.readAllBytes(path);
            List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);
            if (IsNullUtils.isNotNull(allLines.size())) {
                map.put("code", "200");
                map.put("mac", allLines.get(0));
                return map;
            }
            map.put("code", "500");
            return map;
        } catch (Exception e) {
            Map<String, String> map = new HashMap<>();
            map.put("code", "500");
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
