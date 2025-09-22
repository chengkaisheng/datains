CREATE TABLE IF NOT EXISTS `dataset_share`
(
    `share_id`     bigint NOT NULL AUTO_INCREMENT COMMENT '分享ID',
    `dataset_id`   varchar(50)  DEFAULT NULL COMMENT '数据集ID',
    `dataset_type` varchar(50)  DEFAULT NULL COMMENT '数据集类型',
    `target_id`    bigint       DEFAULT NULL COMMENT '目标ID',
    `granter`      varchar(255) DEFAULT NULL COMMENT '分享人',
    `create_time`  bigint       DEFAULT NULL COMMENT '创建日期',
    `type`         int          DEFAULT NULL COMMENT '类型0:user,1:role,2dept',
    PRIMARY KEY (`share_id`)
) ENGINE = InnoDB COMMENT ='数据集分享';
