package com.operacluj.registry.service;


import com.operacluj.registry.model.Document;

import java.util.List;

public interface DocumentService {

    Document getDocumentByRegistryNumber(int registryNumber);
    List<Document> getAllDocuments();
    int addDocument(Document document);
}
