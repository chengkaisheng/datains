CREATE OR REPLACE   FUNCTION         "CHECK_TREE_NO_MANAGE_PRIVILEGE"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `CHECK_TREE_NO_MANAGE_PRIVILEGE`*/
(userId varchar(255),modelType varchar(255),nodeId varchar(255)) RETURN int
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
DECLARE


 privilegeType INTEGER;
 allTreeIds CLOB;
 allPrivilegeTreeIds CLOB;
 result INTEGER;

BEGIN

select privilege_type into privilegeType from sys_auth_detail where auth_id =modelType and privilege_extend ='manage';
select GET_V_AUTH_MODEL_WITH_CHILDREN( nodeId ,modelType) into allTreeIds;
select GET_V_AUTH_MODEL_WITH_PRIVILEGE(userId,modelType,privilegeType) into allPrivilegeTreeIds;
select count(id) into result from v_auth_model where v_auth_model.model_type=modelType and FIND_IN_SET(v_auth_model.id,allTreeIds) and (!FIND_IN_SET(v_auth_model.id,allPrivilegeTreeIds) or ISNULL(allPrivilegeTreeIds));

RETURN result;
END;
/



CREATE OR REPLACE   FUNCTION         "COPY_AUTH"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`localhost` FUNCTION `copy_auth`*/
(authSource varchar(255), authSourceType varchar(255),
                                                       authUser varchar(255)) RETURN varchar(255)
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
DECLARE

     authId varchar(255);
     userId varchar(255);
     copyId varchar(255);

BEGIN
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
           unix_timestamp(now()) * 1000   as auth_time,
           'auto'         as auth_user,
           sa.id             as copy_from,
           copyId         as copy_id
    FROM sys_auth sa
             left join sys_auth_detail sad on sa.id = sad.auth_id
    WHERE auth_source = (SELECT pid
                         FROM v_auth_model
                         WHERE id = authSource
                           AND model_type = authSourceType)
      AND auth_source_type = authSourceType
        /**只有具有管理权限时，才会继承第一父级权限**/
      and sad.privilege_extend = 'manage'
      and sad.privilege_value = 1
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
END;
/



CREATE OR REPLACE   FUNCTION         "DELETE_AUTH_SOURCE"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `delete_auth_source`*/
(authSource varchar(255),authSourceType varchar(255)) RETURN varchar(255)
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
BEGIN

delete from sys_auth_detail where auth_id in (
select id from  sys_auth where sys_auth.auth_source=authSource and sys_auth.auth_source_type=authSourceType
);

delete from sys_auth where sys_auth.auth_source=authSource and sys_auth.auth_source_type=authSourceType;

RETURN 'success';

END;
/



CREATE OR REPLACE   FUNCTION         "DELETE_AUTH_TARGET"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `delete_auth_target`*/
(authTarget varchar(255),authTargetType varchar(255)) RETURN varchar(255)
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
BEGIN

delete from sys_auth_detail where auth_id in (
select id from  sys_auth where sys_auth.auth_target=authTarget and sys_auth.auth_target_type=authTargetType
);

delete from sys_auth where sys_auth.auth_target=authTarget and sys_auth.auth_target_type=authTargetType;

RETURN 'sucess';

END;
/



CREATE OR REPLACE   FUNCTION         "GET_AUTH_CHILDREN_COUNT"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `get_auth_children_count`*/
(pidInfo varchar(255),modelType varchar(255),userName varchar(255)) RETURN varchar(255)
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
DECLARE


 childrenCount INTEGER;

BEGIN

select count(1)-1 into childrenCount from v_auth_model where FIND_IN_SET(
		v_auth_model.id,
	GET_V_AUTH_MODEL_WITH_CHILDREN ( pidInfo, modelType ))
	AND create_by = userName
	AND v_auth_model.node_type = 'leaf';

RETURN childrenCount;

END;
/


CREATE OR REPLACE   FUNCTION         "GET_AUTHS"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `get_auths`*/
(authSource varchar(255),modelType varchar(255),userId varchar(255)) RETURN CLOB
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
DECLARE
oTemp CLOB;
BEGIN
SELECT
	wm_concat( DISTINCT sys_auth_detail.privilege_extend) into oTemp
