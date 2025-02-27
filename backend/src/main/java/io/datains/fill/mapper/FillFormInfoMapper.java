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

    int logicalDelete(@Param("id") Long id,
                      @Param("updater") Long updater);

    List<FillFormInfoVo> select(FillFormInfoReqVo request);

    List<FillFormInfo> selectByParentIds(@Param("parentIds") List<Long> parentIds);

    Integer selectMaxVersionByParentId(@Param("parentId") Long parentId);

    List<Long> selectIdsById(@Param("id") Long id);
}
