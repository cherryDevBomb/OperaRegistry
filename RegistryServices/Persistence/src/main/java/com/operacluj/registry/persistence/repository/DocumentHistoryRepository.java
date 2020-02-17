package com.operacluj.registry.persistence.repository;

import com.operacluj.registry.model.DocumentHistory;

public interface DocumentHistoryRepository {

    DocumentHistory getDocumentHistoryForDocument(int registryNumber);
    int addDocumentHistory(DocumentHistory documentHistory);
    void updateDocumentHistoryStatus(DocumentHistory documentHistory);
}
