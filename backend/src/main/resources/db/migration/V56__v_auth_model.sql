ALTER TABLE `datasource`
    ADD COLUMN `pid` varchar(50) NOT NULL DEFAULT 'datasource_list' COMMENT 'PID' AFTER `id`;
INSERT INTO `datasource` (`id`, `pid`, `name`, `desc`, `type`, `configuration`, `create_time`, `update_time`,
                          `create_by`, `status`)
VALUES ('datasource_list', '0', '数据源', NULL, '-1', '-1', 1689303741882, 1689303741882, 'admin', 'Error');

UPDATE `dataset_group`
SET pid = 'dataset_list'
WHERE pid = '0'
  AND id != 'dataset_list';

INSERT INTO `dataset_group` (`id`, `name`, `pid`, `level`, `type`, `create_by`, `create_time`)
VALUES ('dataset_list', '数据集', '0', -1, 'group', 'admin', 1623211708679);


CREATE OR REPLACE ALGORITHM = UNDEFINED DEFINER = `root`@`%` SQL SECURITY DEFINER VIEW `v_auth_model` AS
SELECT `sys_user`.`user_id`   AS `id`,
       `sys_user`.`nick_name` AS `name`,
       `sys_user`.`nick_name` AS `label`,
       '0'                    AS `pid`,
       'leaf'                 AS `node_type`,
       'user'                 AS `model_type`,
       'user'                 AS `model_inner_type`,
       'target'               AS `auth_type`,
       `sys_user`.`create_by` AS `create_by`,
       0                      AS `level`,
       0                      AS `mode`,
       '0'                    AS `data_source_id`
FROM `sys_user`
WHERE (`sys_user`.`is_admin` <> 1)
UNION ALL
SELECT `sys_role`.`role_id`   AS `id`,
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
FROM `sys_role`
UNION ALL
SELECT `sys_dept`.`dept_id`                                                        AS `id`,
       `sys_dept`.`name`                                                           AS `name`,
       `sys_dept`.`name`                                                           AS `lable`,
       (cast(`sys_dept`.`pid` AS CHAR CHARSET utf8mb4) COLLATE utf8mb4_general_ci) AS `pid`,
       IF
       ((`sys_dept`.`sub_count` = 0), 'leaf', 'spine')                             AS `node_type`,
       'dept'                                                                      AS `model_type`,
       'dept'                                                                      AS `model_inner_type`,
       'target'                                                                    AS `auth_type`,
       `sys_dept`.`create_by`                                                      AS `create_by`,
       0                                                                           AS `level`,
       0                                                                           AS `mode`,
       '0'                                                                         AS `data_source_id`
FROM `sys_dept`
UNION ALL
SELECT `datasource`.`id`        AS `id`,
       `datasource`.`name`      AS `NAME`,
       `datasource`.`name`      AS `label`,
       `datasource`.`pid`       AS `pid`,
       'leaf'                   AS `node_type`,
       'link'                   AS `model_type`,
       `datasource`.`type`      AS `model_inner_type`,
       'source'                 AS `auth_type`,
       `datasource`.`create_by` AS `create_by`,
       0                        AS `level`,
       0                        AS `mode`,
       '0'                      AS `data_source_id`
FROM `datasource`
UNION ALL
SELECT `dataset_group`.`id`                                          AS `id`,
       `dataset_group`.`name`                                        AS `NAME`,
       `dataset_group`.`name`                                        AS `lable`,
       IF
       ((`dataset_group`.`pid` IS NULL), '0', `dataset_group`.`pid`) AS `pid`,
       'spine'                                                       AS `node_type`,
       'dataset'                                                     AS `model_type`,
       `dataset_group`.`type`                                        AS `model_inner_type`,
       'source'                                                      AS `auth_type`,
       `dataset_group`.`create_by`                                   AS `create_by`,
       `dataset_group`.`level`                                       AS `level`,
       0                                                             AS `mode`,
       '0'                                                           AS `data_source_id`
FROM `dataset_group`
UNION ALL
SELECT `dataset_table`.`id`             AS `id`,
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
FROM `dataset_table`
UNION ALL
SELECT `panel_group`.`id`                                        AS `id`,
       `panel_group`.`name`                                      AS `NAME`,
       `panel_group`.`name`                                      AS `label`,
       (CASE `panel_group`.`id`
            WHEN 'panel_list' THEN '0'
            WHEN 'default_panel' THEN '0'
            ELSE `panel_group`.`pid` END)                        AS `pid`,
       IF
       ((`panel_group`.`node_type` = 'folder'), 'spine', 'leaf') AS `node_type`,
       'panel'                                                   AS `model_type`,
       `panel_group`.`panel_type`                                AS `model_inner_type`,
       'source'                                                  AS `auth_type`,
       `panel_group`.`create_by`                                 AS `create_by`,
       0                                                         AS `level`,
       0                                                         AS `mode`,
       '0'                                                       AS `data_source_id`
FROM `panel_group`
UNION ALL
SELECT `sys_menu`.`menu_id`                                                                      AS `menu_id`,
       `sys_menu`.`title`                                                                        AS `name`,
       `sys_menu`.`title`                                                                        AS `label`,
       `sys_menu`.`pid`                                                                          AS `pid`,
       IF
       ((`sys_menu`.`sub_count` > 0), 'spine', 'leaf')                                           AS `node_type`,
       'menu'                                                                                    AS `model_type`,
       (CASE `sys_menu`.`type` WHEN 0 THEN 'folder' WHEN 1 THEN 'menu' WHEN 2 THEN 'button' END) AS `model_inner_type`,
       'source'                                                                                  AS `auth_type`,
       `sys_menu`.`create_by`                                                                    AS `create_by`,
       0                                                                                         AS `level`,
       0                                                                                         AS `mode`,
       '0'                                                                                       AS `data_source_id`
FROM `sys_menu`
WHERE ((`sys_menu`.`i_frame` <> 1) OR (`sys_menu`.`i_frame` IS NULL))
UNION ALL
SELECT `plugin_sys_menu`.`menu_id`                            AS `menu_id`,
       `plugin_sys_menu`.`title`                              AS `name`,
       `plugin_sys_menu`.`title`                              AS `label`,
       `plugin_sys_menu`.`pid`                                AS `pid`,
       IF
       ((`plugin_sys_menu`.`sub_count` > 0), 'spine', 'leaf') AS `node_type`,
       'menu'                                                 AS `model_type`,
       (CASE `plugin_sys_menu`.`type`
            WHEN 0 THEN 'folder'
            WHEN 1 THEN 'menu'
            WHEN 2
                THEN 'button' END)                            AS `model_inner_type`,
       'source'                                               AS `auth_type`,
       `plugin_sys_menu`.`create_by`                          AS `create_by`,
       0                                                      AS `level`,
       0                                                      AS `mode`,
       '0'                                                    AS `data_source_id`
FROM `plugin_sys_menu`
WHERE ((`plugin_sys_menu`.`i_frame` <> 1) OR (`plugin_sys_menu`.`i_frame` IS NULL));
