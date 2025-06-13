DROP FUNCTION IF EXISTS `delete_auth_source`;
delimiter ;;

CREATE DEFINER=`root`@`localhost` FUNCTION `delete_auth_source`(authSource varchar(255),authSourceType varchar(255)) RETURNS varchar(255) CHARSET utf8mb4
    READS SQL DATA
BEGIN

    delete from sys_auth_detail where auth_id in (
        select id from  sys_auth where sys_auth.auth_source=authSource and sys_auth.auth_source_type=authSourceType
    );

    delete from sys_auth where sys_auth.auth_source=authSource and sys_auth.auth_source_type=authSourceType;

    delete from sys_dept_leader_auth where sys_dept_leader_auth.auth_source=authSource and sys_dept_leader_auth.auth_source_type=authSourceType;

    RETURN 'success';

END;;
delimiter ;
