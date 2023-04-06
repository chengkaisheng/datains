package io.datains.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 15:54
 * @Description
 */
public class XpackSysAuthDetailExample
{
    protected String orderByClause;
    protected List<Criteria> oredCriteria;
    protected boolean distinct;

    public XpackSysAuthDetailExample() {
        this.oredCriteria = new ArrayList<Criteria>();
    }

    public void setDistinct(final boolean a) {
        this.distinct = a;
    }

    public boolean isDistinct() {
        return this.distinct;
    }

    public Criteria createCriteria() {
        final Criteria criteriaInternal = this.createCriteriaInternal();
        if (this.oredCriteria.size() == 0) {
            this.oredCriteria.add(criteriaInternal);
        }
        return criteriaInternal;
    }

    public void clear() {
        final boolean distinct = false;
        final String orderByClause = null;
        this.oredCriteria.clear();
        this.orderByClause = orderByClause;
        this.distinct = distinct;
    }

    public void setOrderByClause(final String a) {
        this.orderByClause = a;
    }

    protected Criteria createCriteriaInternal() {
        return new Criteria();
    }

    public static String ALLATORIxDEMO(String a) {
        final int n = 4;
        final int n2 = n << n ^ 0x1;
        final int n3 = 4 << 3 ^ 0x5;
        final int length = (a = a).length();
        final char[] array = new char[length];
        int n4;
        int i = n4 = length - 1;
        final char[] array2 = array;
        final char c = (char)n3;
        final int n5 = n2;
        while (i >= 0) {
            final char[] array3 = array2;
            final String s = a;
            final int n6 = n4;
            final char char1 = s.charAt(n6);
            --n4;
            array3[n6] = (char)(char1 ^ n5);
            if (n4 < 0) {
                break;
            }
            final char[] array4 = array2;
            final String s2 = a;
            final int n7 = n4--;
            array4[n7] = (char)(s2.charAt(n7) ^ c);
            i = n4;
        }
        return new String(array2);
    }

    public String getOrderByClause() {
        return this.orderByClause;
    }

    public Criteria or() {
        final Criteria criteriaInternal = this.createCriteriaInternal();
        this.oredCriteria.add(criteriaInternal);
        return criteriaInternal;
    }

    public List<Criteria> getOredCriteria() {
        return this.oredCriteria;
    }

    public void or(final Criteria a) {
        this.oredCriteria.add(a);
    }




    public static class Criteria extends XpackGridExample.GeneratedCriteria
    {
        protected Criteria() {
        }
    }

    public static class Criterion
    {
        private boolean g;
        private Object a;
        private boolean i;
        private String ALLATORIxDEMO;
        private Object B;
        private boolean G;
        private String b;
        private boolean h;

        protected Criterion(final String a) {
            final boolean g = true;
            final String allatorIxDEMO = null;
            this.b = a;
            this.ALLATORIxDEMO = allatorIxDEMO;
            this.G = g;
        }

        public String getTypeHandler() {
            return this.ALLATORIxDEMO;
        }

        public boolean isSingleValue() {
            return this.i;
        }

        public boolean isListValue() {
            return this.g;
        }


        public String getCondition() {
            return this.b;
        }


        public boolean isNoValue() {
            return this.G;
        }

        public boolean isBetweenValue() {
            return this.h;
        }

        public Object getSecondValue() {
            return this.B;
        }

        public Object getValue() {
            return this.a;
        }
    }
}