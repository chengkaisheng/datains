package io.datains.constants;

import io.datains.plugins.common.constants.PgConstants;

/**
 * PgCusConstants
 *
 * @author zhangzihang
 * @since 2025-09-15 13:22
 */
public class PgCusConstants extends PgConstants {
    public static String getFloatFormat(Integer precision) {
        if (precision == null) {
            return DEFAULT_FLOAT_FORMAT;
        } else {
            return String.format("DECIMAL(20,%d)", precision);
        }
    }
}
