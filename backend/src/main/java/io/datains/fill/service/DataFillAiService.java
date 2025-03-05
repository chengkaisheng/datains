package io.datains.fill.service;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * DataFillAiService
 *
 * @author zhangzihang
 * @since 2025-03-05 15:44
 */
public interface DataFillAiService {
    void excelUploadAiHandle(MultipartFile file, HttpServletResponse response) throws IOException;
}
