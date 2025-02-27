package io.datains.fill.dto;


import io.datains.fill.entry.DataFillCommitLog;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataFillCommitLogDTO extends DataFillCommitLog {

    private static final long serialVersionUID = 5324275156717345584L;

    private String commitByName;


}
