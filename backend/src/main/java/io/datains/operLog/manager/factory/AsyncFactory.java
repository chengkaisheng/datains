package io.datains.operLog.manager.factory;

import io.datains.operLog.entity.SysOperLog;
import io.datains.operLog.service.SysOperLogService;
import io.datains.operLog.utils.SpringUtils;

import java.util.TimerTask;

/**
 * 异步工厂（产生任务用）
 *
 * @author engifile
 */
public class AsyncFactory {
    /**
     * 操作日志记录
     *
     * @param operLog 操作日志信息
     * @return 任务task
     */
    public static TimerTask recordOper(final SysOperLog operLog) {
        return new TimerTask() {
            @Override
            public void run() {
                SpringUtils.getBean(SysOperLogService.class).insertOperlog(operLog);
            }
        };
    }
}
