CREATE TABLE `sys_dept_leader`
(
    `id`          bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `dept_id`     bigint       DEFAULT NULL COMMENT '组织id',
    `user_id`     bigint       DEFAULT NULL COMMENT '负责人用户id',
    `create_by`   varchar(255) DEFAULT NULL COMMENT '创建者',
    `update_by`   varchar(255) DEFAULT NULL COMMENT '更新者',
    `create_time` bigint       DEFAULT NULL COMMENT '创建日期',
    `update_time` bigint       DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`) USING BTREE
) COMMENT='组织负责人';

CREATE TABLE `sys_dept_leader_auth`
(
    `id`               bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `dept_id`          bigint       DEFAULT NULL COMMENT '组织id',
    `user_id`          bigint       DEFAULT NULL COMMENT '权限来源用户id',
    `auth_source`      varchar(255) DEFAULT NULL COMMENT '资源id',
    `auth_source_type` varchar(255) DEFAULT NULL COMMENT '资源类型',
    `privilege_type`   varchar(255) DEFAULT NULL COMMENT '权限类型(多个用,隔开)',
    `create_time`      bigint       DEFAULT NULL COMMENT '创建日期',
    `update_time`      bigint       DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`) USING BTREE
) COMMENT='组织负责人拥有的资源权限';
