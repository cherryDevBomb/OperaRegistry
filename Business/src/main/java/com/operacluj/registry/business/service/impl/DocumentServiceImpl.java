package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.exception.CreateEntityException;
import com.operacluj.registry.business.exception.EntityNotFoundException;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.persistence.repository.DocumentRepository;
import com.operacluj.registry.business.service.DocumentService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class DocumentServiceImpl implements DocumentService {

    private static final Logger LOG = LogManager.getLogger(DocumentServiceImpl.class);

    @Autowired
    private DocumentRepository documentRepository;


    @Override
    @Transactional(readOnly = true)
    public Document getDocumentByRegistryNumber(int registryNumber) {
        try {
            return documentRepository.getDocumentByRegistryNumber(registryNumber);
        } catch (EmptyResultDataAccessException e) {
            LOG.error("Document with registry number {} not found", registryNumber);
            throw new EntityNotFoundException("Failed to get document with registry number: " + registryNumber, e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Document> getAllDocuments() {
        return documentRepository.getAllDocuments();
    }

    @Override
    @Transactional
    public int addDocument(Document document) {
        try {
            return documentRepository.addDocument(document);
        } catch (RuntimeException e) {
            LOG.error("Error creating new document");
            throw new CreateEntityException("Failed to create a new document", e);
        }
    }
}
