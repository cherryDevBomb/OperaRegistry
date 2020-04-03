package com.operacluj.registry.business.service;

import com.operacluj.registry.model.DocumentFile;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    void uploadFile(MultipartFile file, int registryNumber);

    DocumentFile getFile(int registryNumber);

    boolean hasAttachedFiles(int registryNumber);
}
