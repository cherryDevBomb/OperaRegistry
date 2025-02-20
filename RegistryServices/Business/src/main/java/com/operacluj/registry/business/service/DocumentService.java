package com.operacluj.registry.business.service;

import com.operacluj.registry.business.domain.dto.DocumentDTO;
import com.operacluj.registry.business.domain.dto.DocumentSearchResponseDTO;
import com.operacluj.registry.business.domain.request.DocumentForm;
import com.operacluj.registry.business.domain.request.SearchCriteria;

import java.security.Principal;
import java.util.List;

public interface DocumentService {

    DocumentDTO getDocumentByRegistryNumber(int registryNumber);

    DocumentSearchResponseDTO getDocumentSearchResult(SearchCriteria searchCriteria, int page, int searchId);

    List<DocumentDTO> getAllDocuments(int page);

    List<DocumentDTO> getDocumentsByCriteria(SearchCriteria searchCriteria);

    List<DocumentDTO> getDocumentsByCriteria(SearchCriteria searchCriteria, int page);

    List<DocumentDTO> getAllDocumentsCreatedBy(Principal principal, boolean archived, int page);

    List<DocumentDTO> getAllDocumentsReceivedBy(Principal principal, boolean resolved, int page);

    List<DocumentDTO> getAllArchivedDocumentsReceivedBy(Principal principal, int page);

    Integer addDocument(DocumentForm documentForm, Principal principal);

    void archiveDocument(int registryNumber, String archivingMessage, Principal principal);

    void deleteDocument(int registryNumber, Principal principal);
}
