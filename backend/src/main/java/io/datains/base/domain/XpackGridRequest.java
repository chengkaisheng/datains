package io.datains.base.domain;

import lombok.Data;
import java.io.Serializable;
import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 17:58
 * @Description
 */
@Data
public class XpackGridRequest implements Serializable {
        private List<XpackConditionEntity> conditions;
        private List<String> orders;
}
