package io.datains.constants;

import io.datains.plugins.common.constants.DorisConstants;

/**
 * DorisCusConstants
 *
 * @author zhangzihang
 * @since 2025-09-15 13:54
 */
public class DorisCusConstants extends DorisConstants {
    public static String getFloatFormat(String originField, Integer precision) {
        if (precision == null) {
            return String.format("ROUND(%s,%d)", originField, 2);
        } else {
            return String.format("ROUND(%s,%d)", originField, precision);
        }
    }
}
