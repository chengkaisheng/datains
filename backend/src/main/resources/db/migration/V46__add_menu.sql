INSERT INTO `sys_menu` (`menu_id`, `pid`, `sub_count`, `type`, `title`, `name`, `component`,
                                         `menu_sort`, `icon`, `path`, `i_frame`, `cache`, `hidden`, `permission`,
                                         `create_by`, `update_by`, `create_time`, `update_time`)
VALUES (102, 0, 0, 1, '数据填报', 'data-filling', 'Layout', 0, '', '/data-filling', b'0', b'0', b'0', 'dataFilling:read', NULL, NULL, NULL,
        1614915491036);
INSERT INTO `sys_menu` (`menu_id`, `pid`, `sub_count`, `type`, `title`, `name`, `component`,
                        `menu_sort`, `icon`, `path`, `i_frame`, `cache`, `hidden`, `permission`,
                        `create_by`, `update_by`, `create_time`, `update_time`)
VALUES (103, 102, 0, 1, '填报管理', 'my-jobs', 'dataFilling/index', 0, '', 'my-jobs', b'0', b'0', b'0', 'dataFillingForm:read', NULL, NULL, NULL,
        1614915491036);
INSERT INTO `sys_menu` (`menu_id`, `pid`, `sub_count`, `type`, `title`, `name`, `component`,
                        `menu_sort`, `icon`, `path`, `i_frame`, `cache`, `hidden`, `permission`,
                        `create_by`, `update_by`, `create_time`, `update_time`)
VALUES (104, 102, 0, 1, '模板库', 'data-filling-template', 'dataFilling/template/index', 0, '', 'template', b'0', b'0', b'0', 'dataFillingTemplate:read', NULL, NULL, NULL,
        1614915491036);
INSERT INTO `sys_menu` (`menu_id`, `pid`, `sub_count`, `type`, `title`, `name`, `component`,
                        `menu_sort`, `icon`, `path`, `i_frame`, `cache`, `hidden`, `permission`,
                        `create_by`, `update_by`, `create_time`, `update_time`)
VALUES (105, 102, 0, 1, '审计日志', 'data-filling-log', 'dataFilling/log/index', 0, '', 'log', b'0', b'0', b'0', 'dataFillingLog:read', NULL, NULL, NULL,
        1614915491036);
INSERT INTO `sys_menu` (`menu_id`, `pid`, `sub_count`, `type`, `title`, `name`, `component`,
                        `menu_sort`, `icon`, `path`, `i_frame`, `cache`, `hidden`, `permission`,
                        `create_by`, `update_by`, `create_time`, `update_time`)
VALUES (106, 102, 0, 1, '创建', 'data-filling-form-create', 'dataFilling/form/create', 0, '', 'folder', b'0', b'0', b'0', 'dataFillingFormCreate:read', NULL, NULL, NULL,
        1614915491036);

delete from sys_menu where menu_id = 8 or menu_id = 34;
