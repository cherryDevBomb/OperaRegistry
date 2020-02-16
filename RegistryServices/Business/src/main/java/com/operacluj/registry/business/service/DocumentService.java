package com.operacluj.registry.business.service;


import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.model.Document;

import java.security.Principal;
import java.util.List;


public interface DocumentService {

    Document getDocumentByRegistryNumber(int registryNumber);
    List<Document> getAllDocuments();
    List<Document> getAllDocumentsCreatedBy(Principal principal);
    Integer addDocument(DocumentDTO documentDTO, Principal principal);
    void deleteDocument(int registryNumber, Principal principal);
}
