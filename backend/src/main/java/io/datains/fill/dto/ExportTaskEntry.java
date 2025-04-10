package io.datains.fill.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * ExportTaskEntry
 *
 * @author zhangzihang
 * @since 2025-04-10 09:52
 */
@Getter
@Setter
public class ExportTaskEntry {
    private String taskId;
    /**
     * begin、running、stop、end、error
     */
    public String status;
    /**
     * 进度 %
     */
    private Integer progress;
    private String zipPath;
    private String pid;
    private String password;
    private String waterMark;

    public synchronized void setStatus(String status) {
        this.status = status;
    }
}
