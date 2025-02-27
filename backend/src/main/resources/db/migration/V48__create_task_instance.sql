CREATE TABLE `task_instance`
(
    `task_id`       varchar(128) COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务ID',
    `execute_time`  bigint                                  DEFAULT NULL COMMENT '执行时间',
    `finish_time`   bigint                                  DEFAULT NULL COMMENT '完成时间',
    `status`        varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '状态',
    `info`          longtext COLLATE utf8mb4_general_ci COMMENT '执行信息',
    `qrtz_instance` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '任务实例ID',
    PRIMARY KEY (`task_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci COMMENT ='系统内置定时任务实例状态信息表（数据源定时状态检查等）';
