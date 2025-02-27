package io.datains.plugins.server;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import io.datains.base.domain.*;
import io.datains.commons.exception.DEException;
import io.datains.commons.pool.PriorityThreadPoolExecutor;
import io.datains.commons.utils.*;
import io.datains.plugins.xpack.email.dto.request.XpackEmailViewRequest;
import io.datains.plugins.xpack.email.dto.request.XpackPixelEntity;
import io.datains.service.ScheduleService;
import io.datains.service.sys.EmailXpackService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.util.List;
import java.util.concurrent.Future;

@ApiIgnore
@RequestMapping("/plugin/task")
@RestController
public class XEmailTaskServer {

    @Autowired
    private ScheduleService scheduleService;

    @Resource
    private PriorityThreadPoolExecutor priorityExecutor;

    @Resource
    private EmailXpackService emailXpackService;

    @RequiresPermissions("task-email:read")
    @PostMapping("/queryTasks/{goPage}/{pageSize}")
    public Pager<List<XpackTaskGridDTO>> queryTask(@PathVariable int goPage, @PathVariable int pageSize,
                                                   @RequestBody XpackGridRequest request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        List<XpackTaskGridDTO> tasks = emailXpackService.taskGrid(request);
        if (CollectionUtils.isNotEmpty(tasks)) {
            tasks.forEach(item -> {
                if (CronUtils.taskExpire(item.getEndTime())) {
                    item.setNextExecTime(null);
                }else {
                    GlobalTaskEntity globalTaskEntity = new GlobalTaskEntity();
                    globalTaskEntity.setRateType(item.getRateType());
                    globalTaskEntity.setRateVal(item.getRateVal());
                    try{
                        String cron = CronUtils.cron(globalTaskEntity);
                        if (StringUtils.isNotBlank(cron)) {
                            Long nextTime = CronUtils.getNextTriggerTime(cron).getTime();
                            item.setNextExecTime(nextTime);
                        }
                    }catch (Exception e) {
                        item.setNextExecTime(null);
                    }
                }

            });
        }

        Pager<List<XpackTaskGridDTO>> listPager = PageUtils.setPageInfo(page, tasks);
        return listPager;
    }

    @RequiresPermissions("task-email:add")
    @PostMapping("/save")
    public void save(@RequestBody XpackEmailCreate param) throws Exception {
        XpackEmailTaskRequest request = param.fillContent();
        request.setCreator(AuthUtils.getUser().getUserId());
        emailXpackService.save(request);
        GlobalTaskEntity globalTask = BeanUtils.copyBean(new GlobalTaskEntity(), request);
        scheduleService.addSchedule(globalTask);
    }

    @RequiresPermissions("task-email:read")
    @PostMapping("/queryForm/{taskId}")
    public XpackEmailCreate queryForm(@PathVariable Long taskId) {

        XpackEmailTaskRequest taskForm = emailXpackService.taskForm(taskId);
        XpackEmailCreate xpackEmailCreate = new XpackEmailCreate();
        byte[] bytes = taskForm.getContent();

        if (ObjectUtils.isNotEmpty(bytes)) {
            String emailContent;
            try {
                emailContent = new String(bytes, "UTF-8");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            taskForm.setContent(null);
            xpackEmailCreate.setEmailContent(emailContent);
        }
        xpackEmailCreate.setRequest(taskForm);
        return xpackEmailCreate;
    }

    @PostMapping("/preview")
    public String preview(@RequestBody XpackEmailViewRequest request) {
        String panelId = request.getPanelId();
        String content = request.getContent();

        String url = ServletUtils.domain() + "/#/previewScreenShot/" + panelId + "/true";

        String token = ServletUtils.getToken();
        String fileId = null;
        try {

            System.err.println(url);
            System.err.println(token);
            System.err.println(buildPixel(request.getPixel()));

            Future<?> future = priorityExecutor.submit(() -> {
                try {
                    return emailXpackService.print(url, token, buildPixel(request.getPixel()));
                } catch (Exception e) {
                    LogUtil.error(e.getMessage(), e);
                    DEException.throwException("预览失败，请联系管理员");
                }
                return null;
            }, 0);
            Object object = future.get();
            if (ObjectUtils.isNotEmpty(object)) {
                fileId = object.toString();
            }
        } catch (Exception e) {
            LogUtil.error(e.getMessage(), e);
            DEException.throwException("预览失败，请联系管理员");
        }
      /*  String imageUrl = "/system/ui/image/" + fileId;*/

        String imageUrl = "http://yimalingxian.oss-accelerate.aliyuncs.com/yimalingxian1602297075859.png";

      /*  String html = "<div>" +
                "<h2>" + content + "</h2>" +
                "<img style='width: 100%;' id='" + panelId + "' src='" + imageUrl + "' />" +
                "</div>";*/
        String html = "<div>" +
                "<h2>" + content + "</h2>" +
                "<img style='width: 100%;' id='" + "d2bda4c3-3c25-40c6-bed3-994ffe2949df" + "' src='" + imageUrl + "' />" +
                "</div>";
        return html;

    }

    @RequiresPermissions("task-email:del")
    @PostMapping("/delete/{taskId}")
    public void delete(@PathVariable Long taskId) {
        try {
            XpackEmailTaskRequest request = emailXpackService.taskForm(taskId);
            GlobalTaskEntity globalTaskEntity = BeanUtils.copyBean(new GlobalTaskEntity(), request);
            scheduleService.deleteSchedule(globalTaskEntity);
            emailXpackService.delete(taskId);
        } catch (Exception e) {
            LogUtil.error(e);
            DEException.throwException(e);
        }
    }

    @PostMapping("/stop/{taskId}")
    public void stop(@PathVariable Long taskId) throws Exception {
        emailXpackService.stop(taskId);
    }

    @PostMapping("/queryInstancies/{goPage}/{pageSize}")
    public Pager<List<XpackTaskInstanceDTO>> instancesGrid(@PathVariable int goPage, @PathVariable int pageSize,
            @RequestBody XpackGridRequest request) {
        Page<Object> page = PageHelper.startPage(goPage, pageSize, true);
        List<XpackTaskInstanceDTO> instances = emailXpackService.taskInstanceGrid(request);
        Pager<List<XpackTaskInstanceDTO>> listPager = PageUtils.setPageInfo(page, instances);
        return listPager;
    }

  /*  @PostMapping("/execInfo/{instanceId}")
    public String execInfo(@PathVariable Long instanceId) {
        EmailXpackService emailXpackService = SpringContextUtil.getBean(EmailXpackService.class);
        GlobalTaskInstance instanceForm = emailXpackService.instanceForm(instanceId);
        return instanceForm.getInfo();
    }*/

    private XpackPixelEntity buildPixel(String pixel) {

        if (StringUtils.isBlank(pixel))
            return null;
        String[] arr = pixel.split("\\*");
        if (arr.length != 2)
            return null;
        try {
            XpackPixelEntity result = new XpackPixelEntity();
            int x = Integer.parseInt(arr[0].trim());
            int y = Integer.parseInt(arr[1].trim());
            result.setX(String.valueOf(x));
            result.setY(String.valueOf(y));
            return result;
        } catch (Exception e) {
            return null;
        }
    }

}
