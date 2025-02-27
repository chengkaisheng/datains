package io.datains.fill.mapper;

import io.datains.fill.entry.DataFillForm;
import io.datains.fill.entry.DataFillFormExample;
import io.datains.fill.entry.DataFillFormWithBLOBs;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DataFillFormMapper {
    long countByExample(DataFillFormExample example);

    int deleteByExample(DataFillFormExample example);

    int deleteByPrimaryKey(String id);

    int insert(DataFillFormWithBLOBs record);

    int insertSelective(DataFillFormWithBLOBs record);

    List<DataFillFormWithBLOBs> selectByExampleWithBLOBs(DataFillFormExample example);

    List<DataFillForm> selectByExample(DataFillFormExample example);

    DataFillFormWithBLOBs selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") DataFillFormWithBLOBs record, @Param("example") DataFillFormExample example);

    int updateByExampleWithBLOBs(@Param("record") DataFillFormWithBLOBs record, @Param("example") DataFillFormExample example);

    int updateByExample(@Param("record") DataFillForm record, @Param("example") DataFillFormExample example);

    int updateByPrimaryKeySelective(DataFillFormWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(DataFillFormWithBLOBs record);

    int updateByPrimaryKey(DataFillForm record);
}
