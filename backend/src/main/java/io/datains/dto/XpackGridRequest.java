package io.datains.dto;

import org.springframework.util.CollectionUtils;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 15:35
 * @Description
 */
public class XpackGridRequest implements Serializable {
    private List<XpackConditionEntity> conditions;
    private List<String> orders;

    public XpackGridExample convertExample() {
        XpackGridExample gridExample = new XpackGridExample();
        if (!CollectionUtils.isEmpty(this.conditions)) {
            XpackGridExample.Criteria criteria = gridExample.createCriteria();
            List var10000 = this.conditions;
            Objects.requireNonNull(criteria);
            var10000.forEach(criteria::addCondtion);
        }

        if (!CollectionUtils.isEmpty(this.orders)) {
            String orderByClause = String.join(", ", this.orders);
            gridExample.setOrderByClause(orderByClause);
        }

        return gridExample;
    }

    public XpackGridRequest() {
    }

    public List<XpackConditionEntity> getConditions() {
        return this.conditions;
    }

    public List<String> getOrders() {
        return this.orders;
    }

    public void setConditions(List<XpackConditionEntity> conditions) {
        this.conditions = conditions;
    }

    public void setOrders(List<String> orders) {
        this.orders = orders;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof io.datains.plugins.common.entity.XpackGridRequest)) {
            return false;
        } else {
            XpackGridRequest other = (XpackGridRequest)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                Object this$conditions = this.getConditions();
                Object other$conditions = other.getConditions();
                if (this$conditions == null) {
                    if (other$conditions != null) {
                        return false;
                    }
                } else if (!this$conditions.equals(other$conditions)) {
                    return false;
                }

                Object this$orders = this.getOrders();
                Object other$orders = other.getOrders();
                if (this$orders == null) {
                    if (other$orders != null) {
                        return false;
                    }
                } else if (!this$orders.equals(other$orders)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof io.datains.plugins.common.entity.XpackGridRequest;
    }

    public int hashCode() {
        //int PRIME = true;
        int result = 1;
        Object $conditions = this.getConditions();
         result = result * 59 + ($conditions == null ? 43 : $conditions.hashCode());
        Object $orders = this.getOrders();
        result = result * 59 + ($orders == null ? 43 : $orders.hashCode());
        return result;
    }

    public String toString() {
        return "XpackGridRequest(conditions=" + this.getConditions() + ", orders=" + this.getOrders() + ")";
    }
}

