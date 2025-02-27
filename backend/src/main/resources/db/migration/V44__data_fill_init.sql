CREATE TABLE `fill_form_info`
(
    `id`          bigint   NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
    `parent_id`   bigint            DEFAULT NULL COMMENT '父级ID（用于关联上级表单）',
    `template_id` bigint            DEFAULT NULL COMMENT '关联的模板ID',
    `name`        varchar(255)      DEFAULT NULL COMMENT '表单名称',
    `description` varchar(500)      DEFAULT NULL COMMENT '表单描述',
    `version`     int               DEFAULT NULL COMMENT '版本号',
    `creator`     bigint            DEFAULT NULL COMMENT '创建人ID',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updater`     bigint            DEFAULT NULL COMMENT '更新人ID',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_delete`   int               DEFAULT '0' COMMENT '1-删除',
    PRIMARY KEY (`id`)
) COMMENT ='数据填报基本信息表';

CREATE TABLE `fill_form_data`
(
    `id`          bigint   NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
    `form_id`     bigint   NOT NULL COMMENT '关联的表单ID（对应 fill_form_info.id）',
    `form_data`   json     NOT NULL COMMENT '表单数据（JSON数组格式）',
    `creator`     bigint            DEFAULT NULL COMMENT '创建人ID',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updater`     bigint            DEFAULT NULL COMMENT '更新人ID',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_delete`   int               DEFAULT '0' COMMENT '1-删除',
    PRIMARY KEY (`id`)
) COMMENT ='表单数据表';

CREATE TABLE `fill_form_template`
(
    `id`          bigint   NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
    `name`        varchar(255)      DEFAULT NULL COMMENT '模版名称',
    `description` varchar(500)      DEFAULT NULL COMMENT '模版描述',
    `data`        json     NOT NULL COMMENT '模版数据（JSON数组格式）',
    `creator`     bigint            DEFAULT NULL COMMENT '创建人ID',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updater`     bigint            DEFAULT NULL COMMENT '更新人ID',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_delete`   int               DEFAULT '0' COMMENT '1-删除',
    PRIMARY KEY (`id`)
) COMMENT ='表单模版表';

