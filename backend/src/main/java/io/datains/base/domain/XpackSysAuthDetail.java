package io.datains.base.domain;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:45
 * @Description
 */
@Data
public class XpackSysAuthDetail {
    private String id;
    private String authId;
    private String privilegeName;
    private Integer privilegeType;
    private Integer privilegeValue;
    private String privilegeExtend;
    private String remark;
    private String createUser;
    private Long createTime;
    private Long updateTime;
    private static final long serialVersionUID = 1L;
}
