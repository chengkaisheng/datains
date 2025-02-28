package io.datains.fill.mapper;

import io.datains.fill.controller.vo.FillFormInfoReqVo;
import io.datains.fill.controller.vo.FillFormInfoVo;
import io.datains.fill.entry.FillFormInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * FillFormInfoMapper
 *
 * @author zhangzihang
 * @since 2025-02-24 16:55
 */
public interface FillFormInfoMapper {
    int insert(FillFormInfo fillFormInfo);

    int update(FillFormInfo fillFormInfo);

    int deleteByIds(@Param("ids") List<String> ids);

    List<FillFormInfoVo> select(FillFormInfoReqVo request);

    List<FillFormInfoVo> selectForm(FillFormInfoReqVo request);

    List<String> findChildrenIds(@Param("parentIds") List<String> parentIds);

    List<FillFormInfoVo> searchByName(@Param("keyword") String keyword);

    List<String> getParentChain(@Param("id") String id);

    List<String> findAllChildrenIds(@Param("id") String id);

    List<FillFormInfoVo> getNodesByIds(@Param("ids") List<String> ids);
}
