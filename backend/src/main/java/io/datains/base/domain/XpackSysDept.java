package io.datains.base.domain;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 15:36
 * @Description
 */
@Data
public class XpackSysDept {

    private Long deptId;
    private Long pid;
    private Integer subCount;
    private String name;
    private Integer deptSort;
    private String createBy;
    private String updateBy;
    private Long createTime;
    private Long updateTime;
     private boolean isTop;
    private static final long serialVersionUID = 1L;
}
