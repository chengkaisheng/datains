package io.datains.base.domain;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:54
 * @Description
 */
@Data
public class XpackEmailTaskRequest extends XpackTaskCreateRequest{

    private Long id;

    private String title;

    private String panelId;

    private String recipients;

    private String pixel;

    private Long taskId;

    private byte[] content;
}
