package com.operacluj.registry.business.service;


import com.operacluj.registry.business.domain.DocumentFormDTO;
import com.operacluj.registry.model.Document;

import java.security.Principal;
import java.util.List;


public interface DocumentService {

    Document getDocumentByRegistryNumber(int registryNumber);
    List<Document> getAllDocuments();
    List<Document> getAllDocumentsCreatedBy(Principal principal);
    Integer addDocument(DocumentFormDTO documentFormDTO, Principal principal);
    void deleteDocument(int registryNumber, Principal principal);
}
