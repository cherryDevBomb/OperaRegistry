package com.operacluj.registry.business.translator;

import com.operacluj.registry.model.DocumentFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class FileTranslator {

    public DocumentFile translate(MultipartFile file, int registryNumber) throws IOException {
        DocumentFile documentFile = new DocumentFile();
        documentFile.setRegistryNumber(registryNumber);
        documentFile.setFileData(file.getBytes());
        documentFile.setFilename("Document_nr_" + registryNumber + ".pdf");
        return documentFile;
    }
}
