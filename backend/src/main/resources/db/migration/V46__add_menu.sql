INSERT INTO `sys_menu` (`menu_id`, `pid`, `sub_count`, `type`, `title`, `name`, `component`,
                                         `menu_sort`, `icon`, `path`, `i_frame`, `cache`, `hidden`, `permission`,
                                         `create_by`, `update_by`, `create_time`, `update_time`)
VALUES (101, 0, 0, 1, '数据填报', 'data-filling', 'Layout', 0, '', '/data-filling', b'1', b'0', b'0', NULL, NULL, NULL, NULL,
        1614915491036);
INSERT INTO `sys_menu` (`menu_id`, `pid`, `sub_count`, `type`, `title`, `name`, `component`,
                        `menu_sort`, `icon`, `path`, `i_frame`, `cache`, `hidden`, `permission`,
                        `create_by`, `update_by`, `create_time`, `update_time`)
VALUES (102, 101, 0, 1, '我的填报', 'my-jobs', 'dataFilling/myTask/index', 0, '', 'my-jobs', b'1', b'0', b'0', 'my-data-filling:manage', NULL, NULL, NULL,
        1614915491036);
INSERT INTO `sys_menu` (`menu_id`, `pid`, `sub_count`, `type`, `title`, `name`, `component`,
                        `menu_sort`, `icon`, `path`, `i_frame`, `cache`, `hidden`, `permission`,
                        `create_by`, `update_by`, `create_time`, `update_time`)
VALUES (103, 101, 0, 1, '表单管理', 'data-filling-form', 'dataFilling/index', 0, '', 'forms', b'1', b'0', b'0', 'data-filling-form:manage', NULL, NULL, NULL,
        1614915491036);
INSERT INTO `sys_menu` (`menu_id`, `pid`, `sub_count`, `type`, `title`, `name`, `component`,
                        `menu_sort`, `icon`, `path`, `i_frame`, `cache`, `hidden`, `permission`,
                        `create_by`, `update_by`, `create_time`, `update_time`)
VALUES (104, 101, 0, 1, '创建', 'data-filling-form-create', 'dataFilling/form/create', 0, '', 'folder', b'1', b'0', b'0', NULL, NULL, NULL, NULL,
        1614915491036);
