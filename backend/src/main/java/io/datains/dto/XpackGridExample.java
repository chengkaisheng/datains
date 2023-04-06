package io.datains.dto;

import io.datains.plugins.common.entity.XpackConditionEntity;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 15:41
 * @Description
 */
public class XpackGridExample {
    protected String orderByClause;
    protected boolean distinct;
    protected List<Criteria> oredCriteria = new ArrayList();
    protected String extendCondition;

    public XpackGridExample() {
    }

    public String getExtendCondition() {
        return this.extendCondition;
    }

    public void setExtendCondition(String extendCondition) {
        this.extendCondition = extendCondition;
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return this.orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return this.distinct;
    }

    public List<Criteria> getOredCriteria() {
        return this.oredCriteria;
    }

    public void or(XpackGridExample.Criteria criteria) {
        this.oredCriteria.add(criteria);
    }

    public XpackGridExample.Criteria or() {
        XpackGridExample.Criteria criteria = this.createCriteriaInternal();
        this.oredCriteria.add(criteria);
        return criteria;
    }

    public XpackGridExample.Criteria createCriteria() {
       XpackGridExample.Criteria criteria = this.createCriteriaInternal();
        if (this.oredCriteria.size() == 0) {
            this.oredCriteria.add(criteria);
        }

        return criteria;
    }

    protected XpackGridExample.Criteria createCriteriaInternal() {
        XpackGridExample.Criteria criteria = new XpackGridExample.Criteria();
        return criteria;
    }

    public void clear() {
        this.oredCriteria.clear();
        this.orderByClause = null;
        this.distinct = false;
    }

    public static class Criterion {
        private String condition;
        private Object value;
        private Object secondValue;
        private boolean noValue;
        private boolean singleValue;
        private boolean betweenValue;
        private boolean listValue;
        private String typeHandler;

        public String getCondition() {
            return this.condition;
        }

        public Object getValue() {
            return this.value;
        }

        public Object getSecondValue() {
            return this.secondValue;
        }

        public boolean isNoValue() {
            return this.noValue;
        }

        public boolean isSingleValue() {
            return this.singleValue;
        }

        public boolean isBetweenValue() {
            return this.betweenValue;
        }

        public boolean isListValue() {
            return this.listValue;
        }

        public String getTypeHandler() {
            return this.typeHandler;
        }

        protected Criterion(String condition) {
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }

        }

        protected Criterion(String condition, Object value) {
            this(condition, value, (String)null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, (String)null);
        }
    }

    public static class Criteria extends XpackGridExample.GeneratedCriteria {
        protected Criteria() {
        }
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria = new ArrayList();

        protected GeneratedCriteria() {
        }

        public boolean isValid() {
            return this.criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return this.criteria;
        }

        public List<Criterion> getCriteria() {
            return this.criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            } else {
                this.criteria.add(new XpackGridExample.Criterion(condition));
            }
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            } else {
                this.criteria.add(new XpackGridExample.Criterion(condition, value));
            }
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 != null && value2 != null) {
                this.criteria.add(new XpackGridExample.Criterion(condition, value1, value2));
            } else {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
        }

        public XpackGridExample.Criteria addCondtion(XpackConditionEntity conditionEntity) {
            String field = conditionEntity.getField();
            Object value = conditionEntity.getValue();
            String operator = conditionEntity.getOperator();
            if (StringUtils.isEmpty(operator)) {
                operator = "like";
            }

            byte var6 = -1;
            switch(operator.hashCode()) {
                case -1039759982:
                    if (operator.equals("not in")) {
                        var6 = 5;
                    }
                    break;
                case -216634360:
                    if (operator.equals("between")) {
                        var6 = 6;
                    }
                    break;
                case 3244:
                    if (operator.equals("eq")) {
                        var6 = 0;
                    }
                    break;
                case 3294:
                    if (operator.equals("ge")) {
                        var6 = 8;
                    }
                    break;
                case 3309:
                    if (operator.equals("gt")) {
                        var6 = 7;
                    }
                    break;
                case 3365:
                    if (operator.equals("in")) {
                        var6 = 4;
                    }
                    break;
                case 3449:
                    if (operator.equals("le")) {
                        var6 = 10;
                    }
                    break;
                case 3464:
                    if (operator.equals("lt")) {
                        var6 = 9;
                    }
                    break;
                case 3511:
                    if (operator.equals("ne")) {
                        var6 = 1;
                    }
                    break;
                case 3321751:
                    if (operator.equals("like")) {
                        var6 = 2;
                    }
                    break;
                case 1518125252:
                    if (operator.equals("not like")) {
                        var6 = 3;
                    }
            }

            switch(var6) {
                case 0:
                    this.addCriterion(field + " = ", value, field);
                    break;
                case 1:
                    this.addCriterion(field + " <> ", value, field);
                    break;
                case 2:
                    this.addCriterion(field + " like ", "%" + value + "%", field);
                    break;
                case 3:
                    this.addCriterion(field + " not like ", "%" + value + "%", field);
                    break;
                case 4:
                    List<Object> invalues = (List)value;
                    this.addCriterion(field + " in", invalues, field);
                    break;
                case 5:
                    List<Object> notinvalues = (List)value;
                    this.addCriterion(field + " not in", notinvalues, field);
                    break;
                case 6:
                    List<Object> values = (List)value;
                    Object v1 = values.get(0);
                    Object v2 = values.get(1);
                    this.addCriterion(field + " between", v1, v2, field);
                    break;
                case 7:
                    this.addCriterion(field + " > ", value, field);
                    break;
                case 8:
                    this.addCriterion(field + " >= ", value, field);
                    break;
                case 9:
                    this.addCriterion(field + " < ", value, field);
                    break;
                case 10:
                    this.addCriterion(field + " <= ", value, field);
            }

            return (XpackGridExample.Criteria)this;
        }

        public void addCondtion(Object o) {
        }
    }
}
