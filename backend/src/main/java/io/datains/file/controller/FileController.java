package io.datains.file.controller;

import io.datains.controller.ResultHolder;
import io.datains.file.service.FileService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

/**
 * FileController
 *
 * @author zhangzihang
 * @since 2025-04-09 11:23
 */
@RequestMapping("file")
@RestController
public class FileController {
    @Resource
    private FileService minioFileService;

    public void downloadFile(String fileName) {

    }

    @PostMapping("uploadFile")
    public ResultHolder uploadFile(MultipartFile file) {
        return ResultHolder.success(minioFileService.saveFile(file, file.getOriginalFilename()));
    }
}