FROM
	(
		`sys_auth`
		LEFT JOIN `sys_auth_detail` ON ((
				`sys_auth`.`id` = `sys_auth_detail`.`auth_id`
			)))
			where sys_auth_detail.privilege_value =1
			and sys_auth.auth_source=authSource
			AND (
				(
					sys_auth.auth_target_type = 'dept'
					AND sys_auth.auth_target in ( SELECT dept_id FROM sys_user WHERE user_id = userId )
				)
				OR (
					sys_auth.auth_target_type = 'user'
					AND sys_auth.auth_target = userId
				)
				OR (
					sys_auth.auth_target_type = 'role'
					AND sys_auth.auth_target in ( SELECT role_id FROM sys_users_roles WHERE user_id = userId )
				)
			)
GROUP BY
	`sys_auth`.`auth_source`,
	`sys_auth`.`auth_source_type`;
RETURN oTemp;
END;
/

CREATE OR REPLACE   FUNCTION         "GET_CHART_GROUP_WITH_CHILDREN"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `GET_CHART_GROUP_WITH_CHILDREN`*/
(parentId CLOB) RETURN CLOB
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
DECLARE
 oTemp CLOB;
 oTempChild CLOB;

BEGIN

SET oTemp = '';
SET oTempChild = CAST(parentId AS CHAR);

WHILE oTempChild IS NOT NULL
LOOP 
SET oTemp = CONCAT(oTemp,',',oTempChild);
SELECT WM_CONCAT(id) INTO oTempChild FROM v_history_chart_view WHERE FIND_IN_SET(pid,oTempChild) > 0;
END LOOP ;

RETURN oTemp;
END;
/



CREATE OR REPLACE   FUNCTION         "GET_CHART_VIEW_COPY_NAME" 
(chartId varchar(255),pid varchar(255))
RETURN varchar(255)
AS
DECLARE 
chartName varchar(255);
regexpInfo varchar(255);
chartNameCount INTEGER;
BEGIN
select "name"  into chartName from chart_view where id =chartId;
/**
因为名称存在（）等特殊字符，所以不能直接用REGEXP进行查找，qrtz_locks
1.用like 'chartName%' 过滤可能的数据项
2.REPLACE(name,chartName,'') REGEXP '-copy\\(([0-9])+\\)$' 过滤去掉chartName后的字符以 -copy(/d) 结尾的数据
3.(LENGTH(REPLACE(name,chartName,''))-LENGTH(replace(REPLACE(name,chartName,''),'-',''))=1) 确定只出现一次 ‘-’ 防止多次copy
**/
select (count(1)+1) into chartNameCount from chart_view
where (LENGTH(REPLACE(name,chartName,''))-LENGTH(replace(REPLACE(name,chartName,''),'-',''))=1)
and REGEXP_LIKE(REPLACE(name,chartName,''),'-copy([0-9])+$') 
and name like CONCAT(chartName,'%') 
and chart_view.scene_id=pid ;

RETURN concat(chartName,'-copy(',chartNameCount,')');
END;
/


CREATE OR REPLACE   FUNCTION         "GET_GRANT_AUTHS"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `get_grant_auths`*/
(modelType VARCHAR (255),
	userId VARCHAR (255)) RETURN CLOB
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
DECLARE
oTemp CLOB;
BEGIN
	SELECT
		WM_CONCAT( DISTINCT  v_auth_model.id) into oTemp
	FROM
		v_auth_model
		LEFT JOIN sys_auth ON v_auth_model.id = sys_auth.auth_source
		AND v_auth_model.model_type = sys_auth.auth_source_type
		LEFT JOIN sys_auth_detail ON sys_auth.id = sys_auth_detail.auth_id
	WHERE
		privilege_type = 15
		AND privilege_value = 1
		AND v_auth_model.model_type = modelType
		AND (
			(
				sys_auth.auth_target_type = 'dept'
				AND sys_auth.auth_target IN ( SELECT dept_id FROM sys_user WHERE user_id = userId )
			)
			OR (
				sys_auth.auth_target_type = 'user'
				AND sys_auth.auth_target = userId
			)
			OR (
				sys_auth.auth_target_type = 'role'
				AND sys_auth.auth_target IN ( SELECT role_id FROM sys_users_roles WHERE user_id = userId )
			)
		);
	RETURN oTemp;

	END;
/


