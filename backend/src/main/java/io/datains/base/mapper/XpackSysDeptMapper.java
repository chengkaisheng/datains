package io.datains.base.mapper;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 15:47
 * @Description
 */
import java.util.List;

import io.datains.base.domain.XpackSysDept;
import org.apache.ibatis.annotations.Param;

public interface XpackSysDeptMapper {
    int updateByExample(XpackSysDept xpackSysDept);

    int deleteByExample(XpackSysDept paramXpackSysDeptExample);

    int deleteByPrimaryKey(Long paramLong);

    List<XpackSysDept> selectByExample(XpackSysDept paramXpackSysDeptExample);
    List<XpackSysDept> selectLikeName(XpackSysDept paramXpackSysDeptExample);

    int insert(XpackSysDept paramXpackSysDept);

    int updateByPrimaryKeySelective(XpackSysDept paramXpackSysDept);

    int insertSelective(XpackSysDept paramXpackSysDept);

    XpackSysDept selectByPrimaryKey(Long paramLong);

    long countByExample(XpackSysDept paramXpackSysDeptExample);

    int updateByExampleSelective(XpackSysDept paramXpackSysDept);

    int updateByPrimaryKey(XpackSysDept paramXpackSysDept);
}
