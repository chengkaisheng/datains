DROP VIEW IF EXISTS v_auth_model;
CREATE VIEW `v_auth_model` AS
select `sys_user`.`user_id`   AS `id`,
       `sys_user`.`username`  AS `name`,
       `sys_user`.`username`  AS `label`,
       '0'                    AS `pid`,
       'leaf'                 AS `node_type`,
       'user'                 AS `model_type`,
       'user'                 AS `model_inner_type`,
       'target'               AS `auth_type`,
       `sys_user`.`create_by` AS `create_by`,
       0                      AS `level`,
       0                      AS `mode`,
       '0'                    AS `data_source_id`
from `sys_user`
where (`sys_user`.`is_admin` <> 1)
union all
select `sys_role`.`role_id`   AS `id`,
       `sys_role`.`name`      AS `name`,
       `sys_role`.`name`      AS `label`,
       '0'                    AS `pid`,
       'leaf'                 AS `node_type`,
       'role'                 AS `model_type`,
       'role'                 AS `model_inner_type`,
       'target'               AS `auth_type`,
       `sys_role`.`create_by` AS `create_by`,
       0                      AS `level`,
       0                      AS `mode`,
       '0'                    AS `data_source_id`
from `sys_role`
union all
select `sys_dept`.`dept_id`                                                        AS `id`,
       `sys_dept`.`name`                                                           AS `name`,
       `sys_dept`.`name`                                                           AS `lable`,
       (cast(`sys_dept`.`pid` as char charset utf8mb4) collate utf8mb4_general_ci) AS `pid`,
       if((`sys_dept`.`sub_count` = 0), 'leaf', 'spine')                           AS `node_type`,
       'dept'                                                                      AS `model_type`,
       'dept'                                                                      AS `model_inner_type`,
       'target'                                                                    AS `auth_type`,
       `sys_dept`.`create_by`                                                      AS `create_by`,
       0                                                                           AS `level`,
       0                                                                           AS `mode`,
       '0'                                                                         AS `data_source_id`
from `sys_dept`
union all
select `datasource`.`id`        AS `id`,
       `datasource`.`name`      AS `NAME`,
       `datasource`.`name`      AS `label`,
       '0'                      AS `pid`,
       'leaf'                   AS `node_type`,
       'link'                   AS `model_type`,
       `datasource`.`type`      AS `model_inner_type`,
       'source'                 AS `auth_type`,
       `datasource`.`create_by` AS `create_by`,
       0                        AS `level`,
       0                        AS `mode`,
       '0'                      AS `data_source_id`
from `datasource`
union all
select `dataset_group`.`id`                                            AS `id`,
       `dataset_group`.`name`                                          AS `NAME`,
       `dataset_group`.`name`                                          AS `lable`,
       if((`dataset_group`.`pid` is null), '0', `dataset_group`.`pid`) AS `pid`,
       'spine'                                                         AS `node_type`,
       'dataset'                                                       AS `model_type`,
       `dataset_group`.`type`                                          AS `model_inner_type`,
       'source'                                                        AS `auth_type`,
       `dataset_group`.`create_by`                                     AS `create_by`,
       `dataset_group`.`level`                                         AS `level`,
       0                                                               AS `mode`,
       '0'                                                             AS `data_source_id`
from `dataset_group`
union all
select `data_fill_form`.`id`                                          AS `id`,
       `data_fill_form`.`name`                                        AS `NAME`,
       `data_fill_form`.`name`                                        AS `label`,
       (case `data_fill_form`.`id`
            when 'data_fill_list' then '0'
            when 'default_data_fill' then '0'
            else `data_fill_form`.`pid` end)                          AS `pid`,
       if((`data_fill_form`.`node_type` = 'folder'), 'spine', 'leaf') AS `node_type`,
       'data_fill'                                                    AS `model_type`,
       'form'                                                         AS `model_inner_type`,
       'source'                                                       AS `auth_type`,
       `data_fill_form`.`create_by`                                   AS `create_by`,
       `data_fill_form`.`level`                                       AS `level`,
       0                                                              AS `mode`,
       '0'                                                            AS `data_source_id`
from `data_fill_form`
union all
select `dataset_table`.`id`             AS `id`,
       `dataset_table`.`name`           AS `NAME`,
       `dataset_table`.`name`           AS `lable`,
       `dataset_table`.`scene_id`       AS `pid`,
       'leaf'                           AS `node_type`,
       'dataset'                        AS `model_type`,
       `dataset_table`.`type`           AS `model_inner_type`,
       'source'                         AS `auth_type`,
       `dataset_table`.`create_by`      AS `create_by`,
       0                                AS `level`,
       `dataset_table`.`mode`           AS `mode`,
       `dataset_table`.`data_source_id` AS `data_source_id`
from `dataset_table`
union all
select `panel_group`.`id`                                          AS `id`,
       `panel_group`.`name`                                        AS `NAME`,
       `panel_group`.`name`                                        AS `label`,
       (case `panel_group`.`id`
            when 'panel_list' then '0'
            when 'default_panel' then '0'
            else `panel_group`.`pid` end)                          AS `pid`,
       if((`panel_group`.`node_type` = 'folder'), 'spine', 'leaf') AS `node_type`,
       'panel'                                                     AS `model_type`,
       `panel_group`.`panel_type`                                  AS `model_inner_type`,
       'source'                                                    AS `auth_type`,
       `panel_group`.`create_by`                                   AS `create_by`,
       0                                                           AS `level`,
       0                                                           AS `mode`,
       '0'                                                         AS `data_source_id`
from `panel_group`
union all
select `sys_menu`.`menu_id`                                                                      AS `menu_id`,
       `sys_menu`.`title`                                                                        AS `name`,
       `sys_menu`.`title`                                                                        AS `label`,
       `sys_menu`.`pid`                                                                          AS `pid`,
       if((`sys_menu`.`sub_count` > 0), 'spine', 'leaf')                                         AS `node_type`,
       'menu'                                                                                    AS `model_type`,
       (case `sys_menu`.`type` when 0 then 'folder' when 1 then 'menu' when 2 then 'button' end) AS `model_inner_type`,
       'source'                                                                                  AS `auth_type`,
       `sys_menu`.`create_by`                                                                    AS `create_by`,
       0                                                                                         AS `level`,
       0                                                                                         AS `mode`,
       '0'                                                                                       AS `data_source_id`
from `sys_menu`
where ((`sys_menu`.`i_frame` <> 1) or (`sys_menu`.`i_frame` is null))
union all
select `plugin_sys_menu`.`menu_id`                              AS `menu_id`,
       `plugin_sys_menu`.`title`                                AS `name`,
       `plugin_sys_menu`.`title`                                AS `label`,
       `plugin_sys_menu`.`pid`                                  AS `pid`,
       if((`plugin_sys_menu`.`sub_count` > 0), 'spine', 'leaf') AS `node_type`,
       'menu'                                                   AS `model_type`,
       (case `plugin_sys_menu`.`type`
            when 0 then 'folder'
            when 1 then 'menu'
            when 2
                then 'button' end)                              AS `model_inner_type`,
       'source'                                                 AS `auth_type`,
       `plugin_sys_menu`.`create_by`                            AS `create_by`,
       0                                                        AS `level`,
       0                                                        AS `mode`,
       '0'                                                      AS `data_source_id`
from `plugin_sys_menu`
where ((`plugin_sys_menu`.`i_frame` <> 1) or (`plugin_sys_menu`.`i_frame` is null))
;
