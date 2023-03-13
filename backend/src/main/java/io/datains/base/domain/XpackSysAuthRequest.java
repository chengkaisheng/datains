package io.datains.base.domain;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:37
 * @Description
 */
@Data
public class XpackSysAuthRequest {
    private List<String> authSources;
    private List<String> authTargets;
    private XpackSysAuthDetail authDetail;
    private String direction;
    private String id;
    private String authSource;
    private String authSourceType;
    private String authTarget;
    private String authTargetType;
    private Long authTime;
    private String authDetails;
    private String authUser;
    private Date updateTime;
    private static final long serialVersionUID = 1L;
}
