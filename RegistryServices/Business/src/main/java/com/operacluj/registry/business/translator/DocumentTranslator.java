package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.model.Document;
import org.springframework.stereotype.Component;

@Component
public class DocumentTranslator {
    
    public Document translate(DocumentDTO documentDTO) {

        Document document = new Document();
        document.setTitle(documentDTO.getTitle());
        document.setDocumentType(documentDTO.getDocType());
        document.setPath(documentDTO.getPath());
        
        return document;
    }

    //TODO insert method to translate documenthistory from documentDTO
}
