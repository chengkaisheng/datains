package io.datains.commons.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * 非空判断工具类
 *
 * @author Mr.zhang
 * @version v1.0.0
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class IsNullUtils {

    /**
     * 判断一个或多个对象是否为空
     *
     * @param values 可变参数, 要判断的一个或多个对象
     * @return 只有要判断的一个对象都为空则返回true, 否则返回false boolean
     */
    public static boolean isNull(Object... values) {
        if (!isNotNullAndNotEmpty(values)) {
            return true;
        }
        for (Object value : values) {
            boolean flag;
            if (value instanceof Object[]) {
                flag = !isNotNullAndNotEmpty((Object[]) value);
            } else if (value instanceof Collection<?>) {
                flag = !isNotNullAndNotEmpty((Collection<?>) value);
            } else if (value instanceof String) {
                flag = isOEmptyOrNull(value);
            } else {
                flag = (null == value);
            }
            if (flag) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断一个或多个对象是否不为空
     *
     * @param values 可变参数, 要判断的一个或多个对象
     * @return 只有要判断的一个对象都为不为空则返回true, 否则返回false boolean
     */
    public static boolean isNotNull(Object... values) {
        return !isNull(values);
    }

    /**
     * 判断Object是否为null
     *
     * @param o Object参数
     *
     * @return boolean boolean
     */
    private static boolean isOEmptyOrNull(Object o) {
        return o == null || isSEmptyOrNull(o.toString());
    }

    /**
     * Is s empty or null boolean.
     *
     * @param s the s
     *
     * @return boolean boolean
     */
    private static boolean isSEmptyOrNull(String s) {
        return stringIsNullAndTrim(s).length() <= 0;
    }

    /**
     * 判断对象数组是否为空并且数量大于0
     *
     * @param value the value
     * @return boolean
     */
    private static Boolean isNotNullAndNotEmpty(Object[] value) {
        boolean bl = false;
        if (null != value && 0 < value.length) {
            bl = true;
        }
        return bl;
    }

    /**
     * 判断对象集合（List,Set）是否为空并且数量大于0
     *
     * @param value the value
     * @return boolean
     */
    private static Boolean isNotNullAndNotEmpty(Collection<?> value) {
        boolean bl = false;
        if (null != value && !value.isEmpty()) {
            bl = true;
        }
        return bl;
    }

    /**
     * @description 截取两位小数
     * @author zhangsss
     * @date 2019/3/16 16:14
     * @Param
     * @Return
     **/
    public static BigDecimal interceptTwoDecimal(BigDecimal num) {
        if (num != null && new BigDecimal(num.intValue()).compareTo(num) == -1) {
            num = num.setScale(2, BigDecimal.ROUND_DOWN);
        }
        return num;
    }




    /**
     * @description 截取四位小数
     * @author zhangsss
     * @date 2019/3/16 16:14
     * @Param
     * @Return
     **/
    public static BigDecimal interceptFourDecimal(BigDecimal num) {
        if (num != null && new BigDecimal(num.intValue()).compareTo(num) == -1) {
            num = num.setScale(4, BigDecimal.ROUND_DOWN);
        }
        return num;
    }


    public static BigDecimal keepFour(BigDecimal num) {
        return  num.setScale(4, BigDecimal.ROUND_DOWN);

    }
    /**
     * 截取两位小数 并去掉无用的0
     * @param
     * @return
     **/
    public static BigDecimal noZreo(BigDecimal number) {
        BigDecimal num;
        num=interceptTwoDecimal(number);
        BigDecimal lastNum =new BigDecimal(num.toString());
        BigDecimal lastNums=new BigDecimal(lastNum.stripTrailingZeros().toPlainString());
        return  lastNums;
    }

    /**
     * String类型非空去空格
     *
     * @param s String参数
     * @return String 去空格后的的String，为null就是""补齐
     */
    private static String stringIsNullAndTrim(String s) {
        return s == null ? "" : s.trim();
    }

    /**
     * 日期加天数
     * @param time
     * @param number
     * @param field
     * @return
     */
    public static LocalDate plus(LocalDate time, long number, TemporalUnit field) {
        return time.plus(number, field);
    }

    /**
     * String 转localDateTime
     * @param time
     * @return
     */
    public static LocalDateTime toLocalDateTime(String time) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(time, dtf);
    }

    /**
     * String 转localDateTime
     * @param time
     * @return
     */
    public static LocalDate toLocalDate(String time) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(time, dtf);
    }

    public static LocalDate toLocalDate(LocalDateTime time) {
        LocalDate localDate=time.toLocalDate();
        return localDate;
    }

    public static BigDecimal IsNullToBigDecimal(String arg){
        if(arg==null || arg.equals("")){
            return new BigDecimal(0).setScale(2, BigDecimal.ROUND_DOWN);
        }
        return new BigDecimal(arg);
    }


    public static void main(String[] args) {
        System.out.println(interceptFourDecimal(BigDecimal.valueOf(22400.00000000)));
        String ss="hjkashdjs";
        String gg="as";
        if (ss.contains(gg)){
            System.out.println("baohan!");
        }
        List<Integer> ll= new ArrayList<>();
        ll.add(1);
        ll.add(2);
        Long hh=1L;
        if (ll.contains(hh)){
            System.out.println("包含");
        }

    }

    /**
     * 判断小数点后是否大于0
     * @param arg
     * @return
     */
    public static BigDecimal bigDecimalChange(BigDecimal arg){
        if(isNotNull(arg)){
            String param = arg.toString();
                String a = param.substring(param.indexOf(".")+1);
                if(Double.valueOf(a)>0){
                    return arg.setScale(2, BigDecimal.ROUND_DOWN);
                }
                return arg.setScale(0, BigDecimal.ROUND_DOWN);
            }
            return new BigDecimal("0.00");
        }

    public static String[] stringToArray(String arg){
        if(isNotNull(arg)){
            return arg.split(",");
        }
        return new String[]{};
    }
    public static String[] stringToArray(String[] arg){
        if(isNotNull(arg)){
            return arg;
        }
        return new String[]{};
    }


}
