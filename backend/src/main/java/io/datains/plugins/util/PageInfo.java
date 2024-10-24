package io.datains.plugins.util;

import lombok.Data;

@Data
public class PageInfo {
    private Long goPage;
    private Long pageSize;
    private String dsVersion;
}
