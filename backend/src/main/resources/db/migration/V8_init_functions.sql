-- ----------------------------
-- Function structure for GET_V_AUTH_MODEL_WITH_PRIVILEGE
-- ----------------------------
CREATE OR REPLACE FUNCTION GET_V_AUTH_MODEL_WITH_PRIVILEGE (userId LONGVARCHAR,modelType varchar(255),privilegeType varchar(255))
              RETURN LONGVARCHAR AS
              oTempLeafIds LONGVARCHAR;

BEGIN
select WM_CONCAT(auth_source) into oTempLeafIds
from (
         select
             sys_auth.auth_source_type,
             sys_auth.auth_source,
             sys_auth_detail.privilege_value,
             sys_auth.auth_target,
             count(1)over(partition by sys_auth.auth_source_type,sys_auth.auth_source ) as cn ,
             sum(sys_auth_detail.privilege_value)over(partition by sys_auth.auth_source_type,sys_auth.auth_source ) as sn
         from (
                  select id,auth_source_type,auth_source,auth_target,auth_target_type
                  from sys_auth
                  where sys_auth.auth_source_type = modelType
              ) sys_auth
                  inner JOIN (
             select auth_id,privilege_value
             from sys_auth_detail
             where cast(sys_auth_detail.privilege_type as varchar) = privilegeType
         )sys_auth_detail
                             ON sys_auth.id = sys_auth_detail.auth_id
                  left join (
             SELECT dept_id,user_id,is_admin FROM sys_user
         ) sys_user
                            on sys_user.user_id = sys_auth.auth_target
                  left join (
             SELECT role_id,user_id FROM sys_users_roles
         ) sys_users_roles
                            on sys_users_roles.user_id = sys_auth.auth_target
         where case when sys_auth.auth_target_type = 'dept' and sys_auth.auth_target in sys_user.dept_id        then true
             when sys_auth.auth_target_type = 'user' and sys_auth.auth_target = userId                   then true
             when sys_auth.auth_target_type = 'role' and sys_auth.auth_target in sys_users_roles.role_id then true
             when sys_user.is_admin = 1 then true end
     ) tmp
         left join (
    SELECT is_admin,user_id FROM sys_user
) tmp2
                   on tmp.auth_target = tmp2.user_id
where  (sn > 0 or tmp2.is_admin = 1);
RETURN oTempLeafIds;
END;

-- ----------------------------
-- Function structure for GET_V_AUTH_MODEL_WITH_PARENT
-- ----------------------------
CREATE OR REPLACE FUNCTION GET_V_AUTH_MODEL_WITH_PARENT(childrenId LONGVARCHAR,modelType varchar(255))
              RETURN LONGVARCHAR AS
              oTemp LONGVARCHAR;
oTempParent LONGVARCHAR;

BEGIN
    oTemp = '';
oTempParent = CAST(childrenId AS LONGVARCHAR);

WHILE oTempParent IS NOT NULL LOOP
oTemp = CONCAT(oTemp,',',oTempParent);
SELECT WM_CONCAT(distinct pid) INTO oTempParent FROM V_AUTH_MODEL WHERE FIND_IN_SET(id,oTempParent) and V_AUTH_MODEL.model_type=modelType order by pid asc;
END LOOP;
RETURN oTemp;
END;



-- ----------------------------
-- Function structure for GET_V_AUTH_MODEL_ID_P_USE
-- ----------------------------
CREATE OR REPLACE FUNCTION GET_V_AUTH_MODEL_ID_P_USE(userId LONGVARCHAR,modelType varchar(255))
              RETURN LONGVARCHAR AS
              oTempLeafIds LONGVARCHAR;
oTempAllIds LONGVARCHAR;

BEGIN
select GET_V_AUTH_MODEL_WITH_PRIVILEGE(userId,modelType,1) into oTempLeafIds;
select WM_CONCAT(id) into oTempAllIds from (select GET_V_AUTH_MODEL_WITH_PARENT ( oTempLeafIds ,modelType) cids) t, v_auth_model where v_auth_model.model_type=modelType and find_in_set(v_auth_model.id, cids) order by id asc;

RETURN oTempAllIds;
END;

drop function FIND_IN_SET;
CREATE OR REPLACE FUNCTION FIND_IN_SET
(
    piv_str1 varchar2(32000),
    piv_str2 varchar2(32000),
    p_sep    varchar2 := ',')
RETURN NUMBER
                            IS
                l_idx     number:=0;                 -- 用于计算piv_str2中分隔符的位置
