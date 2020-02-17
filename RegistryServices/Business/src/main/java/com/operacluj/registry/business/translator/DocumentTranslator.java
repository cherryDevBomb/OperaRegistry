package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.DocumentFormDTO;
import com.operacluj.registry.model.Document;
import org.springframework.stereotype.Component;

@Component
public class DocumentTranslator {
    
    public Document translate(DocumentFormDTO documentFormDTO) {

        Document document = new Document();
        document.setTitle(documentFormDTO.getTitle());
        document.setDocumentType(documentFormDTO.getDocType());
        document.setPath(documentFormDTO.getPath());
        
        return document;
    }

    //TODO insert method to translate documenthistory from documentDTO
}
