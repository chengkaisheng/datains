package io.datains.controller.sys.response;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/04/02
 * @Description
 */
@Data
public class LicenseVo {

    /**
    *  公司
    */
    private String company;
    /**
     * 过期时间
     */
    private String expirationTime;
    /**
     * 版本
     */
    private String edition;

    /**
     * 产品
     */
    private String product;

    /**
     * 船舰时间
     */
    private String createTime;

    /**
     * 版本名称
     */
    private String editionName;

    /**
     * 服务器mac地址
     */
    private String macAdress;

    /**
     * 授权数量
     */
    private String amount;

    /**
     * 状态
     */
    private Integer state;

}
