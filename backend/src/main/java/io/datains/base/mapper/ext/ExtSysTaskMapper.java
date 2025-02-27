package io.datains.base.mapper.ext;

public interface ExtSysTaskMapper {

    int runningCount(Long taskId);

    void resetRunnings(Long taskId);

}
