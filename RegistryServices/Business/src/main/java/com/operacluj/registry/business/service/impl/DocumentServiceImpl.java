package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.exception.CreateEntityException;
import com.operacluj.registry.business.exception.EntityNotFoundException;
import com.operacluj.registry.business.service.DocumentService;
import com.operacluj.registry.business.translator.DocumentTranslator;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.business.validator.InputValidator;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.DocumentStatus;
import com.operacluj.registry.model.User;
import com.operacluj.registry.persistence.repository.DocumentRepository;
import com.operacluj.registry.persistence.repository.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;


@Service
public class DocumentServiceImpl implements DocumentService {

    private static final Logger LOG = LogManager.getLogger(DocumentServiceImpl.class);

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    InputValidator inputValidator;

    @Autowired
    private DocumentTranslator documentTranslator;

    @Autowired private UserTranslator userTranslator;


    @Override
    @Transactional(readOnly = true)
    public Document getDocumentByRegistryNumber(int registryNumber) {
        try {
            LOG.info("Enter getDocumentByRegistryNumber {}", registryNumber);
            return documentRepository.getDocumentByRegistryNumber(registryNumber);
        } catch (EmptyResultDataAccessException e) {
            LOG.error("Document with registry number {} not found", registryNumber);
            throw new EntityNotFoundException("Failed to get document with registry number: " + registryNumber, e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Document> getAllDocuments() {
        LOG.info("Enter getAllDocuments");
        return documentRepository.getAllDocuments();
    }

    @Override
    @Transactional
    public Integer addDocument(DocumentDTO documentDTO, Principal principal) {
        User user = userTranslator.getUserFromPrincipal(principal);

        inputValidator.validate(documentDTO);
        Document newDocument = documentTranslator.translate(documentDTO);
        newDocument.setGlobalStatus(DocumentStatus.PENDING);
        newDocument.setCreatedBy(user.getUserId());

        try {
            int registryNumber = documentRepository.addDocument(newDocument);
            //TODO add an entry to documenthistory containing recipient & deadline
            return registryNumber;
        } catch (RuntimeException e) {
            LOG.error("Error creating new document");
            throw new CreateEntityException("Failed to create a new document", e);
        }
    }
}
