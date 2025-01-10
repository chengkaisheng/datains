DROP FUNCTION IF EXISTS `copy_auth`;
delimiter ;;
create
    definer = root@localhost function copy_auth(authSource varchar(255), authSourceType varchar(255),
                                                authUser varchar(255)) returns varchar(255) reads sql data
BEGIN
    DECLARE authId varchar(255);
    DECLARE userId varchar(255);
    DECLARE copyId varchar(255);
    select uuid() into authId;
    select uuid() into copyId;
    select max(sys_user.user_id) into userId from sys_user where username = authUser;
    delete
    from sys_auth_detail
    where auth_id in (select id
                      from sys_auth
                      where sys_auth.auth_source = authSource
                        and sys_auth.auth_source_type = authSourceType);
    delete from sys_auth where sys_auth.auth_source = authSource and sys_auth.auth_source_type = authSourceType;
    INSERT INTO sys_auth (id,
                          auth_source,
                          auth_source_type,
                          auth_target,
                          auth_target_type,
                          auth_time,
                          auth_user)
    VALUES (authId,
            authSource,
            authSourceType,
            userId,
            'user',
            unix_timestamp(
                    now()) * 1000, 'auto');
    INSERT INTO sys_auth_detail (id,
                                 auth_id,
                                 privilege_name,
                                 privilege_type,
                                 privilege_value,
                                 privilege_extend,
                                 remark,
                                 create_user,
                                 create_time)
    SELECT uuid()                       AS id,
           authId                       AS auth_id,
           sys_auth_detail.privilege_name,
           sys_auth_detail.privilege_type,
           CASE
               WHEN sys_auth_detail.privilege_name = 'i18n_auth_export' and sys_auth_detail.privilege_type = 3 THEN 0
               ELSE 1
               END                      AS privilege_value,
           sys_auth_detail.privilege_extend,
           sys_auth_detail.remark,
           'auto'                       AS create_user,
           unix_timestamp(now()) * 1000 AS create_time
    FROM sys_auth_detail
    where auth_id = authSourceType;
/**继承第一父级权限**/
    insert into sys_auth(id,
                         auth_source,
                         auth_source_type,
                         auth_target,
                         auth_target_type,
                         auth_time,
                         auth_user,
                         copy_from,
                         copy_id)
    SELECT uuid()         as id,
           authSource     as auth_source,
           authSourceType as auth_source_type,
           auth_target,
           auth_target_type,
           NOW() * 1000   as auth_time,
           'auto'         as auth_user,
           id             as copy_from,
           copyId         as copy_id
    FROM sys_auth
    WHERE auth_source = (SELECT pid
                         FROM v_auth_model
                         WHERE id = authSource
                           AND model_type = authSourceType)
      AND auth_source_type = authSourceType
      and concat(auth_target, '-', auth_target_type) != CONCAT(userId, '-', 'user');
    INSERT INTO sys_auth_detail (id,
                                 auth_id,
                                 privilege_name,
                                 privilege_type,
                                 privilege_value,
                                 privilege_extend,
                                 remark,
                                 create_user,
                                 create_time,
                                 copy_from,
                                 copy_id)
    SELECT uuid()                AS id,
           sa_copy.t_id          AS auth_id,
           sys_auth_detail.privilege_name,
           sys_auth_detail.privilege_type,
           sys_auth_detail.privilege_value,
           sys_auth_detail.privilege_extend,
           sys_auth_detail.remark,
           'auto'                AS create_user,
           unix_timestamp(
                   now()) * 1000 AS create_time,
           id                    AS copy_from,
           copyId                AS copy_id
    FROM sys_auth_detail
             INNER JOIN (SELECT id        AS t_id,
                                copy_from AS s_id
                         FROM sys_auth
                         WHERE copy_id = copyId) sa_copy ON sys_auth_detail.auth_id = sa_copy.s_id;
    RETURN 'success';
END;;
delimiter ;
