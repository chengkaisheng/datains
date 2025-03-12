package io.datains.fill.mapper;

import io.datains.fill.entry.DataFillData;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * FillFormDataMapper
 *
 * @author zhangzihang
 * @since 2025-02-24 18:14
 */
public interface DataFillDataMapper {
    int insert(DataFillData dataFillData);

    int update(DataFillData dataFillData);

    DataFillData getByFormId(@Param("formId") String formId);

    int deleteByFormIds(@Param("formIds") List<String> formIds);
}
