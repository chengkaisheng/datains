package io.datains.base.mapper;


import io.datains.base.domain.PluginSimpleTreeNode;
import io.datains.base.domain.XpackSysDept;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 16:52
 * @Description
 */
public interface XpackExtDeptMapper {

    List<PluginSimpleTreeNode> nodesByExample(XpackSysDept paramXpackGridExample);

    @Update({" update sys_dept set sub_count = sub_count+1 where dept_id = #{deptId} "})
    int incrementalSubcount(@Param("deptId") Long paramLong);

    @Update({"<script>         update sys_user set dept_id = 0 where dept_id in         <foreach collection='ids' item='id' open='(' separator=',' close=')'>#{id}</foreach> </script>"})
    int updateUserDeptId(@Param("ids") List<Long> paramList);

    List<PluginSimpleTreeNode> allNodes();

    @Update({" update sys_dept set sub_count = sub_count-1 where dept_id = #{deptId} and sub_count > 0"})
    int decreasingSubcount(@Param("deptId") Long paramLong);

    @Delete({"<script>         delete from sys_dept where dept_id in         <foreach collection='ids' item='id' open='(' separator=',' close=')'>#{id}</foreach> </script>"})
    int batchDelete(@Param("ids") List<Long> paramList);

}
