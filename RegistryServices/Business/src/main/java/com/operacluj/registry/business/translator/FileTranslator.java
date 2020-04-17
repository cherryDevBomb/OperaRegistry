package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.DocumentTimelineItemDTO;
import com.operacluj.registry.model.DocumentAction;
import com.operacluj.registry.model.DocumentFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.format.DateTimeFormatter;

@Component
public class FileTranslator {

    public DocumentFile translate(MultipartFile file, int registryNumber) throws IOException {
        DocumentFile documentFile = new DocumentFile();
        documentFile.setRegistryNumber(registryNumber);
        documentFile.setFileData(file.getBytes());
        documentFile.setFilename("Document_nr_" + registryNumber + ".pdf");
        return documentFile;
    }

    public DocumentTimelineItemDTO translateToTimelineItem(DocumentFile documentFile) {
        DocumentTimelineItemDTO uploadTimelineItem = new DocumentTimelineItemDTO();
        uploadTimelineItem.setAction(DocumentAction.UPLOAD.toString());
        //TODO add set actor after adding uploader as a column to db

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.YYYY");
        uploadTimelineItem.setDate(formatter.format(documentFile.getUploadDate()));

        return uploadTimelineItem;
    }
}
