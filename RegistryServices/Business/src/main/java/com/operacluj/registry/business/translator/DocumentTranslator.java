package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.domain.DocumentForm;
import com.operacluj.registry.business.domain.DocumentHistoryDTO;
import com.operacluj.registry.business.service.DocumentHistoryService;
import com.operacluj.registry.business.service.FileService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.DocumentType;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class DocumentTranslator {

    @Autowired
    private UserService userService;

    @Autowired
    private DocumentHistoryService documentHistoryService;

    @Autowired
    private FileService fileService;

    @Autowired UserTranslator userTranslator;

    public Document translate(DocumentForm documentForm) {
        Document document = new Document();
        document.setTitle(documentForm.getTitle());
        if (StringUtils.hasText(documentForm.getOrigin())) {
            document.setOrigin(documentForm.getOrigin());
        }

        if (documentForm.isOriginExternal()) {
            document.setType(DocumentType.ORIGIN_EXTERNAL);
        }
        else if (documentForm.isDestinationExternal()) {
            document.setType(DocumentType.DESTINATION_EXTERNAL);
        }
        else {
            document.setType(DocumentType.INTERNAL);
        }

        return document;
    }

    public DocumentDTO translate(Document document) {
        DocumentDTO documentDTO = new DocumentDTO();
        documentDTO.setRegistryNumber(document.getRegistryNumber());

        User documentAuthor = userService.getUserById(document.getCreatedBy());
        documentDTO.setCreatedBy(userTranslator.translate(documentAuthor));

        documentDTO.setOrigin(document.getOrigin());
        documentDTO.setTitle(document.getTitle());
        documentDTO.setDocumentType(document.getType().toString());
        documentDTO.setArchived(document.isArchived());
        documentDTO.setArchivingMessage(document.getArchivingMessage());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.YYYY");
        documentDTO.setCreatedDate(formatter.format(document.getCreatedDate()));
        documentDTO.setArchivingDate(document.isArchived() ? formatter.format(document.getArchivingDate()) : null);

        documentDTO.setHasAttachment(fileService.hasAttachedFiles(document.getRegistryNumber()));

        List<DocumentHistoryDTO> documentHistoryDTOList = documentHistoryService.getDocumentHistoryForDocument(document.getRegistryNumber());
        documentDTO.setDocumentHistory(documentHistoryDTOList);

        return documentDTO;
    }
}
