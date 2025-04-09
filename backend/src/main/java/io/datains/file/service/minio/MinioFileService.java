package io.datains.file.service.minio;

import io.datains.file.service.FileService;
import io.datains.file.utils.MinIOUtils;
import io.minio.ObjectWriteResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.InputStream;

/**
 * MinioFileService
 *
 * @author zhangzihang
 * @since 2025-04-09 11:33
 */
@Slf4j
@Service
public class MinioFileService implements FileService {
    @Resource
    private MinIOUtils minIOUtils;

    @Override
    public String saveFile(MultipartFile file, String fileName) {
        try (InputStream inputStream = file.getInputStream()) {
            ObjectWriteResponse response = minIOUtils.uploadFile(fileName, inputStream);
            return response.object();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("上传文件失败");
        }
    }
}