CREATE OR REPLACE   FUNCTION         "GET_PANEL_GROUP_WITH_CHILDREN" 
(parentId CLOB)
RETURN CLOB
AS
DECLARE 
oTemp CLOB;
oTempChild CLOB;
BEGIN
SET oTemp = '';
SET oTempChild = parentId;

WHILE oTempChild IS NOT NULL
LOOP
SET oTemp = CONCAT(oTemp,',',oTempChild);
SELECT WM_CONCAT(id) INTO oTempChild FROM panel_group WHERE FIND_IN_SET(pid,oTempChild) > 0;
END LOOP;
RETURN oTemp;
END;
/


CREATE OR REPLACE   FUNCTION         "GET_PANEL_TEMPLATE_WITH_CHILDREN" 
(parentId CLOB)
RETURN CLOB
AS
DECLARE 
oTemp CLOB;
oTempChild CLOB;
BEGIN
SET oTemp = '';
SET oTempChild = parentId;

WHILE oTempChild IS NOT NULL
LOOP
SET oTemp = CONCAT(oTemp,',',oTempChild);
SELECT WM_CONCAT(id) INTO oTempChild FROM panel_template WHERE FIND_IN_SET(pid,oTempChild) > 0;
END LOOP;

RETURN oTemp;
END;
/


CREATE OR REPLACE   FUNCTION         "GET_PANEL_WITH_PRIVILEGE_AND_MOBILE"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `GET_PANEL_WITH_PRIVILEGE_AND_MOBILE`*/
(userId varchar(255),modelType varchar(255),privilegeType varchar(255)) RETURN CLOB
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
DECLARE
 oTempLeafIds CLOB;
BEGIN
select WM_CONCAT(auth_source) into oTempLeafIds from (
SELECT
			sys_auth.auth_source_type,
			sys_auth.auth_source
		FROM
			sys_auth
			LEFT JOIN sys_auth_detail ON sys_auth.id = sys_auth_detail.auth_id
		WHERE
			sys_auth_detail.privilege_type = privilegeType
			and sys_auth.auth_source_type = modelType
			AND (
				(
					sys_auth.auth_target_type = 'dept'
					AND sys_auth.auth_target in ( SELECT dept_id FROM sys_user WHERE user_id = userId )
				)
				OR (
					sys_auth.auth_target_type = 'user'
					AND sys_auth.auth_target = userId
				)
				OR (
					sys_auth.auth_target_type = 'role'
					AND sys_auth.auth_target in ( SELECT role_id FROM sys_users_roles WHERE user_id = userId )
				)
				OR (1 = ( SELECT is_admin FROM sys_user WHERE user_id = userId ))
			)
			and sys_auth.auth_source in (select id from panel_group where mobile_layout='1')
		GROUP BY(
			sys_auth.auth_source_type,
			sys_auth.auth_source)
			having  (sum( sys_auth_detail.privilege_value )> 0 or 1 = ( SELECT is_admin FROM sys_user WHERE user_id = userId ))) temp;
RETURN oTempLeafIds;
END;
/


CREATE OR REPLACE   FUNCTION         "GET_V_AUTH_MODEL_ID_P_USE"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `GET_V_AUTH_MODEL_ID_P_USE`*/
(userId CLOB,modelType varchar(255)) RETURN CLOB
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
DECLARE
 oTempLeafIds CLOB;
 oTempAllIds CLOB;

BEGIN

select GET_V_AUTH_MODEL_WITH_PRIVILEGE(userId,modelType,1) into oTempLeafIds;

select WM_CONCAT(id) into oTempAllIds from (select GET_V_AUTH_MODEL_WITH_PARENT ( oTempLeafIds ,modelType) cids) t, v_auth_model where v_auth_model.model_type=modelType and FIND_IN_SET(v_auth_model.id,cids) order by id asc;

RETURN oTempAllIds;
END;
/


CREATE OR REPLACE   FUNCTION         "GET_V_AUTH_MODEL_ID_P_USE_MOBILE"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `GET_V_AUTH_MODEL_ID_P_USE_MOBILE`*/
(userId CLOB,modelType varchar(255)) RETURN CLOB
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
DECLARE
 oTempLeafIds CLOB;
 oTempAllIds CLOB;

BEGIN

