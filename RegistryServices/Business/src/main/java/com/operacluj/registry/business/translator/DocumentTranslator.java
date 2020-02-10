package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DocumentTranslator {
    
    @Autowired
    private UserService userService;
    
    public Document translate(DocumentDTO documentDTO) {
        User creator = userService.getUserByEmail(documentDTO.getEmail());
        
        Document document = new Document();
        document.setCreatedBy(creator.getUserId());
        document.setTitle(documentDTO.getTitle());
        document.setDocumentType(documentDTO.getDocType());
        document.setPath(documentDTO.getPath());
        
        return document;
    }

    //TODO insert method to translate documenthistory from documentDTO
}
