package com.operacluj.registry.service.impl;

import com.operacluj.registry.exception.EntityNotFoundException;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.repository.DocumentRepository;
import com.operacluj.registry.service.DocumentService;
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
        return 0;
    }
}
