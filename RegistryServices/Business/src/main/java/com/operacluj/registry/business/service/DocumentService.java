package com.operacluj.registry.business.service;


import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.domain.DocumentForm;
import com.operacluj.registry.business.domain.SearchCriteria;

import java.security.Principal;
import java.util.List;

public interface DocumentService {

    DocumentDTO getDocumentByRegistryNumber(int registryNumber);

    List<DocumentDTO> getAllDocuments(int page);

    List<DocumentDTO> getDocumentsByCriteria(SearchCriteria searchCriteria);

    List<DocumentDTO> getDocumentsByCriteria(SearchCriteria searchCriteria, int page);

    List<DocumentDTO> getAllDocumentsCreatedBy(Principal principal, boolean archived, int page);

    Integer addDocument(DocumentForm documentForm, Principal principal);

    void archiveDocument(int registryNumber, Principal principal);

    void deleteDocument(int registryNumber, Principal principal);
}
