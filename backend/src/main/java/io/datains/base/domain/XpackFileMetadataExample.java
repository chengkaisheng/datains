package io.datains.base.domain;

import com.jayway.jsonpath.Criteria;
import lombok.Data;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 15:05
 * @Description
 */
@Data
public class XpackFileMetadataExample {

    protected String orderByClause;

    protected List<Criteria> oredCriteria;

    protected boolean distinct;
}
