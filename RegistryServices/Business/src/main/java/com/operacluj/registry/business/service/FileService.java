package com.operacluj.registry.business.service;

import com.operacluj.registry.model.DocumentFile;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

public interface FileService {

    void uploadFile(MultipartFile file, int registryNumber, Principal principal);

    DocumentFile getFile(int registryNumber);

    boolean hasAttachedFiles(int registryNumber);
}
