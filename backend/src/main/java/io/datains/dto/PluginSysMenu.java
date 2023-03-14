package io.datains.dto;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 10:58
 * @Description
 */
import java.util.Objects;

public class PluginSysMenu {
    private Long menuId;

    private Long pid;

    private Integer subCount;

    private Integer type;

    private String title;

    private String name;

    private String component;

    private Integer menuSort;

    private String icon;

    private String path;

    private Boolean iFrame;

    private Boolean cache;

    private Boolean hidden;

    private String permission;

    private String createBy;

    private String updateBy;

    private Long createTime;

    private Long updateTime;

    private boolean noLayout;

    private static final long serialVersionUID = 1L;

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public void setSubCount(Integer subCount) {
        this.subCount = subCount;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public void setMenuSort(Integer menuSort) {
        this.menuSort = menuSort;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public void setIFrame(Boolean iFrame) {
        this.iFrame = iFrame;
    }

    public void setCache(Boolean cache) {
        this.cache = cache;
    }

    public void setHidden(Boolean hidden) {
        this.hidden = hidden;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    public void setUpdateTime(Long updateTime) {
        this.updateTime = updateTime;
    }

    public void setNoLayout(boolean noLayout) {
        this.noLayout = noLayout;
    }

    public String toString() {
        return "PluginSysMenu(menuId=" + getMenuId() + ", pid=" + getPid() + ", subCount=" + getSubCount() + ", type=" + getType() + ", title=" + getTitle() + ", name=" + getName() + ", component=" + getComponent() + ", menuSort=" + getMenuSort() + ", icon=" + getIcon() + ", path=" + getPath() + ", iFrame=" + getIFrame() + ", cache=" + getCache() + ", hidden=" + getHidden() + ", permission=" + getPermission() + ", createBy=" + getCreateBy() + ", updateBy=" + getUpdateBy() + ", createTime=" + getCreateTime() + ", updateTime=" + getUpdateTime() + ", noLayout=" + isNoLayout() + ")";
    }

    public Long getMenuId() {
        return this.menuId;
    }

    public Long getPid() {
        return this.pid;
    }

    public Integer getSubCount() {
        return this.subCount;
    }

    public Integer getType() {
        return this.type;
    }

    public String getTitle() {
        return this.title;
    }

    public String getName() {
        return this.name;
    }

    public String getComponent() {
        return this.component;
    }

    public Integer getMenuSort() {
        return this.menuSort;
    }

    public String getIcon() {
        return this.icon;
    }

    public String getPath() {
        return this.path;
    }

    public Boolean getIFrame() {
        return this.iFrame;
    }

    public Boolean getCache() {
        return this.cache;
    }

    public Boolean getHidden() {
        return this.hidden;
    }

    public String getPermission() {
        return this.permission;
    }

    public String getCreateBy() {
        return this.createBy;
    }

    public String getUpdateBy() {
        return this.updateBy;
    }

    public Long getCreateTime() {
        return this.createTime;
    }

    public Long getUpdateTime() {
        return this.updateTime;
    }

    public boolean isNoLayout() {
        return this.noLayout;
    }

    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        PluginSysMenu menu = (PluginSysMenu)o;
        return Objects.equals(this.menuId, menu.menuId);
    }

    public int hashCode() {
        return Objects.hash(new Object[] { this.menuId });
    }
}
