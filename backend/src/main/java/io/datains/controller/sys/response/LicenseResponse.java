package io.datains.controller.sys.response;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/04/28/ 14:15
 * @Description
 */
@Data
public class LicenseResponse {
    /**
     *  公司
     */
    private String corporation;
    /**
     * 授权数量
     */
    private Integer count;
    /**
     * 版本
     */
    private String edition;

    /**
     * 产品
     */
    private String product;

    /**
     * 过期时间
     */
    private String expired;

    /**
     * 版本号
     */
    private String licenseVersion;
}
