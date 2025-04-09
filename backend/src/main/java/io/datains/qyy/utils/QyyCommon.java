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
    private String scenId = "sjtbgld_001";
    private String secretKey = "C833B9DFD8E5298DD5B9F0B4D45BF527";
}
