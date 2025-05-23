alter table "SYS_ROLE" add column("ROLE_GROUP" VARCHAR(255));
comment
on column "SYS_ROLE"."ROLE_GROUP" is '角色分组';


SET
IDENTITY_INSERT "sys_menu" ON;
INSERT INTO "sys_menu"
("menu_id", "pid", "sub_count", "type", "title", "name", "component", "menu_sort", "icon", "path", "i_frame", "cache",
 "hidden", "permission", "create_by", "update_by", "create_time", "update_time")
VALUES ('21', '5', '0', '2', '创建角色', '', '', '999', '', '', b'0', b'0', b'1', 'role:add', NULL, NULL, NULL, NULL),
       ('22', '5', '0', '2', '删除角色', '', '', '999', '', '', b'0', b'0', b'1', 'role:del', NULL, NULL, NULL, NULL),
       ('23', '5', '0', '2', '修改角色', '', '', '999', '', '', b'0', b'0', b'1', 'role:edit', NULL, NULL, NULL, NULL);
