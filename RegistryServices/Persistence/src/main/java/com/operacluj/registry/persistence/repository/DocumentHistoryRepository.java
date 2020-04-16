package com.operacluj.registry.persistence.repository;

import com.operacluj.registry.model.DocumentHistory;

import java.util.List;

public interface DocumentHistoryRepository {

    List<DocumentHistory> getDocumentHistoryForDocument(int registryNumber);

    DocumentHistory getDocumentHistoryForDocumentSentTo(int registryNumber, int userId);

    int addDocumentHistory(DocumentHistory documentHistory);

    void updateDocumentHistoryStatus(DocumentHistory documentHistory);
}
