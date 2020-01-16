package com.operacluj.registry.repository;

import com.operacluj.registry.model.Document;

import java.util.List;

public interface DocumentRepository {

    Document getDocumentByRegistryNumber(int registryNumber);
    List<Document> getAllDocuments();
    int addDocument(Document document);
}
