package com.operacluj.registry.persistence.repository;

import com.operacluj.registry.model.Document;

import java.util.List;


public interface DocumentRepository {

    Document getDocumentByRegistryNumber(int registryNumber);

    List<Document> getAllDocuments();

    List<Document> getAllDocuments(int page);

    List<Document> getAllDocumentsCreatedBy(int userId, boolean archived, int page);

    List<Document> getAllDocumentsReceivedBy(int userId, boolean resolved, int page);

    List<Document> getAllArchivedDocumentsReceivedBy(int userId, int page);

    int addDocument(Document document);

    void updateDocument(Document document);

    void deleteDocument(int registryNumber);
}
