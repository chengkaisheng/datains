package io.datains.base.domain;

import com.jayway.jsonpath.Criteria;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 17:25
 * @Description
 */
public class XpackSysAuthExample
{
    protected List<Criteria> oredCriteria;
    protected boolean distinct;
    protected String orderByClause;

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

    public void or(final Criteria a) {
        this.oredCriteria.add(a);
    }

    public XpackSysAuthExample() {
        this.oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(final String a) {
        this.orderByClause = a;
    }

    public static String ALLATORIxDEMO(String a) {
        final int n = 4;
        final int n2 = n << n ^ 3 << 1;
        final int n3 = 5 << 4;
        final int n4 = 1;
        final int n5 = n3 ^ n4 << n4;
        final int length = (a = a).length();
        final char[] array = new char[length];
        int n6;
        int i = n6 = length - 1;
        final char[] array2 = array;
        final char c = (char)n5;
        final int n7 = n2;
        while (i >= 0) {
            final char[] array3 = array2;
            final String s = a;
            final int n8 = n6;
            final char char1 = s.charAt(n8);
            --n6;
            array3[n8] = (char)(char1 ^ n7);
            if (n6 < 0) {
                break;
            }
            final char[] array4 = array2;
            final String s2 = a;
            final int n9 = n6--;
            array4[n9] = (char)(s2.charAt(n9) ^ c);
            i = n6;
        }
        return new String(array2);
    }

    public List<Criteria> getOredCriteria() {
        return this.oredCriteria;
    }

    public boolean isDistinct() {
        return this.distinct;
    }

    public String getOrderByClause() {
        return this.orderByClause;
    }


    public static class Criterion
    {
        private boolean g;
        private Object B;
        private Object a;
        private String b;
        private boolean G;
        private boolean h;
        private boolean i;
        private String ALLATORIxDEMO;


        protected Criterion(final String a) {
            final boolean g = true;
            final String allatorIxDEMO = null;
            this.b = a;
            this.ALLATORIxDEMO = allatorIxDEMO;
            this.G = g;
        }

        public boolean isListValue() {
            return this.g;
        }

        public boolean isNoValue() {
            return this.G;
        }

        public boolean isSingleValue() {
            return this.i;
        }

        public boolean isBetweenValue() {
            return this.h;
        }

        public Object getSecondValue() {
            return this.B;
        }

        public String getCondition() {
            return this.b;
        }

        public String getTypeHandler() {
            return this.ALLATORIxDEMO;
        }

        public Object getValue() {
            return this.a;
        }


    }

}
