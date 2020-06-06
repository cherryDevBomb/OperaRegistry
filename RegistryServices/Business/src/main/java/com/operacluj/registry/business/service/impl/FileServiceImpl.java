package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.exception.ArgumentNotValidException;
import com.operacluj.registry.business.domain.exception.OperationFailedException;
import com.operacluj.registry.business.service.FileService;
import com.operacluj.registry.business.translator.FileTranslator;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.model.DocumentFile;
import com.operacluj.registry.persistence.repository.FileRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
public class FileServiceImpl implements FileService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private FileTranslator fileTranslator;

    @Override
    @Transactional
    public void uploadFile(MultipartFile file, int registryNumber, Principal principal) {
        log.info("Entering uploadFile for document {}", registryNumber);
        if (!getSupportedFormats().contains(file.getContentType())) {
            throw new ArgumentNotValidException(Collections.singletonMap("file", ErrorMessageConstants.UNSUPPORTED_FILE_TYPE));
        }
        try {
            DocumentFile documentFile = fileTranslator.translate(file, registryNumber, principal);
            fileRepository.saveFile(documentFile);
        } catch (Exception e) {
            log.error("Failed to upload document {} for registry number {}", file.getName(), registryNumber);
            throw new OperationFailedException(ErrorMessageConstants.FILE_UPLOAD_FAILED, e);
        }
    }

    @Override
    public DocumentFile getFile(int registryNumber) {
        log.debug("Entering getFile for document {}", registryNumber);
        try {
            return fileRepository.getFile(registryNumber);
        } catch (Exception e) {
            log.error("Failed to download document for registry number {}", registryNumber);
            throw new OperationFailedException(ErrorMessageConstants.FILE_DOWNLOAD_FAILED, e);
        }
    }

    @Override
    public boolean hasAttachedFiles(int registryNumber) {
        log.debug("Entering hasAttachedFile for document {}", registryNumber);
        try {
            return fileRepository.getAttachmentsNumber(registryNumber) != 0;
        } catch (Exception e) {
            log.error("Failed to retrieve number of attached documents for registry number {}", registryNumber);
            throw new OperationFailedException(ErrorMessageConstants.FILE_COUNT_FAILED, e);
        }
    }

    private List<String> getSupportedFormats() {
        return Arrays.asList(MediaType.APPLICATION_PDF_VALUE,
                MediaType.APPLICATION_OCTET_STREAM_VALUE,
                MediaType.IMAGE_JPEG_VALUE,
                MediaType.IMAGE_PNG_VALUE);
    }
}
