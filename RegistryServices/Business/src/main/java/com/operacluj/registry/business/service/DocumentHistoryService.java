package com.operacluj.registry.business.service;

import com.operacluj.registry.business.domain.DocumentForm;
import com.operacluj.registry.business.domain.DocumentHistoryDTO;
import com.operacluj.registry.model.DocumentHistory;
import com.operacluj.registry.model.User;

import java.util.List;

public interface DocumentHistoryService {

    List<DocumentHistoryDTO> getDocumentHistoryForDocument(int registryNumber);
    int addDocumentHistory(DocumentHistory documentHistory, User user);
    void addHistoryForNewDocument(DocumentForm documentForm, int registryNumber, User user);
}
