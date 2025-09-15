package io.datains.constants;


import io.datains.plugins.common.constants.MySQLConstants;

/**
 * MySQLConstants
 *
 * @author zhangzihang
 * @since 2025-09-15 11:16
 */
public class MySQLCusConstants extends MySQLConstants {

    public static String getFloatFormat(Integer precision) {
        if (precision == null) {
            return DEFAULT_FLOAT_FORMAT;
        } else {
            return String.format("DECIMAL(20,%d)", precision);
        }
    }
}
