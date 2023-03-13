package io.datains.controller.sys.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 17:08
 * @Description
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class XpackDeptTreeNode implements Serializable {
    private Long id;
    private String label;
    private Boolean hasChildren;
    private List<XpackDeptTreeNode> children;


    public List<XpackDeptTreeNode> toList() {
        List<XpackDeptTreeNode> lists = new ArrayList();
        lists.add(this);
        return lists;
    }

    public XpackDeptTreeNode() {
    }

    public Long getId() {
        return this.id;
    }

    public String getLabel() {
        return this.label;
    }

    public Boolean getHasChildren() {
        return this.hasChildren;
    }

    public List<XpackDeptTreeNode> getChildren() {
        return this.children;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setHasChildren(Boolean hasChildren) {
        this.hasChildren = hasChildren;
    }

    public void setChildren(List<XpackDeptTreeNode> children) {
        this.children = children;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof XpackDeptTreeNode)) {
            return false;
        } else {
           XpackDeptTreeNode other = (XpackDeptTreeNode)o;
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

                Object this$label = this.getLabel();
                Object other$label = other.getLabel();
                if (this$label == null) {
                    if (other$label != null) {
                        return false;
                    }
                } else if (!this$label.equals(other$label)) {
                    return false;
                }

                Object this$hasChildren = this.getHasChildren();
                Object other$hasChildren = other.getHasChildren();
                if (this$hasChildren == null) {
                    if (other$hasChildren != null) {
                        return false;
                    }
                } else if (!this$hasChildren.equals(other$hasChildren)) {
                    return false;
                }

                Object this$children = this.getChildren();
                Object other$children = other.getChildren();
                if (this$children == null) {
                    if (other$children != null) {
                        return false;
                    }
                } else if (!this$children.equals(other$children)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof XpackDeptTreeNode;
    }


    public String toString() {
        return "XpackDeptTreeNode(id=" + this.getId() + ", label=" + this.getLabel() + ", hasChildren=" + this.getHasChildren() + ", children=" + this.getChildren() + ")";
    }
}