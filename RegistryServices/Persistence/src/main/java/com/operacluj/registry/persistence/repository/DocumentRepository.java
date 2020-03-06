package com.operacluj.registry.persistence.repository;

import com.operacluj.registry.model.Document;

import java.util.List;


public interface DocumentRepository {

    Document getDocumentByRegistryNumber(int registryNumber);
    List<Document> getAllDocuments();
    List<Document> getAllDocumentsCreatedBy(int userId, boolean archived);
    int addDocument(Document document);
    void deleteDocument(int registryNumber);
}
