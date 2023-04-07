package io.datains.base.domain;

/**
 * @Author Mr.zhang
 * @Date: 2023/04/07/ 11:31
 * @Description
 */
public class ColumnPermissionItem {
    private String id;
    private String name;
    private Boolean selected = false;
    private String opt;

    public ColumnPermissionItem() {
    }

    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public Boolean getSelected() {
        return this.selected;
    }

    public String getOpt() {
        return this.opt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }

    public void setOpt(String opt) {
        this.opt = opt;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof io.dataease.plugins.xpack.auth.dto.request.ColumnPermissionItem)) {
            return false;
        } else {
            ColumnPermissionItem other = (ColumnPermissionItem)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                label59: {
                    Object this$id = this.getId();
                    Object other$id = other.getId();
                    if (this$id == null) {
                        if (other$id == null) {
                            break label59;
                        }
                    } else if (this$id.equals(other$id)) {
                        break label59;
                    }

                    return false;
                }

                Object this$name = this.getName();
                Object other$name = other.getName();
                if (this$name == null) {
                    if (other$name != null) {
                        return false;
                    }
                } else if (!this$name.equals(other$name)) {
                    return false;
                }

                Object this$selected = this.getSelected();
                Object other$selected = other.getSelected();
                if (this$selected == null) {
                    if (other$selected != null) {
                        return false;
                    }
                } else if (!this$selected.equals(other$selected)) {
                    return false;
                }

                Object this$opt = this.getOpt();
                Object other$opt = other.getOpt();
                if (this$opt == null) {
                    if (other$opt != null) {
                        return false;
                    }
                } else if (!this$opt.equals(other$opt)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof io.dataease.plugins.xpack.auth.dto.request.ColumnPermissionItem;
    }

    public int hashCode() {
        //int PRIME = true;
        int result = 1;
        Object $id = this.getId();
         result = result * 59 + ($id == null ? 43 : $id.hashCode());
        Object $name = this.getName();
        result = result * 59 + ($name == null ? 43 : $name.hashCode());
        Object $selected = this.getSelected();
        result = result * 59 + ($selected == null ? 43 : $selected.hashCode());
        Object $opt = this.getOpt();
        result = result * 59 + ($opt == null ? 43 : $opt.hashCode());
        return result;
    }

    public String toString() {
        return "ColumnPermissionItem(id=" + this.getId() + ", name=" + this.getName() + ", selected=" + this.getSelected() + ", opt=" + this.getOpt() + ")";
    }
}
