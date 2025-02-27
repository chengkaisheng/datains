package io.datains.fill.service;

import io.datains.fill.controller.vo.FillFormDataCreateReqVo;
import io.datains.fill.controller.vo.FillFormInfoCreateReqVo;
import io.datains.fill.controller.vo.FillFormInfoReqVo;
import io.datains.fill.controller.vo.FillFormInfoVo;
import io.datains.fill.entry.FillFormData;
import io.datains.fill.entry.FillFormInfo;
import io.datains.fill.entry.FillFormTemplate;

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

    void delete(Long id);

    List<FillFormInfoVo> select(FillFormInfoReqVo request);

    void saveFormData(FillFormDataCreateReqVo vo);

    FillFormData getFormData(Long formId);

    FillFormTemplate getFormTemplate(Long id);
}
