package io.datains.auth.service;

import io.datains.auth.api.dto.DynamicMenuDto;

import java.io.IOException;
import java.util.List;

public interface DynamicMenuService {

    List<DynamicMenuDto> load(String userId) throws IOException;
}
