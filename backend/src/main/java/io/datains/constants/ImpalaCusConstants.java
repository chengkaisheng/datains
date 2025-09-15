package io.datains.constants;

import io.datains.plugins.common.constants.ImpalaConstants;

/**
 * ImpalaCusConstants
 *
 * @author zhangzihang
 * @since 2025-09-15 13:29
 */
public class ImpalaCusConstants extends ImpalaConstants {
    public static String getFloatFormat(Integer precision) {
        if (precision == null) {
            return DEFAULT_FLOAT_FORMAT;
        } else {
            return String.format("DECIMAL(20,%d)", precision);
        }
    }
}
