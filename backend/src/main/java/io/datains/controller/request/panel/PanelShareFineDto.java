package io.datains.controller.request.panel;

import io.datains.commons.model.ShareAuthInfo;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;


@Data
public class PanelShareFineDto implements Serializable {


    private static final long serialVersionUID = -792964171742204428L;
    @ApiModelProperty("资源ID")
    private  String resourceId;
    @ApiModelProperty("分享信息")
    private List<ShareAuthInfo> shareAuthInfos;
}
