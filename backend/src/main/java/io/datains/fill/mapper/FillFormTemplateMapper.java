package io.datains.fill.mapper;

import io.datains.fill.entry.FillFormTemplate;
import org.apache.ibatis.annotations.Param;

/**
 * FillFormTemplateMapper
 *
 * @author zhangzihang
 * @since 2025-02-25 16:37
 */
public interface FillFormTemplateMapper {
    FillFormTemplate getById(@Param("id") String id);
}