str       varchar2(32000);             -- 根据分隔符截取的子字符串
piv_str   varchar2(32000) := piv_str2; -- 将piv_str2赋值给piv_str
res       number        :=0;         -- 返回结果
loopIndex number        :=0;
BEGIN
    -- 如果piv_str中没有分割符，直接判断piv_str1和piv_str是否相等，相等 res=1
    IF instr(piv_str, p_sep, 1) = 0 THEN
                        IF piv_str          = piv_str1 THEN
                                res        := 1;
END IF;
ELSE
                        -- 循环按分隔符截取piv_str
                        LOOP
                                l_idx    := instr(piv_str, p_sep);
loopIndex:=loopIndex+1;
                                -- 当piv_str中还有分隔符时
IF l_idx > 0 THEN
                                        -- 截取第一个分隔符前的字段str
                                        str:= substr(piv_str, 1, l_idx-1);
                                        -- 判断 str 和piv_str1 是否相等，相等 res=1 并结束循环判断
IF str      = piv_str1 THEN
                                                res:= loopIndex;
EXIT;
END IF;
piv_str := substr(piv_str, l_idx+length(p_sep));
ELSE
                                        -- 当截取后的piv_str 中不存在分割符时，判断piv_str和piv_str1是否相等，相等 res=1
                                        IF piv_str  = piv_str1 THEN
                                                res:= loopIndex;
END IF;
                                        -- 无论最后是否相等，都跳出循环
EXIT;
END IF;
END LOOP;
                        -- 结束循环
END IF;
                -- 返回res
RETURN res;
END FIND_IN_SET;



CREATE OR REPLACE FUNCTION copy_auth(authSource varchar(255),authSourceType varchar(255),authUser varchar(255))
              RETURN varchar(255)
              as
              PRAGMA AUTONOMOUS_TRANSACTION;
authId varchar(255);
userId varchar(255);
copyId varchar(255);
list11 longvarchar;

BEGIN

SELECT newid() into authId;
SELECT newid() into copyId;
select max(sys_user.user_id) into userId from sys_user where username= authUser;
delete from sys_auth_detail where auth_id in (select id from sys_auth where sys_auth.auth_source=authSource and sys_auth.auth_source_type=authSourceType);
delete from sys_auth where sys_auth.auth_source=authSource and sys_auth.auth_source_type=authSourceType;

INSERT INTO sys_auth (
    id,
    auth_source,
    auth_source_type,
    auth_target,
    auth_target_type,
    auth_time,
    auth_user
)
VALUES
(
    authId,
    authSource,
    authSourceType,
    userId,
    'user',
    unix_timestamp(now())* 1000,'auto');

INSERT INTO  sys_auth_detail (
    id,
    auth_id,
    privilege_name,
    privilege_type,
    privilege_value,
    privilege_extend,
    remark,
    create_user,
    create_time
) SELECT
      newid() AS id,
      authId AS auth_id,
      sys_auth_detail.privilege_name,
      sys_auth_detail.privilege_type,
      1,
      sys_auth_detail.privilege_extend,
      sys_auth_detail.remark,
      'auto' AS create_user,
      unix_timestamp(now())* 1000 AS create_time
FROM sys_auth_detail where auth_id =authSourceType;

/**继承第一父级权限**/

insert into sys_auth(
    id,
    auth_source,
    auth_source_type,
    auth_target,
    auth_target_type,
    auth_time,
    auth_user,
    copy_from,
    copy_id
)
SELECT
    newid() as id,
    authSource as auth_source,
    authSourceType as auth_source_type,
    auth_target,
    auth_target_type,
    substr(replace(replace(replace(now(),'-',''),':',''),' ',''),0,14)*1000 as auth_time,
    'auto' as auth_user,
    id as copy_from,
    copyId as copy_id
FROM
    sys_auth
WHERE
        auth_source = (
        SELECT
            pid
        FROM
            v_auth_model
        WHERE
                id = authSource
          AND model_type = authSourceType
    )
  AND auth_source_type = authSourceType
  and  concat(auth_target,'-',auth_target_type) !=CONCAT(userId,'-','user');

INSERT INTO sys_auth_detail (
    id,
    auth_id,
    privilege_name,
    privilege_type,
    privilege_value,
    privilege_extend,
    remark,
    create_user,
    create_time,
    copy_from,
    copy_id
) SELECT
      newid() AS id,
      sa_copy.t_id AS auth_id,
      sys_auth_detail.privilege_name,
      sys_auth_detail.privilege_type,
      sys_auth_detail.privilege_value,
      sys_auth_detail.privilege_extend,
      sys_auth_detail.remark,
      'auto' AS create_user,
      unix_timestamp(now())* 1000 AS create_time,
      id AS copy_from,
      copyId AS copy_id
FROM
    sys_auth_detail
        INNER JOIN (
        SELECT
            id AS t_id,
            copy_from AS s_id
        FROM
            sys_auth
        WHERE
                copy_id = copyId
    ) sa_copy ON sys_auth_detail.auth_id = sa_copy.s_id;
