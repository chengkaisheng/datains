package io.datains.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 16:01
 * @Description
 */
public class XpackSysDeptExample
{
    protected List<Criteria> oredCriteria;
    protected String orderByClause;
    protected boolean distinct;

    public boolean isDistinct() {
        return this.distinct;
    }

    public XpackSysDeptExample() {
        this.oredCriteria = new ArrayList<Criteria>();
    }

    public void clear() {
        final boolean distinct = false;
        final String orderByClause = null;
        this.oredCriteria.clear();
        this.orderByClause = orderByClause;
        this.distinct = distinct;
    }

    public void setDistinct(final boolean a) {
        this.distinct = a;
    }

    protected Criteria createCriteriaInternal() {
        return new Criteria();
    }

    public List<Criteria> getOredCriteria() {
        return this.oredCriteria;
    }

    public Criteria or() {
        final Criteria criteriaInternal = this.createCriteriaInternal();
        this.oredCriteria.add(criteriaInternal);
        return criteriaInternal;
    }

    public void or(final Criteria a) {
        this.oredCriteria.add(a);
    }

    public Criteria createCriteria() {
        final Criteria criteriaInternal = this.createCriteriaInternal();
        if (this.oredCriteria.size() == 0) {
            this.oredCriteria.add(criteriaInternal);
        }
        return criteriaInternal;
    }

    public static String ALLATORIxDEMO(String a) {
        final int n = 3;
        final int n2 = n << n ^ 0x2;
        final char c = '\u0004';
        final int length = (a = a).length();
        final char[] array = new char[length];
        int n3;
        int i = n3 = length - 1;
        final char[] array2 = array;
        final char c2 = c;
        final int n4 = n2;
        while (i >= 0) {
            final char[] array3 = array2;
            final String s = a;
            final int n5 = n3;
            final char char1 = s.charAt(n5);
            --n3;
            array3[n5] = (char)(char1 ^ n4);
            if (n3 < 0) {
                break;
            }
            final char[] array4 = array2;
            final String s2 = a;
            final int n6 = n3--;
            array4[n6] = (char)(s2.charAt(n6) ^ c2);
            i = n3;
        }
        return new String(array2);
    }

    public String getOrderByClause() {
        return this.orderByClause;
    }

    public void setOrderByClause(final String a) {
        this.orderByClause = a;
    }



    public static class Criterion
    {
        private Object B;
        private boolean G;
        private boolean h;
        private String ALLATORIxDEMO;
        private boolean g;
        private String b;
        private Object a;
        private boolean i;

        public Object getSecondValue() {
            return this.B;
        }

        protected Criterion(final String a) {
            final boolean g = true;
            final String allatorIxDEMO = null;
            this.b = a;
            this.ALLATORIxDEMO = allatorIxDEMO;
            this.G = g;
        }

        public String getCondition() {
            return this.b;
        }

        public Object getValue() {
            return this.a;
        }

        public String getTypeHandler() {
            return this.ALLATORIxDEMO;
        }



        public boolean isBetweenValue() {
            return this.h;
        }

        public boolean isNoValue() {
            return this.G;
        }

        public boolean isListValue() {
            return this.g;
        }

        public boolean isSingleValue() {
            return this.i;
        }
    }

    public static class Criteria extends XpackGridExample.GeneratedCriteria
    {
        protected Criteria() {
        }
    }
}
