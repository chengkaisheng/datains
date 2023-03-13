package io.datains.base.domain;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:43
 * @Description
 */
@Data
public class XpackBaseTreeRequest {
    private String id;
    private String name;
    private String modelType;
    private String pid;
    private String withExtend = "now";
    private String createBy;
    private String withAuth;

    public XpackBaseTreeRequest(String id, String modelType, String withExtend) {
        this.id = id;
        this.modelType = modelType;
        this.withExtend = withExtend;
    }
}
