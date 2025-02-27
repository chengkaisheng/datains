package io.datains.fill.mapper;

public interface ExtTaskMapper {

    int runningCount(Long taskId);

    void resetRunnings(Long taskId);

}
