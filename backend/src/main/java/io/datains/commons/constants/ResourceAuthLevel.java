package io.datains.commons.constants;

public enum ResourceAuthLevel {

    COMMON_LEVEL_USE(1, "普通使用"),

    PANNEL_LEVEL_VIEW(1, "仪表盘查看"),
    PANNEL_LEVEL_EXPORT(3, "仪表盘导出"),
    PANNEL_LEVEL_MANAGE(5, "仪表盘管理"),
    PANNEL_LEVEL_GRANT(15, "仪表盘授权"),

    DATASET_LEVEL_USE(1, "数据集查看"),
    DATASET_LEVEL_MANAGE(3, "数据集管理"),
    DATASET_LEVEL_GRANT(15, "数据集授权"),

    LINK_LEVEL_USE(1, "数据链路查看"),
    LINK_LEVEL_MANAGE(3, "数据链路管理"),
    LINK_LEVEL_GRANT(15, "数据链路授权"),

    DATASOURCE_LEVEL_USE(1, "数据源查看"),
    DATASOURCE_LEVEL_MANAGE(3, "数据源管理"),
    DATASOURCE_LEVEL_GRANT(15, "数据源授权");

    private Integer level;
    private String name;

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    ResourceAuthLevel(Integer level, String name) {
        this.level = level;
        this.name = name;
    }


}