select GET_PANEL_WITH_PRIVILEGE_AND_MOBILE(userId,modelType,1) into oTempLeafIds;

select WM_CONCAT(id) into oTempAllIds from (select GET_V_AUTH_MODEL_WITH_PARENT ( oTempLeafIds ,modelType) cids) t, v_auth_model where v_auth_model.model_type=modelType and FIND_IN_SET(v_auth_model.id,cids) order by id asc;

RETURN oTempAllIds;
END;
/


CREATE OR REPLACE   FUNCTION         "GET_V_AUTH_MODEL_WITH_CHILDREN" 
(parentId CLOB,modelType varchar(255))
RETURN CLOB
AS
DECLARE 
oTemp CLOB;
oTempChild CLOB;
BEGIN
SET oTemp = '';
SET oTempChild = parentId;
WHILE oTempChild IS NOT NULL
	LOOP
		SET oTemp = CONCAT(oTemp,',',oTempChild);
		SELECT WM_CONCAT(id) INTO oTempChild FROM V_AUTH_MODEL WHERE FIND_IN_SET(pid,oTempChild) > 0 and V_AUTH_MODEL.model_type=modelType order by id asc;
END LOOP;
RETURN oTemp;
END;
/


CREATE OR REPLACE   FUNCTION         "GET_V_AUTH_MODEL_WITH_PARENT" 
(childrenId CLOB,modelType varchar(255))
RETURN CLOB
AS
DECLARE 
oTemp CLOB;
oTempParent CLOB;
BEGIN
SET oTemp = '';
SET oTempParent = childrenId;
WHILE oTempParent IS NOT NULL
LOOP
SET oTemp = CONCAT(oTemp,',',oTempParent);
SELECT WM_CONCAT(distinct pid) INTO oTempParent FROM V_AUTH_MODEL WHERE FIND_IN_SET(id,oTempParent) > 0 and V_AUTH_MODEL.model_type=modelType order by pid asc;
END LOOP;
RETURN oTemp;
END;
/


CREATE OR REPLACE   FUNCTION         "GET_V_AUTH_MODEL_WITH_PRIVILEGE"
/****DMDTS CONVERT***CREATE DEFINER=`root`@`%` FUNCTION `GET_V_AUTH_MODEL_WITH_PRIVILEGE`*/
(userId VARCHAR(255),modelType varchar(255),privilegeType varchar(255)) RETURN CLOB
    
/****DMDTS CONVERT***
    READS SQL DATA*/
 AS 
DECLARE
 oTempLeafIds CLOB;
BEGIN
select WM_CONCAT(auth_source) into oTempLeafIds from (
SELECT
			sys_auth.auth_source_type,
			sys_auth.auth_source
		FROM
			sys_auth
			LEFT JOIN sys_auth_detail ON sys_auth.id = sys_auth_detail.auth_id
		WHERE
			sys_auth_detail.privilege_type = privilegeType
			and sys_auth.auth_source_type = modelType
			AND (
				(
					sys_auth.auth_target_type = 'dept'
					AND sys_auth.auth_target in ( SELECT dept_id FROM sys_user WHERE user_id = userId )
				)
				OR (
					sys_auth.auth_target_type = 'user'
					AND sys_auth.auth_target = userId
				)
				OR (
					sys_auth.auth_target_type = 'role'
					AND sys_auth.auth_target in ( SELECT role_id FROM sys_users_roles WHERE user_id = userId )
				)
				OR (1 = ( SELECT is_admin FROM sys_user WHERE user_id = userId ))
			)
		GROUP BY
			sys_auth.auth_source_type,
			sys_auth.auth_source
			having (sum( sys_auth_detail.privilege_value )> 0 or 1 = ( SELECT is_admin FROM sys_user WHERE user_id = userId ))) temp;
RETURN oTempLeafIds;
END;
/

CREATE OR REPLACE   FUNCTION         "UUID"
    RETURN VARCHAR AS guid VARCHAR(50);
    BEGIN
        guid := LOWER(RAWTOHEX(SYS_GUID()));
        RETURN SUBSTR(guid, 1, 8) || '-' || SUBSTR(guid, 9, 4) || '-' || SUBSTR(guid, 13, 4) || '-' || SUBSTR(guid, 17, 4) || '-' || SUBSTR(guid, 21, 12);
    END;
/