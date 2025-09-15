package io.datains.constants;

import io.datains.plugins.common.constants.HiveConstants;

/**
 * HiveCusConstants
 *
 * @author zhangzihang
 * @since 2025-09-15 13:31
 */
public class HiveCusConstants extends HiveConstants {
    public static String getFloatFormat(Integer precision) {
        if (precision == null) {
            return DEFAULT_FLOAT_FORMAT;
        } else {
            return String.format("DECIMAL(20,%d)", precision);
        }
    }
}
