package io.datains.qyy.utils;

import lombok.Data;
import org.springframework.stereotype.Service;

/**
 * QyyCommon
 *
 * @author zhangzihang
 * @since 2025-04-02 16:18
 */
@Data
@Service
public class QyyCommon {
    private String host = "http://qyy.lingbtech.com:9140";
    private String scenId = "sjtb_001";
    private String secretKey = "5FD21BFAB8449CB0572D9A3E6E0B483D";
}
