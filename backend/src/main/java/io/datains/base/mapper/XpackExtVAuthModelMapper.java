package io.datains.base.mapper;

import io.datains.base.domain.XpackBaseTreeRequest;
import io.datains.base.domain.XpackVAuthModelDTO;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/10/ 14:53
 * @Description
 */
public interface XpackExtVAuthModelMapper {
    List<XpackVAuthModelDTO> searchTree(XpackBaseTreeRequest paramXpackBaseTreeRequest);
}
