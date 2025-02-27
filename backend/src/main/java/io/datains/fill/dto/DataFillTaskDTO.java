package io.datains.fill.dto;


import io.datains.fill.entry.DataFillTaskWithBLOBs;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataFillTaskDTO extends DataFillTaskWithBLOBs {

    private static final long serialVersionUID = 3610753131867651856L;

    private String formName;

    private String creatorName;


}
