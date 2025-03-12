delete
from `sys_menu`
where menu_id in (30, 100);
ALTER TABLE `data_fill_form`
    ADD COLUMN `status` tinyint(1) NULL DEFAULT 1 COMMENT '状态 1-启用 0-禁用';
