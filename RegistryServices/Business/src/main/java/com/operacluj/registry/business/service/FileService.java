package com.operacluj.registry.business.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    void uploadFile(MultipartFile file, int registryNumber);
}
