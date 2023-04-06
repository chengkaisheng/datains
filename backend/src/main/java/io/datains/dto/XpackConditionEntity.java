package io.datains.dto;

import java.io.Serializable;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 15:42
 * @Description
 */
public class XpackConditionEntity implements Serializable {
    private String field;
    private String operator;
    private Object value;

    public XpackConditionEntity() {
    }

    public String getField() {
        return this.field;
    }

    public String getOperator() {
        return this.operator;
    }

    public Object getValue() {
        return this.value;
    }

    public void setField(String field) {
        this.field = field;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof io.datains.plugins.common.entity.XpackConditionEntity)) {
            return false;
        } else {
           XpackConditionEntity other = (XpackConditionEntity)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                label47: {
                    Object this$field = this.getField();
                    Object other$field = other.getField();
                    if (this$field == null) {
                        if (other$field == null) {
                            break label47;
                        }
                    } else if (this$field.equals(other$field)) {
                        break label47;
                    }

                    return false;
                }

                Object this$operator = this.getOperator();
                Object other$operator = other.getOperator();
                if (this$operator == null) {
                    if (other$operator != null) {
                        return false;
                    }
                } else if (!this$operator.equals(other$operator)) {
                    return false;
                }

                Object this$value = this.getValue();
                Object other$value = other.getValue();
                if (this$value == null) {
                    if (other$value != null) {
                        return false;
                    }
                } else if (!this$value.equals(other$value)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof io.datains.plugins.common.entity.XpackConditionEntity;
    }

    public int hashCode() {
        //int PRIME = true;
        int result = 1;
        Object $field = this.getField();
         result = result * 59 + ($field == null ? 43 : $field.hashCode());
        Object $operator = this.getOperator();
        result = result * 59 + ($operator == null ? 43 : $operator.hashCode());
        Object $value = this.getValue();
        result = result * 59 + ($value == null ? 43 : $value.hashCode());
        return result;
    }

    public String toString() {
        return "XpackConditionEntity(field=" + this.getField() + ", operator=" + this.getOperator() + ", value=" + this.getValue() + ")";
    }
}

