package io.datains.base.domain;



import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/04/07/ 11:38
 * @Description
 */
public class ColumnPermissions {
    private Boolean enable;
    private List<ColumnPermissionItem> columns;

    public ColumnPermissions() {
    }

    public Boolean getEnable() {
        return this.enable;
    }

    public List<ColumnPermissionItem> getColumns() {
        return this.columns;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public void setColumns(List<ColumnPermissionItem> columns) {
        this.columns = columns;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof ColumnPermissions)) {
            return false;
        } else {
            ColumnPermissions other = (ColumnPermissions) o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                Object this$enable = this.getEnable();
                Object other$enable = other.getEnable();
                if (this$enable == null) {
                    if (other$enable != null) {
                        return false;
                    }
                } else if (!this$enable.equals(other$enable)) {
                    return false;
                }

                Object this$columns = this.getColumns();
                Object other$columns = other.getColumns();
                if (this$columns == null) {
                    if (other$columns != null) {
                        return false;
                    }
                } else if (!this$columns.equals(other$columns)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof ColumnPermissions;
    }

    public int hashCode() {
        //int PRIME = true;
        int result = 1;
        Object $enable = this.getEnable();
        result = result * 59 + ($enable == null ? 43 : $enable.hashCode());
        Object $columns = this.getColumns();
        result = result * 59 + ($columns == null ? 43 : $columns.hashCode());
        return result;
    }

    public String toString() {
        return "ColumnPermissions(enable=" + this.getEnable() + ", columns=" + this.getColumns() + ")";
    }
}