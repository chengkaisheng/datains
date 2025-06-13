package io.datains.file.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * FileService
 *
 * @author zhangzihang
 * @since 2025-04-09 11:33
 */
public interface FileService {
    /**
     * 保存文件
     *
     * @param file 文件内容
     * @param fileName 文件名
     * @return 文件key
     */
    String saveFile(MultipartFile file, String fileName);
}
