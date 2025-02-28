package io.datains.fill.mapper;

import io.datains.fill.entry.FillFormData;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * FillFormDataMapper
 *
 * @author zhangzihang
 * @since 2025-02-24 18:14
 */
public interface FillFormDataMapper {
    int insert(FillFormData fillFormData);

    int update(FillFormData fillFormData);

    FillFormData getByFormId(@Param("formId") String formId);

    int deleteByFormIds(@Param("formIds") List<String> formIds);
}