CREATE TABLE `data_fill_commit_log`
(
    `id`          varchar(50) COLLATE utf8mb4_general_ci  NOT NULL,
    `form_id`     varchar(50) COLLATE utf8mb4_general_ci  NOT NULL,
    `data_id`     varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `operate`     varchar(50) COLLATE utf8mb4_general_ci  NOT NULL,
    `commit_by`   varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `commit_time` datetime                                DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `data_fill_commit_log_form_id_index` (`form_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

CREATE TABLE `data_fill_form`
(
    `id`                varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键ID',
    `name`              varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名称',
    `pid`               varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '父级ID',
    `level`             int                                     DEFAULT NULL COMMENT '层级',
    `node_type`         varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'folder/panel 目录或文件夹',
    `table_name`        varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '表名',
    `datasource`        varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '数据源',
    `forms`             longtext COLLATE utf8mb4_general_ci COMMENT '表单内容',
    `create_index`      tinyint(1)                              DEFAULT '0' COMMENT '是否创建索引',
    `table_indexes`     longtext COLLATE utf8mb4_general_ci COMMENT '索引',
    `create_by`         varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建人',
    `create_time`       datetime                                DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by`         varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '更新人',
    `update_time`       datetime                                DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
    `commit_new_update` tinyint(1)                              DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci COMMENT ='数据填报表单';

CREATE DEFINER =`root`@`%` TRIGGER `delete_auth_data_fill_form`
    AFTER DELETE
    ON `data_fill_form`
    FOR EACH ROW select delete_auth_source(OLD.id, 'data_fill')
                 into @ee;


CREATE TABLE `data_fill_task`
(
    `id`                      bigint                                  NOT NULL AUTO_INCREMENT COMMENT '任务ID',
    `name`                    varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务名称',
    `form_id`                 varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务ID',
    `start_time`              datetime                                DEFAULT NULL COMMENT '开始时间',
    `end_time`                datetime                                DEFAULT NULL COMMENT '结束时间',
    `rate_type`               int                                     NOT NULL COMMENT '频率方式',
    `rate_val`                varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '频率值',
    `publish_start_time`      datetime                                DEFAULT NULL,
    `publish_end_time`        datetime                                DEFAULT NULL,
    `publish_range_time_type` int                                     DEFAULT NULL,
    `publish_range_time`      int                                     DEFAULT NULL,
    `creator`                 bigint                                  NOT NULL COMMENT '创建者ID',
    `create_time`             datetime                                DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `status`                  tinyint(1)                              DEFAULT '1' COMMENT '运行状态',
    `reci_users`              longtext COLLATE utf8mb4_general_ci COMMENT '接收人账号',
    `role_list`               longtext COLLATE utf8mb4_general_ci COMMENT '收件角色',
    `org_list`                longtext COLLATE utf8mb4_general_ci COMMENT '收件组织',
    PRIMARY KEY (`id`),
    KEY `data_fill_task_form_id_index` (`form_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci COMMENT ='数据填报任务';

CREATE TABLE `data_fill_user_task`
(
    `id`          varchar(50) COLLATE utf8mb4_general_ci  NOT NULL COMMENT 'ID',
    `task_id`     bigint                                  NOT NULL COMMENT '任务ID',
    `form_id`     varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '表单ID',
    `value_id`    text COLLATE utf8mb4_general_ci COMMENT '表内值ID',
    `user`        bigint                                  NOT NULL COMMENT '用户ID',
    `start_time`  datetime DEFAULT NULL COMMENT '开始时间',
    `end_time`    datetime DEFAULT NULL COMMENT '结束时间',
    `finish_time` datetime DEFAULT NULL COMMENT '完成时间',
    PRIMARY KEY (`id`),
    KEY `data_fill_user_task_form_id_index` (`form_id`),
    KEY `data_fill_user_task_task_id_index` (`task_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci COMMENT ='数据填报用户任务';

INSERT INTO `sys_auth_detail` (`id`, `auth_id`, `privilege_name`, `privilege_type`, `privilege_value`,
                               `privilege_extend`, `remark`, `create_user`, `create_time`, `update_time`, `copy_from`,
                               `copy_id`)
VALUES ('data_fill_grant', 'data_fill', 'i18n_auth_grant', 15, 0, 'grant', '基础权限-授权', 'system', NULL, NULL, NULL,
        NULL);
INSERT INTO `sys_auth_detail` (`id`, `auth_id`, `privilege_name`, `privilege_type`, `privilege_value`,
                               `privilege_extend`, `remark`, `create_user`, `create_time`, `update_time`, `copy_from`,
                               `copy_id`)
VALUES ('data_fill_manage', 'data_fill', 'i18n_auth_manage', 3, 0, 'manage', '基础权限-管理', 'system', NULL, NULL,
        NULL, NULL);
INSERT INTO `sys_auth_detail` (`id`, `auth_id`, `privilege_name`, `privilege_type`, `privilege_value`,
                               `privilege_extend`, `remark`, `create_user`, `create_time`, `update_time`, `copy_from`,
                               `copy_id`)
VALUES ('data_fill_use', 'data_fill', 'i18n_auth_use', 1, 0, 'use', '基础权限-使用', 'system', NULL, NULL, NULL, NULL);
INSERT INTO `sys_auth_detail` (`id`, `auth_id`, `privilege_name`, `privilege_type`, `privilege_value`,
                               `privilege_extend`, `remark`, `create_user`, `create_time`, `update_time`, `copy_from`,
                               `copy_id`)
VALUES ('data_fill_write', 'data_fill', 'i18n_auth_write', 2, 0, 'write', '基础权限-写入', 'system', NULL, NULL, NULL,
        NULL);


ALTER TABLE `datasource`
    ADD COLUMN `enable_data_fill` tinyint(1) NULL DEFAULT 0 COMMENT '开启数据填报';
ALTER TABLE `datasource`
    ADD COLUMN `enable_data_fill_create_table` tinyint(1) NULL DEFAULT 0 COMMENT '数据填报允许新建表';
