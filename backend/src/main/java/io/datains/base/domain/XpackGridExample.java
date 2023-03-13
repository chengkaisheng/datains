package io.datains.base.domain;

import com.jayway.jsonpath.Criteria;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 15:14
 * @Description
 */
@Data
public class XpackGridExample {
    protected String orderByClause;
    protected boolean distinct;
    protected List<Criteria> oredCriteria = new ArrayList();
    protected String extendCondition;
}
