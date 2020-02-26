package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.domain.DocumentForm;
import com.operacluj.registry.business.domain.DocumentHistoryDTO;
import com.operacluj.registry.business.service.DocumentHistoryService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.DocumentType;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class DocumentTranslator {

    @Autowired
    private UserService userService;

    @Autowired
    private DocumentHistoryService documentHistoryService;

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

        document.setPath(documentForm.getPath());
        return document;
    }

    public DocumentDTO translate(Document document) {
        DocumentDTO documentDTO = new DocumentDTO();
        documentDTO.setRegistryNumber(document.getRegistryNumber());

        User documentAuthor = userService.getUserById(document.getCreatedBy());
        documentDTO.setCreatedBy(documentAuthor);

        documentDTO.setOrigin(document.getOrigin());
        documentDTO.setTitle(document.getTitle());
        documentDTO.setDocumentType(document.getType().toString());
        documentDTO.setArchived(document.isArchived());
        documentDTO.setArchivingMessage(document.getArchivingMessage());
        documentDTO.setPath(document.getPath());

//        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
//        documentDTO.setCreatedDate(formatter.format(document.getCreatedDate()));
//        documentDTO.setArchivingDate(document.isArchived() ? formatter.format(document.getArchivingDate()) : "");

//        String formattedCreatedDate = document.getCreatedDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
//        documentDTO.setCreatedDate(formattedCreatedDate);
//        String formattedArchivingDate = document.getArchivingDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
//        documentDTO.setArchivingDate(formattedArchivingDate);

        List<DocumentHistoryDTO> documentHistoryDTOList = documentHistoryService.getDocumentHistoryForDocument(document.getRegistryNumber());
        documentDTO.setDocumentHistory(documentHistoryDTOList);

        return documentDTO;
    }
}
