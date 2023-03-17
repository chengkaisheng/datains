package io.datains.base.mapper.ext;



import io.datains.auth.api.dto.CurrentRoleDto;
import io.datains.auth.entity.SysUserEntity;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface AuthMapper {



    List<String> roleCodes(@Param("userId") Long userId);


    List<String> permissions(@Param("userId") Long userId);

    List<String> permissionsAll();

    List<Long> userMenuIds(@Param("userId") Long userId);


    SysUserEntity findUser(@Param("userId") Long userId);

    SysUserEntity findUserByName(@Param("username") String username);

    int updateEnabled(@Param("uid") Integer uid);

    SysUserEntity findLdapUserByName(@Param("username") String username);

    SysUserEntity findUserBySub(@Param("sub") String sub);


    List<CurrentRoleDto> roles(@Param("userId") Long userId);

}
