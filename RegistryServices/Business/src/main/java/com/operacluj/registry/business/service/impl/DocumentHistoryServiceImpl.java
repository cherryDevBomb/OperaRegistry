package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.DocumentHistoryDTO;
import com.operacluj.registry.business.exception.CreateEntityException;
import com.operacluj.registry.business.exception.EntityNotFoundException;
import com.operacluj.registry.business.service.DocumentHistoryService;
import com.operacluj.registry.business.translator.DocumentHistoryTranslator;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.business.validator.InputValidator;
import com.operacluj.registry.model.DocumentHistory;
import com.operacluj.registry.model.User;
import com.operacluj.registry.persistence.repository.DocumentHistoryRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentHistoryServiceImpl implements DocumentHistoryService {

    private static final Logger LOG = LogManager.getLogger(DocumentHistoryServiceImpl.class);

    @Autowired
    private DocumentHistoryRepository documentHistoryRepository;

    @Autowired
    private DocumentHistoryTranslator documentHistoryTranslator;

    @Autowired
    InputValidator inputValidator;

    @Override
    public List<DocumentHistoryDTO> getDocumentHistoryForDocument(int registryNumber) {
        try {
            LOG.info("Enter getDocumentHistoryForDocument for document {}", registryNumber);
            List<DocumentHistory> documentHistoryList = documentHistoryRepository.getDocumentHistoryForDocument(registryNumber);
            return documentHistoryTranslator.translate(documentHistoryList);
        } catch (RuntimeException e) {
            LOG.error("Document history for document {} not found", registryNumber);
            throw new EntityNotFoundException(ErrorMessageConstants.EMPTY_DOCUMENT_HISTORY, e);
        }
    }

    @Override
    public int addDocumentHistory(DocumentHistory documentHistory, User user) {
        //will be a form in the future
        //TODO refactor this method
        inputValidator.validate(documentHistory);

        //Document newDocument = documentTranslator.translate(documentForm);
        //newDocument.setGlobalStatus(DocumentStatus.PENDING);
//        User user = userTranslator.getUserFromPrincipal(principal);
//        newDocument.setCreatedBy(user.getUserId());

        try {
            return documentHistoryRepository.addDocumentHistory(documentHistory);
        } catch (RuntimeException e) {
            LOG.error("Error creating new document history");
            throw new CreateEntityException(ErrorMessageConstants.DOCUMENT_HISTORY_NOT_CREATED, e);
        }
    }
}
