package io.datains.constants;

import io.datains.plugins.common.constants.OracleConstants;

/**
 * OracleCusConstants
 *
 * @author zhangzihang
 * @since 2025-09-15 13:11
 */
public class OracleCusConstants extends OracleConstants {
    public static String getFloatFormat(Integer precision) {
        if (precision == null) {
            return DEFAULT_FLOAT_FORMAT;
        } else {
            return String.format("numeric(18,%d)", precision);
        }
    }
}
