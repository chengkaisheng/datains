package io.datains.base.domain;

import lombok.Data;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:41
 * @Description
 */
@Data
public class XpackVAuthModelDTO {
    private List<io.datains.plugins.xpack.auth.dto.response.XpackVAuthModelDTO> children;
    private Boolean leaf;
    private Integer childrenCount;
    private Boolean hasChildren;

    private String id;
    private String name;
    private String label;
    private String pid;
    private String nodeType;
    private String modelType;
    private String modelInnerType;
    private String authType;
    private String createBy;
    private static final long serialVersionUID = 1L;
}
