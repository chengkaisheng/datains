package io.datains.controller.sys;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;



import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

/**
 * @Author Mr.zhang
 * @Date: 2022/04/29/ 12:13
 * @Description
 */
@ApiIgnore
@RequestMapping("/api/sysjs")
@RestController
public class SysJsController {

    @Autowired
    ResourceLoader resourceLoader;

    @ApiOperation("文件名读取资源文件")
    @GetMapping("/getJs")
    public String getJs(@RequestParam String name) throws IOException {
        String papers = "classpath:/js/"+name+".js";
        Resource resource = resourceLoader.getResource(papers);
        InputStream is = resource.getInputStream();
        InputStreamReader isr = new InputStreamReader(is);
        BufferedReader br = new BufferedReader(isr);
        String data = null;
        String a= null;
        while((data = br.readLine()) != null) {
            System.out.println(data);
            a  = a + data;
        }

        br.close();
        isr.close();
        is.close();
        return a;
    }


}
