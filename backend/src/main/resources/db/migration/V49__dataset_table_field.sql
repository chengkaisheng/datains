ALTER TABLE `dataset_table_field`
    ADD COLUMN `default_sort` int NULL DEFAULT 0 COMMENT '0-不是默认排序字段;1-此字段默认升序;2-此字段默认降序';