commit;
RETURN 'success';
END;

CREATE OR REPLACE FUNCTION get_auths(authSource varchar(255),modelType varchar(255),userId varchar(255))
              RETURN LONGVARCHAR AS
              oTemp LONGVARCHAR;

BEGIN
SELECT wm_concat( DISTINCT privilege_extend) into oTemp
FROM (
         select
             sys_auth.auth_source_type,
             sys_auth.auth_source,
             sys_auth.auth_target,
             sys_auth_detail.privilege_extend
         from (
                  select id,auth_source_type,auth_source,auth_target,auth_target_type
                  from sys_auth
                  where sys_auth.auth_source= authSource
              ) sys_auth
                  left JOIN (
             select auth_id,privilege_value,privilege_extend
             from sys_auth_detail
             where sys_auth_detail.privilege_value =1
         )sys_auth_detail
                            ON sys_auth.id = sys_auth_detail.auth_id
                  left join (
             SELECT dept_id,user_id,is_admin FROM sys_user
         ) sys_user
                            on sys_user.user_id = sys_auth.auth_target
                  left join (
             SELECT role_id,user_id FROM sys_users_roles
         ) sys_users_roles
                            on sys_users_roles.user_id = sys_auth.auth_target
         where case when sys_auth.auth_target_type = 'dept' and sys_auth.auth_target in sys_user.dept_id        then true
             when sys_auth.auth_target_type = 'user' and sys_auth.auth_target = userId                   then true
             when sys_auth.auth_target_type = 'role' and sys_auth.auth_target in sys_users_roles.role_id then true
             when sys_user.is_admin = 1 then true end
     )
GROUP BY auth_source,auth_source_type;
RETURN oTemp;
END;

-- ----------------------------
-- Function structure for GET_V_AUTH_MODEL_WITH_CHILDREN  -- okwhile  可以执行  SELECT GET_V_AUTH_MODEL_WITH_CHILDREN(111,'dataset')
-- ----------------------------
CREATE OR REPLACE FUNCTION GET_V_AUTH_MODEL_WITH_CHILDREN(parentId LONGVARCHAR,modelType varchar(255))
              RETURN LONGVARCHAR
              AS
              oTemp LONGVARCHAR;
oTempChild LONGVARCHAR;
BEGIN
    oTemp = '';
oTempChild = CAST(parentId AS varchar);
WHILE oTempChild IS NOT NULL LOOP
oTemp = CONCAT(oTemp,',',oTempChild);
SELECT WM_CONCAT(id) INTO oTempChild FROM V_AUTH_MODEL WHERE pid in oTempChild and V_AUTH_MODEL.model_type=modelType order by id asc;
END LOOP;

RETURN oTemp;
END;


- ----------------------------
-- Function structure for CHECK_TREE_NO_MANAGE_PRIVILEGE  -- ok  select CHECK_TREE_NO_MANAGE_PRIVILEGE(1,'dataset','22');
-- ----------------------------

CREATE OR REPLACE FUNCTION CHECK_TREE_NO_MANAGE_PRIVILEGE(userId varchar(255),modelType varchar(255),nodeId varchar(255))
              RETURN INT AS
              privilegeType INT;
allTreeIds LONGVARCHAR;
allPrivilegeTreeIds LONGVARCHAR;
result1 INT;

BEGIN
select privilege_type into privilegeType from sys_auth_detail where auth_id =modelType and privilege_extend ='manage';
select GET_V_AUTH_MODEL_WITH_CHILDREN( nodeId ,modelType) into allTreeIds;
select GET_V_AUTH_MODEL_WITH_PRIVILEGE(userId,modelType,privilegeType) into allPrivilegeTreeIds;
select count(id) into result1
from v_auth_model
where
        v_auth_model.model_type = modelType
  and FIND_IN_SET(v_auth_model.id, allTreeIds)
  and (case when  FIND_IN_SET(v_auth_model.id, allPrivilegeTreeIds) then false else true end
    or ISNULL(allPrivilegeTreeIds));

RETURN result1;
END;


CREATE OR REPLACE FUNCTION GET_PANEL_GROUP_WITH_CHILDREN(parentId varchar(8000))
              RETURN varchar(8000)
              AS
              oTemp VARCHAR(8000);
oTempChild VARCHAR(8000);

BEGIN

    oTemp = '';
oTempChild = CAST(parentId AS varchar);

WHILE oTempChild IS NOT NULL LOOP
  oTemp = CONCAT(oTemp,',',oTempChild);
SELECT wm_CONCAT(id) INTO oTempChild FROM panel_group WHERE pid in oTempChild;
end LOOP;

RETURN oTemp;
END;
