package io.datains;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.ldap.LdapAutoConfiguration;
import org.springframework.boot.autoconfigure.quartz.QuartzAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableCaching
@SpringBootApplication(exclude = {
        QuartzAutoConfiguration.class,
        LdapAutoConfiguration.class
})
@ServletComponentScan
@EnableScheduling
@MapperScan(basePackages = "io.datains.base.mapper")
@PropertySource(value = {"file:/opt/datains/conf/datains.properties"}, encoding = "UTF-8", ignoreResourceNotFound = true)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        System.out.println("\n" +
                "                   _ooOoo_\n" +
                "                  o8888888o\n" +
                "                  88\" . \"88\n" +
                "                  (| -_- |)\n" +
                "                  O\\  =  /O\n" +
                "               ____/`---'\\____\n" +
                "             .'  \\\\|     |//  `.\n" +
                "            /  \\\\|||  :  |||//  \\\n" +
                "           /  _||||| -:- |||||-  \\\n" +
                "           |   | \\\\\\  -  /// |   |\n" +
                "           | \\_|  ''\\---/''  |   |\n" +
                "           \\  .-\\__  `-`  ___/-. /\n" +
                "         ___`. .'  /--.--\\  `. . __\n" +
                "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".\n" +
                "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |\n" +
                "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /\n" +
                "======`-.____`-.___\\_____/___.-`____.-'======\n" +
                "                   `=---='\n" +
                "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n" +
                "         佛祖保佑       永无BUG\n" +
                "");
        System.err.println("启动成功");
    }
}
