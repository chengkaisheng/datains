package io.datains.base.domain;

import lombok.Data;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/06/ 18:01
 * @Description
 */
@Data
public class XpackConditionEntity {
    private String field;
    private String operator;
    private Object value;

}
