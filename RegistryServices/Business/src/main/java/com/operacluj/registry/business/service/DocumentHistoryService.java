package com.operacluj.registry.business.service;

import com.operacluj.registry.business.domain.dto.DepartmentDTO;
import com.operacluj.registry.business.domain.dto.DocumentHistoryDTO;
import com.operacluj.registry.business.domain.request.DocumentForm;
import com.operacluj.registry.business.domain.request.DocumentHistoryForm;
import com.operacluj.registry.model.User;

import java.security.Principal;
import java.util.List;

public interface DocumentHistoryService {

    List<DocumentHistoryDTO> getDocumentHistoryForDocument(int registryNumber);

    void addDocumentHistory(int registryNumber, DocumentHistoryForm documentHistoryForm, Principal principal);

    void addHistoryForNewDocument(DocumentForm documentForm, int registryNumber, User user);

    void resolveDocument(int registryNumber, String resolvedMessage, Principal principal);

    List<DepartmentDTO> getAvailableReceiversForDocument(int registryNumber, Principal principal);
}
