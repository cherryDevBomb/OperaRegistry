package com.operacluj.registry.business.service;


import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.domain.DocumentForm;
import com.operacluj.registry.business.domain.SearchCriteria;

import java.security.Principal;
import java.util.List;

public interface DocumentService {

    DocumentDTO getDocumentByRegistryNumber(int registryNumber);

    List<DocumentDTO> getAllDocuments();

    List<DocumentDTO> getAllDocumentsCreatedBy(Principal principal, boolean archived);

    List<DocumentDTO> getDocumentsByCriteria(SearchCriteria searchCriteria);

    Integer addDocument(DocumentForm documentForm, Principal principal);

    void archiveDocument(int registryNumber, Principal principal);

    void deleteDocument(int registryNumber, Principal principal);

}
