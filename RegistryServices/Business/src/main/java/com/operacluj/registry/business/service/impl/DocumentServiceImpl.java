package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.exception.CreateEntityException;
import com.operacluj.registry.business.exception.EntityNotFoundException;
import com.operacluj.registry.business.service.DocumentService;
import com.operacluj.registry.business.translator.DocumentTranslator;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.business.util.ErrorMessageConstants;
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
import org.springframework.security.access.AccessDeniedException;
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
            throw new EntityNotFoundException(ErrorMessageConstants.DOCUMENT_NOT_FOUND, e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Document> getAllDocuments() {
        LOG.info("Enter getAllDocuments");
        return documentRepository.getAllDocuments();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Document> getAllDocumentsCreatedBy(Principal principal) {
        LOG.info("Enter getAllDocumentsCreatedBy");
        User user = userTranslator.getUserFromPrincipal(principal);
        return documentRepository.getAllDocumentsCreatedBy(user.getUserId());
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
            throw new CreateEntityException(ErrorMessageConstants.DOCUMENT_NOT_CREATED, e);
        }
    }

    @Override
    @Transactional
    public void deleteDocument(int registryNumber, Principal principal) {
        User user = userTranslator.getUserFromPrincipal(principal);
        Document document = getDocumentByRegistryNumber(registryNumber);
        if (user.getUserId() == document.getCreatedBy()) {
            try {
                LOG.info("Enter deleteDocument {}", registryNumber);
                documentRepository.deleteDocument(registryNumber);
            } catch (EmptyResultDataAccessException e) {
                LOG.error("Document with registry number {} not deleted", registryNumber);
                throw new EntityNotFoundException(ErrorMessageConstants.DOCUMENT_NOT_FOUND, e);
            }
        }
        else {
            throw new AccessDeniedException(ErrorMessageConstants.ACCESS_DENIED);
        }
    }
}
