package io.datains.qyy.utils;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
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
    @Value("${qyy.host}")
    private String host;
    @Value("${qyy.scen_id}")
    private String scenId;
    @Value("${qyy.secret_key}")
    private String secretKey;
    @Value("${qyy.scen_id2}")
    private String scenId2;
    @Value("${qyy.secret_key2}")
    private String secretKey2;
}
