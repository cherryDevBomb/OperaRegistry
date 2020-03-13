package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.DocumentForm;
import com.operacluj.registry.business.domain.DocumentHistoryDTO;
import com.operacluj.registry.business.exception.CreateEntityException;
import com.operacluj.registry.business.exception.EntityNotFoundException;
import com.operacluj.registry.business.service.DocumentHistoryService;
import com.operacluj.registry.business.service.UserService;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentHistoryServiceImpl implements DocumentHistoryService {

    private static final Logger LOG = LogManager.getLogger(DocumentHistoryServiceImpl.class);

    @Autowired
    private DocumentHistoryRepository documentHistoryRepository;

    @Autowired
    private DocumentHistoryTranslator documentHistoryTranslator;

    @Autowired
    private UserService userService;

    @Autowired
    InputValidator inputValidator;

    @Override
    public List<DocumentHistoryDTO> getDocumentHistoryForDocument(int registryNumber) {
        LOG.info("Enter getDocumentHistoryForDocument {}", registryNumber);
        try {
            List<DocumentHistory> documentHistoryList = documentHistoryRepository.getDocumentHistoryForDocument(registryNumber);
            return documentHistoryTranslator.translate(documentHistoryList);
        } catch (RuntimeException e) {
            LOG.error("Document history for document {} not found", registryNumber);
            throw new EntityNotFoundException(ErrorMessageConstants.EMPTY_DOCUMENT_HISTORY, e);
        }
    }

    @Override
    public int addDocumentHistory(DocumentHistory documentHistory, User user) {
        LOG.info("Enter addDocumentHistory for document {}", documentHistory.getRegistryNumber());
        //will be a form in the future
        //TODO refactor this method
        inputValidator.validate(documentHistory);

        try {
            return documentHistoryRepository.addDocumentHistory(documentHistory);
        } catch (RuntimeException e) {
            LOG.error("Error creating new document history");
            throw new CreateEntityException(ErrorMessageConstants.DOCUMENT_HISTORY_NOT_CREATED, e);
        }
    }

    @Override
    @Transactional
    public void addHistoryForNewDocument(DocumentForm documentForm, int registryNumber, User user) {
        LOG.info("Enter addHistoryForNewDocument for document {}", registryNumber);
        List<DocumentHistory> documentHistoryList = getHistoryForDocumentForm(documentForm, registryNumber, user);
        try {
            documentHistoryList.forEach(documentHistory -> documentHistoryRepository.addDocumentHistory(documentHistory));
        } catch (RuntimeException e) {
            LOG.error("Error creating new document history");
            throw new CreateEntityException(ErrorMessageConstants.DOCUMENT_HISTORY_NOT_CREATED, e);
        }
    }

    private List<DocumentHistory> getHistoryForDocumentForm(DocumentForm documentForm, int registryNumber, User user) {
//        return documentForm.getRecipients().stream().map(recipient -> {
//            DocumentHistory documentHistory = new DocumentHistory();
//            documentHistory.setRegistryNumber(registryNumber);
//            documentHistory.setSender(user.getUserId());
//            documentHistory.setSentMessage(documentForm.getSentMessage());
//            if (documentForm.isDestinationExternal()) {
//                documentHistory.setExternalRecipient(recipient);
//            }
//            else {
//                documentHistory.setInternalRecipient(Integer.parseInt(recipient));
//            }
//            return documentHistory;
//        }).collect(Collectors.toList());
        LOG.info("Enter getHistoryForDocumentForm {}", registryNumber);
        return documentForm.getRecipients().stream().map(recipient -> {
            DocumentHistory documentHistory = new DocumentHistory();
            documentHistory.setRegistryNumber(registryNumber);
            documentHistory.setSender(user.getUserId());
            documentHistory.setSentMessage(documentForm.getSentMessage());
            if (documentForm.isDestinationExternal()) {
                documentHistory.setExternalRecipient(recipient);
            }
            else {
                User recipientUser = userService.getUserByEmail(recipient);
                documentHistory.setInternalRecipient(recipientUser.getUserId());
            }
            return documentHistory;
        }).collect(Collectors.toList());
    }
}
