package io.datains.fill.mapper;

import io.datains.fill.entry.DataFillTask;
import io.datains.fill.entry.DataFillTaskExample;
import io.datains.fill.entry.DataFillTaskWithBLOBs;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DataFillTaskMapper {
    long countByExample(DataFillTaskExample example);

    int deleteByExample(DataFillTaskExample example);

    int deleteByPrimaryKey(Long id);

    int insert(DataFillTaskWithBLOBs record);

    int insertSelective(DataFillTaskWithBLOBs record);

    List<DataFillTaskWithBLOBs> selectByExampleWithBLOBs(DataFillTaskExample example);

    List<DataFillTask> selectByExample(DataFillTaskExample example);

    DataFillTaskWithBLOBs selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") DataFillTaskWithBLOBs record, @Param("example") DataFillTaskExample example);

    int updateByExampleWithBLOBs(@Param("record") DataFillTaskWithBLOBs record, @Param("example") DataFillTaskExample example);

    int updateByExample(@Param("record") DataFillTask record, @Param("example") DataFillTaskExample example);

    int updateByPrimaryKeySelective(DataFillTaskWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(DataFillTaskWithBLOBs record);

    int updateByPrimaryKey(DataFillTask record);
}
