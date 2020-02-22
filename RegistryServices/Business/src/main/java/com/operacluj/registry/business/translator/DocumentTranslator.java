package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.domain.DocumentForm;
import com.operacluj.registry.business.domain.DocumentHistoryDTO;
import com.operacluj.registry.business.service.DocumentHistoryService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
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
        document.setDocumentType(documentForm.getDocType());
        document.setPath(documentForm.getPath());

        return document;
    }

    public DocumentDTO translate(Document document) {
        DocumentDTO documentDTO = new DocumentDTO();
        documentDTO.setRegistryNumber(document.getRegistryNumber());
        documentDTO.setTitle(document.getTitle());
        documentDTO.setGlobalStatus(document.getGlobalStatus().getStatus());
        documentDTO.setDocumentType(document.getDocumentType());
        documentDTO.setPath(document.getPath());

        User documentAuthor = userService.getUserById(document.getCreatedBy());
        documentDTO.setCreatedBy(documentAuthor);

        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
        String strCreatedDate = formatter.format(document.getCreatedDate());
        documentDTO.setCreatedDate(strCreatedDate);

        List<DocumentHistoryDTO> documentHistoryDTOList = documentHistoryService.getDocumentHistoryForDocument(document.getRegistryNumber());
        documentDTO.setDocumentHistory(documentHistoryDTOList);

        return documentDTO;
    }
}
