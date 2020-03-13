package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.exception.FileOperationException;
import com.operacluj.registry.business.service.FileService;
import com.operacluj.registry.model.DocumentFile;
import com.operacluj.registry.persistence.repository.FileRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

    private static final Logger LOG = LogManager.getLogger(FileServiceImpl.class);

    @Autowired
    private FileRepository fileRepository;

    @Override
    @Transactional
    public void uploadFile(MultipartFile file, int registryNumber) {
        try {
            fileRepository.saveFile(file.getBytes(), registryNumber);
        } catch (Exception e) {
            LOG.error("Failed to upload document {} for registry number {}", file.getName(), registryNumber);
            throw new FileOperationException(e.getMessage());
        }
    }

    @Override
    public DocumentFile getFile(int registryNumber) {
        try {
            return fileRepository.getFile(registryNumber);
        } catch (Exception e) {
            LOG.error("Failed to download document for registry number {}", registryNumber);
            throw new FileOperationException(e.getMessage());
        }
    }

    @Override
    public boolean hasAttachedFiles(int registryNumber) {
        try {
            return fileRepository.getAttachmentsNumber(registryNumber) != 0;
        } catch (Exception e) {
            LOG.error("Failed to retrieve number of attached documents for registry number {}", registryNumber);
            throw new FileOperationException(e.getMessage());
        }
    }
}
