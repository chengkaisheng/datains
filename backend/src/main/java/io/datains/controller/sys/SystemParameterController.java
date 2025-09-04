package io.datains.controller.sys;

import io.datains.base.domain.SystemParameter;
import io.datains.commons.constants.ParamConstants;
import io.datains.controller.sys.response.BasicInfo;
import io.datains.controller.sys.response.MailInfo;
import io.datains.dto.SystemParameterDTO;
import io.datains.listener.DatasetCheckListener;
import io.datains.listener.util.CacheUtils;
import io.datains.operLog.annotation.Log;
import io.datains.operLog.enums.BusinessType;
import io.datains.service.FileService;
import io.datains.service.system.EmailService;
import io.datains.service.system.SystemParameterService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApiIgnore
@RestController
@RequestMapping(value = "/system")
public class SystemParameterController {
    @Resource
    private SystemParameterService systemParameterService;

    @Resource
    private FileService fileService;

    @Resource
    private EmailService emailService;


    @RequiresPermissions("sysparam:read")
    @GetMapping("/mail/info")
    @Log(title = "系统参数：获取邮件信息", businessType = BusinessType.SELECT)
    public MailInfo mailInfo() {
        return emailService.mailInfo();
    }

//    @RequiresPermissions("sysparam:read")
    @GetMapping("/basic/info")
    @Log(title = "系统参数：获取基础信息", businessType = BusinessType.SELECT)
    public BasicInfo basicInfo() {
        return systemParameterService.basicInfo();
    }

    @GetMapping("/requestTimeOut")
    @Log(title = "系统参数：获取请求超时时间", businessType = BusinessType.SELECT)
    public Integer RequestTimeOut() {
        BasicInfo basicInfo = systemParameterService.basicInfo();
        return StringUtils.isNotBlank(basicInfo.getFrontTimeOut()) ? Integer.parseInt(basicInfo.getFrontTimeOut()) : 10;
    }

    @RequiresPermissions("sysparam:read")
    @PostMapping("/edit/email")
    @Log(title = "系统参数：修改邮件信息", businessType = BusinessType.UPDATE)
    public void editMail(@RequestBody List<SystemParameter> systemParameter) {
        emailService.editMail(systemParameter);
    }

    @RequiresPermissions("sysparam:read")
    @PostMapping("/edit/basic")
    @Log(title = "系统参数：修改基础信息", businessType = BusinessType.UPDATE)
    public void editBasic(@RequestBody List<SystemParameter> systemParameter) {
        systemParameterService.editBasic(systemParameter);
    }

    @PostMapping("/testConnection")
    @Log(title = "系统参数：测试连接", businessType = BusinessType.SELECT)
    public void testConnection(@RequestBody HashMap<String, String> hashMap) {
        emailService.testConnection(hashMap);
    }

    @GetMapping("/version")
    @Log(title = "系统参数：获取版本", businessType = BusinessType.SELECT)
    public String getVersion() {
        return systemParameterService.getVersion();
    }


    @RequiresPermissions("sysparam:read")
    @GetMapping("/base/info")
    @Log(title = "系统参数：获取基础信息", businessType = BusinessType.SELECT)
    public List<SystemParameterDTO> getBaseInfo() {
        return systemParameterService.getSystemParameterInfo(ParamConstants.Classify.BASE.getValue());
    }

    @GetMapping("/ui/info")
    @Log(title = "系统参数：获取UI信息", businessType = BusinessType.SELECT)
    public List<SystemParameterDTO> getDisplayInfo() {
        return systemParameterService.getSystemParameterInfo(ParamConstants.Classify.UI.getValue());
    }

    @GetMapping(value = "/ui/image/{imageId}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    @Log(title = "系统参数：获取UI图片", businessType = BusinessType.SELECT)
    public ResponseEntity<byte[]> image(@PathVariable("imageId") String imageId) {
        byte[] bytes = fileService.loadFileAsBytes(imageId);
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }

    @PostMapping(value = "/save/ui", consumes = {"multipart/form-data"})
    @Log(title = "系统参数：保存UI信息", businessType = BusinessType.UPDATE)
    public void saveUIInfo(@RequestPart("request") Map<String, List<SystemParameterDTO>> systemParameterMap, @RequestPart(value = "files", required = false) List<MultipartFile> bodyFiles) throws IOException {
        systemParameterService.saveUIInfo(systemParameterMap, bodyFiles);
    }

    @PostMapping(value = "/checkCustomDs")
    @Log(title = "系统参数：检查自定义数据源", businessType = BusinessType.SELECT)
    public boolean checkCustomDs() {
        try {
            Object cache = CacheUtils.get(DatasetCheckListener.CACHE_NAME, DatasetCheckListener.CACHE_KEY);
            return cache != null && (boolean) cache;
        } catch (Exception e) {
            return false;
        }
    }

}
