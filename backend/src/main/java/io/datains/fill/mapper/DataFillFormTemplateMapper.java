package io.datains.fill.mapper;

import io.datains.fill.dto.DataFillFormTemplateDTO;
import io.datains.fill.entry.DataFillFormTemplate;
import io.datains.fill.entry.DataFillFormTemplateWithBLOBs;
import io.datains.fill.request.DataFillFormTemplateRequest;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DataFillFormTemplateMapper {

    Integer countRepeatName(DataFillFormTemplate dataFillFormTemplate);

    int insertSelective(DataFillFormTemplateWithBLOBs record);

    List<DataFillFormTemplateDTO> search(DataFillFormTemplateRequest request);

    List<DataFillFormTemplateDTO> selectTemplate(DataFillFormTemplateRequest request);

    int updateByPrimaryKeySelective(DataFillFormTemplateWithBLOBs record);

    DataFillFormTemplateWithBLOBs selectByPrimaryKey(@Param("id") String id);

    void deleteByIds(@Param("ids") List<String> ids);
}
