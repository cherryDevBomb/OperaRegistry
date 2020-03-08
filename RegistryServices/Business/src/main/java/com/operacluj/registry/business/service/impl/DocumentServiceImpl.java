package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.domain.DocumentForm;
import com.operacluj.registry.business.exception.CreateEntityException;
import com.operacluj.registry.business.exception.EntityNotFoundException;
import com.operacluj.registry.business.service.DocumentHistoryService;
import com.operacluj.registry.business.service.DocumentService;
import com.operacluj.registry.business.translator.DocumentHistoryTranslator;
import com.operacluj.registry.business.translator.DocumentTranslator;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.business.validator.InputValidator;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.User;
import com.operacluj.registry.persistence.repository.DocumentRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class DocumentServiceImpl implements DocumentService {

    private static final Logger LOG = LogManager.getLogger(DocumentServiceImpl.class);

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private DocumentHistoryService documentHistoryService;

    @Autowired
    InputValidator inputValidator;

    @Autowired
    private DocumentTranslator documentTranslator;

    @Autowired
    private DocumentHistoryTranslator documentHistoryTranslator;

    @Autowired
    private UserTranslator userTranslator;

    @Override
    @Transactional(readOnly = true)
    public DocumentDTO getDocumentByRegistryNumber(int registryNumber) {
        try {
            LOG.info("Enter getDocumentByRegistryNumber {}", registryNumber);
            Document document = documentRepository.getDocumentByRegistryNumber(registryNumber);
            return documentTranslator.translate(document);
        } catch (EmptyResultDataAccessException e) {
            LOG.error("Document with registry number {} not found", registryNumber);
            throw new EntityNotFoundException(ErrorMessageConstants.DOCUMENT_NOT_FOUND, e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentDTO> getAllDocuments() {
        LOG.info("Enter getAllDocuments");
        return documentRepository.getAllDocuments()
                .stream()
                .map(document -> documentTranslator.translate(document))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentDTO> getAllDocumentsCreatedBy(Principal principal, boolean archived) {
        User user = userTranslator.getUserFromPrincipal(principal);
        LOG.info("Enter getAllDocumentsCreatedBy {}, archived = {}", user.getEmail(), archived);
        return documentRepository.getAllDocumentsCreatedBy(user.getUserId(), archived)
                .stream()
                .map(document -> documentTranslator.translate(document))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Integer addDocument(DocumentForm documentForm, Principal principal) {
        inputValidator.validate(documentForm);
        Document newDocument = documentTranslator.translate(documentForm);
        User user = userTranslator.getUserFromPrincipal(principal);
        newDocument.setCreatedBy(user.getUserId());
        LOG.info("Enter addDocument created by {}", user.getEmail());
        try {
            int registryNumber = documentRepository.addDocument(newDocument);
            documentHistoryService.addHistoryForNewDocument(documentForm, registryNumber, user);
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
        Document document = documentRepository.getDocumentByRegistryNumber(registryNumber);
        if (user.getUserId() == document.getCreatedBy()) {
            try {
                LOG.info("Enter deleteDocument {} by {}", registryNumber, principal.getName());
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
