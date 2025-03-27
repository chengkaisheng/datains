delete from `sys_auth_detail` where auth_id = 'data_fill';
delete from `sys_auth_detail` where auth_id = 'data_fill_template';

INSERT INTO `sys_auth_detail` (`id`, `auth_id`, `privilege_name`, `privilege_type`, `privilege_value`,
                               `privilege_extend`, `remark`, `create_user`, `create_time`,
                               `update_time`, `copy_from`, `copy_id`)
VALUES ('data_fill_read', 'data_fill', 'i18n_auth_read', 1, 0, 'read', '基础权限-查看', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_write', 'data_fill', 'i18n_auth_write', 2, 0, 'write', '基础权限-填报', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_read_data', 'data_fill', 'i18n_auth_read_data', 3, 0, 'read_data', '基础权限-查看数据', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_create_t', 'data_fill', 'i18n_auth_create_t', 4, 0, 'create_t', '基础权限-创建表单', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_create', 'data_fill', 'i18n_auth_create', 5, 0, 'create', '基础权限-创建', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_update', 'data_fill', 'i18n_auth_update', 6, 0, 'update', '基础权限-更新', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_export', 'data_fill', 'i18n_auth_export', 7, 0, 'export', '基础权限-导出', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_manage', 'data_fill', 'i18n_auth_manage', 8, 0, 'manage', '基础权限-管理', 'system', NULL, NULL, NULL,
        NULL)
;
INSERT INTO `sys_auth_detail` (`id`, `auth_id`, `privilege_name`, `privilege_type`, `privilege_value`,
                               `privilege_extend`, `remark`, `create_user`, `create_time`,
                               `update_time`, `copy_from`, `copy_id`)
VALUES ('data_fill_template_read', 'data_fill_template', 'i18n_auth_read', 1, 0, 'read', '基础权限-查看', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_template_create_t', 'data_fill_template', 'i18n_auth_create_t', 4, 0, 'create_t', '基础权限-创建表单', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_template_create', 'data_fill_template', 'i18n_auth_create', 5, 0, 'create', '基础权限-创建', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_template_update', 'data_fill_template', 'i18n_auth_update', 6, 0, 'update', '基础权限-更新', 'system', NULL, NULL, NULL,
        NULL),
       ('data_fill_template_manage', 'data_fill_template', 'i18n_auth_manage', 8, 0, 'manage', '基础权限-管理', 'system', NULL, NULL, NULL,
        NULL)
;
