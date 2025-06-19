package io.datains.controller.sys.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class BasicInfo implements Serializable {

    @ApiModelProperty("请求超时时间")
    private String frontTimeOut;
    @ApiModelProperty("消息保留时间")
    private String msgTimeOut;
    @ApiModelProperty("在线excel返回值数量")
    private String onLineExcelCount;
    @ApiModelProperty("显示首页")
    private String openHomePage;

}
