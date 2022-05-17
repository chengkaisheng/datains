package io.datains.plugins.server;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import io.datains.commons.utils.EncryptUtil;
import io.datains.commons.utils.ServletUtils;
import io.datains.plugins.common.dto.PluginSysMenu;
import io.datains.plugins.common.dto.StaticResource;
import io.datains.plugins.common.service.PluginComponentService;
import io.datains.plugins.common.service.PluginMenuService;
import io.datains.plugins.config.SpringContextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@ApiIgnore
@RestController
@RequestMapping("/api/pluginCommon")
public class PluginCommonServer {

    @Autowired
    ResourceLoader resourceLoader;

    private static String menusDir = "/opt/datains/plugins/menus/menus.key";

   /* @GetMapping("/async/{menuId}")
    public void menuInfo(@PathVariable Long menuId) {
        Map<String, PluginMenuService> pluginMenuServiceMap = SpringContextUtil.getApplicationContext().getBeansOfType(PluginMenuService.class);
        pluginMenuServiceMap.values().stream().forEach(service -> {
            AtomicReference<PluginSysMenu> atomicReference = new AtomicReference<>();
            List<PluginSysMenu> menus = service.menus();
            if (menus.stream().anyMatch(menu -> {
                atomicReference.set(menu);
                return menu.getMenuId() == menuId;
            })) {
                String jsName = atomicReference.get().getComponent();
                HttpServletResponse response = ServletUtils.response();
                BufferedInputStream bis = null;
                InputStream inputStream = null;
                OutputStream os = null; //输出流
                try{
                    inputStream = service.vueResource(jsName);
                    byte[] buffer = new byte[1024];
                    os = response.getOutputStream();
                    bis = new BufferedInputStream(inputStream);
                    int i = bis.read(buffer);
                    while(i != -1){
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    os.flush();
                }catch (Exception e) {
                    e.printStackTrace();
                }finally {
                    try {
                        bis.close();
                        inputStream.close();
                        os.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            return;
        });
    }*/

    @GetMapping("/async/{menuId}")
    public void menuInfo(@PathVariable Long menuId) throws IOException {
            AtomicReference<PluginSysMenu> atomicReference = new AtomicReference<>();
            List<PluginSysMenu> menus = getMenus();
            if (menus.stream().anyMatch(menu -> {
                atomicReference.set(menu);
                return menu.getMenuId() == menuId;
            })) {
                String jsName = atomicReference.get().getComponent();
                HttpServletResponse response = ServletUtils.response();
                BufferedInputStream bis = null;
                InputStream inputStream = null;
                OutputStream os = null; //输出流
                try{
                    String papers = "classpath:/js/"+jsName+".js";
                    Resource resource = resourceLoader.getResource(papers);
                    inputStream = resource.getInputStream();
                    byte[] buffer = new byte[1024];
                    os = response.getOutputStream();
                    bis = new BufferedInputStream(inputStream);
                    int i = bis.read(buffer);
                    while(i != -1){
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    os.flush();
                }catch (Exception e) {
                    e.printStackTrace();
                }finally {
                    try {
                        bis.close();
                        inputStream.close();
                        os.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            return;
    }


    public List<PluginSysMenu> getMenus() throws IOException {
        try{
            String fileName = menusDir;
            Path path = Paths.get(fileName);
            byte[] bytes = Files.readAllBytes(path);
            List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);//原文出自【易百教程】，商业转载请联系作者获得授权，非商业请保留原文链接：https://www.yiibai.com/java/java-read-text-file.html
            System.out.println(allLines.get(0));
            EncryptUtil instance = EncryptUtil.getInstance();
            String s1 = instance.Base64Decode(allLines.get(0));
            System.err.println(s1);
            //DES解密
            String s3 = instance.DESdecode(s1,"DataIns");
            String res = JSON.toJSON(s3).toString();
            System.err.println(res);
            List<PluginSysMenu> list = null;

            list = JSONArray.parseArray(res,PluginSysMenu.class);
            return list;
        }catch (Exception e) {
            return null;
        }
    }

  /*  @GetMapping("/component/{componentName}")
    public void componentInfo(@PathVariable String componentName) {
       Map<String, PluginComponentService> beansOfType = SpringContextUtil.getApplicationContext().getBeansOfType(PluginComponentService.class);
       beansOfType.values().stream().forEach(service -> {
            List<String> components = service.components();
            if (components.contains(componentName)) {
                HttpServletResponse response = ServletUtils.response();
                BufferedInputStream bis = null;
                InputStream inputStream = null;
                OutputStream os = null; //输出流
                try{
                    inputStream = service.vueResource(componentName);
                    byte[] buffer = new byte[1024];
                    os = response.getOutputStream();
                    bis = new BufferedInputStream(inputStream);
                    int i = bis.read(buffer);
                    while(i != -1){
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    os.flush();
                }catch (Exception e) {
                    e.printStackTrace();
                }finally {
                    try {
                        bis.close();
                        inputStream.close();
                        os.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                return;
            }
       });
    }*/


    @GetMapping("/component/{componentName}")
    public void componentInfo(@PathVariable String componentName) {
                HttpServletResponse response = ServletUtils.response();
                BufferedInputStream bis = null;
                InputStream inputStream = null;
                OutputStream os = null; //输出流
                try{
                    String papers = "classpath:/js/"+componentName+".js";
                    Resource resource = resourceLoader.getResource(papers);
                    inputStream = resource.getInputStream();
                    byte[] buffer = new byte[1024];
                    os = response.getOutputStream();
                    bis = new BufferedInputStream(inputStream);
                    int i = bis.read(buffer);
                    while(i != -1){
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    os.flush();
                }catch (Exception e) {
                    e.printStackTrace();
                }finally {
                    try {
                        bis.close();
                        inputStream.close();
                        os.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                return;
    }


    @GetMapping("/staticInfo/{name}/{suffix}")
    public void staticInfo(@PathVariable("name") String name, @PathVariable("suffix") String suffix) {
        Map<String, PluginComponentService> beansOfType = SpringContextUtil.getApplicationContext().getBeansOfType(PluginComponentService.class);
        beansOfType.values().stream().forEach(service -> {
            List<StaticResource> staticResources = service.staticResources();

            if (staticResources.stream().anyMatch(resource -> resource.match(name, suffix))) {
                HttpServletResponse response = ServletUtils.response();
                BufferedInputStream bis = null;
                InputStream inputStream = null;
                OutputStream os = null; //输出流
                try{
                    inputStream = service.vueResource(name, suffix);
                    byte[] buffer = new byte[1024];
                    os = response.getOutputStream();
                    bis = new BufferedInputStream(inputStream);
                    int i = bis.read(buffer);
                    while(i != -1){
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    response.setContentType("image/svg+xml");
                    os.flush();
                }catch (Exception e) {
                    e.printStackTrace();
                }finally {
                    try {
                        bis.close();
                        inputStream.close();
                        os.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                return;
            }
        });
    }
}
