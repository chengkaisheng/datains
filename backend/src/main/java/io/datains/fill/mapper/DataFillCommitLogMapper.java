package io.datains.fill.mapper;

import io.datains.fill.entry.DataFillCommitLog;
import io.datains.fill.entry.DataFillCommitLogExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DataFillCommitLogMapper {
    long countByExample(DataFillCommitLogExample example);

    int deleteByExample(DataFillCommitLogExample example);

    int deleteByPrimaryKey(String id);

    int insert(DataFillCommitLog record);

    int insertSelective(DataFillCommitLog record);

    List<DataFillCommitLog> selectByExample(DataFillCommitLogExample example);

    DataFillCommitLog selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") DataFillCommitLog record, @Param("example") DataFillCommitLogExample example);

    int updateByExample(@Param("record") DataFillCommitLog record, @Param("example") DataFillCommitLogExample example);

    int updateByPrimaryKeySelective(DataFillCommitLog record);

    int updateByPrimaryKey(DataFillCommitLog record);
}
