package io.datains.fill.service;

import io.datains.fill.controller.vo.FillFormDataCreateReqVo;
import io.datains.fill.controller.vo.FillFormInfoCreateReqVo;
import io.datains.fill.controller.vo.FillFormInfoReqVo;
import io.datains.fill.controller.vo.FillFormInfoVo;
import io.datains.fill.entry.FillFormData;
import io.datains.fill.entry.FillFormInfo;

import java.util.List;

/**
 * FillFormInfoService
 *
 * @author zhangzihang
 * @since 2025-02-24 16:57
 */
public interface FillFormInfoService {
    FillFormInfo insert(FillFormInfoCreateReqVo fillFormInfo);

    void update(FillFormInfo fillFormInfo);

    void delete(String id);

    void saveFormData(FillFormDataCreateReqVo vo);

    FillFormData getFormData(String formId);


    List<FillFormInfoVo> tree(FillFormInfoReqVo request);

    List<FillFormInfoVo> selectForm(FillFormInfoReqVo request);
}
