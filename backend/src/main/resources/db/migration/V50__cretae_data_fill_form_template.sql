CREATE TABLE `data_fill_form_template`
(
    `id`                varchar(50) NOT NULL COMMENT '主键ID',
    `name`              varchar(255) DEFAULT NULL COMMENT '名称',
    `pid`               varchar(255) DEFAULT NULL COMMENT '父级ID',
    `level`             int          DEFAULT NULL COMMENT '层级',
    `node_type`         varchar(255) DEFAULT NULL COMMENT 'folder/panel 目录或文件夹',
    `table_name`        varchar(255) DEFAULT NULL COMMENT '表名',
    `datasource`        varchar(255) DEFAULT NULL COMMENT '数据源',
    `forms`             longtext COMMENT '表单内容',
    `create_index`      tinyint(1)   DEFAULT '0' COMMENT '是否创建索引',
    `table_indexes`     longtext COMMENT '索引',
    `create_by`         varchar(255) DEFAULT NULL COMMENT '创建人',
    `create_time`       datetime     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by`         varchar(255) DEFAULT NULL COMMENT '更新人',
    `update_time`       datetime     DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
    `commit_new_update` tinyint(1)   DEFAULT '0',
    `status`            tinyint(1)   DEFAULT '1' COMMENT '状态 1-启用 0-禁用',
    PRIMARY KEY (`id`)
) COMMENT ='数据填报模版';

CREATE DEFINER =`root`@`%` TRIGGER `delete_auth_data_fill_form_template`
    AFTER DELETE
    ON `data_fill_form_template`
    FOR EACH ROW select delete_auth_source(OLD.id, 'data_fill_template')
                 into @ee;

INSERT INTO `sys_auth_detail` (`id`, `auth_id`, `privilege_name`, `privilege_type`, `privilege_value`,
                               `privilege_extend`, `remark`, `create_user`, `create_time`, `update_time`, `copy_from`,
                               `copy_id`)
VALUES ('data_fill_template_grant', 'data_fill_template', 'i18n_auth_grant', 15, 0, 'grant', '基础权限-授权', 'system',
        NULL,
        NULL, NULL, NULL);
INSERT INTO `sys_auth_detail` (`id`, `auth_id`, `privilege_name`, `privilege_type`, `privilege_value`,
                               `privilege_extend`, `remark`, `create_user`, `create_time`, `update_time`, `copy_from`,
                               `copy_id`)
VALUES ('data_fill_template_manage', 'data_fill_template', 'i18n_auth_manage', 3, 0, 'manage', '基础权限-管理',
        'system', NULL,
        NULL, NULL, NULL);
INSERT INTO `sys_auth_detail` (`id`, `auth_id`, `privilege_name`, `privilege_type`, `privilege_value`,
                               `privilege_extend`, `remark`, `create_user`, `create_time`, `update_time`, `copy_from`,
                               `copy_id`)
VALUES ('data_fill_template_use', 'data_fill_template', 'i18n_auth_use', 1, 0, 'use', '基础权限-使用', 'system', NULL,
        NULL,
        NULL, NULL);

CREATE TABLE `data_fill_form_log`
(
    `id`          varchar(50)  NOT NULL,
    `form_id`     varchar(50)  NOT NULL,
    `description` varchar(255) DEFAULT NULL,
    `operate`     varchar(50)  NOT NULL,
    `commit_by`   varchar(255) NOT NULL,
    `commit_time` datetime     DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);
