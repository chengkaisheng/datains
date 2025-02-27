package io.datains.fill.request;

import io.datains.fill.dto.DataFillUserTaskDTO;
import lombok.Data;
import lombok.experimental.Accessors;


@Data
@Accessors(chain = true)
public class DataFillUserTaskSearchRequest extends DataFillUserTaskDTO {

    private static final long serialVersionUID = 5881604308639714955L;

}
