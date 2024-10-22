package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.dto.DepartmentDTO;
import com.operacluj.registry.business.domain.dto.DocumentDTO;
import com.operacluj.registry.business.domain.dto.DocumentHistoryDTO;
import com.operacluj.registry.business.domain.dto.UserDTO;
import com.operacluj.registry.business.domain.exception.EntityNotFoundException;
import com.operacluj.registry.business.domain.exception.OperationFailedException;
import com.operacluj.registry.business.domain.request.DocumentForm;
import com.operacluj.registry.business.domain.request.DocumentHistoryForm;
import com.operacluj.registry.business.service.DocumentHistoryService;
import com.operacluj.registry.business.service.DocumentService;
import com.operacluj.registry.business.service.MailService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.business.translator.DocumentHistoryTranslator;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.business.validator.InputValidator;
import com.operacluj.registry.model.DocumentHistory;
import com.operacluj.registry.model.User;
import com.operacluj.registry.persistence.repository.DocumentHistoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DocumentHistoryServiceImpl implements DocumentHistoryService {

    @Autowired
    private DocumentHistoryRepository documentHistoryRepository;

    @Autowired
    private DocumentHistoryTranslator documentHistoryTranslator;

    @Autowired
    private DocumentService documentService;

    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @Autowired
    InputValidator inputValidator;

    @Autowired
    UserTranslator userTranslator;

    @Override
    @Transactional(readOnly = true)
    public List<DocumentHistoryDTO> getDocumentHistoryForDocument(int registryNumber) {
        log.debug("Enter getDocumentHistoryForDocument {}", registryNumber);
        try {
            List<DocumentHistory> documentHistoryList = documentHistoryRepository.getDocumentHistoryForDocument(registryNumber);
            return documentHistoryTranslator.translate(documentHistoryList);
        } catch (RuntimeException e) {
            log.error("Document history for document {} not found", registryNumber);
            throw new EntityNotFoundException(ErrorMessageConstants.DOCUMENT_HISTORY_NOT_FOUND, e);
        }
    }

    @Override
    @Transactional
    public void addDocumentHistory(int registryNumber, DocumentHistoryForm documentHistoryForm, Principal principal) {
        log.info("Enter addDocumentHistory for document {}", documentHistoryForm.getRegistryNumber());
        documentHistoryForm.setRegistryNumber(registryNumber);
        inputValidator.validate(documentHistoryForm);
        User user = userTranslator.getUserFromPrincipal(principal);
        List<DocumentHistory> newHistoryList = documentHistoryTranslator.translate(documentHistoryForm, user);
        try {
            newHistoryList.forEach(dh -> documentHistoryRepository.addDocumentHistory(dh));
        } catch (RuntimeException e) {
            log.error("Error adding new document history");
            throw new OperationFailedException(ErrorMessageConstants.OPERATION_FAILED, e);
        }

        DocumentDTO document = documentService.getDocumentByRegistryNumber(registryNumber);
        newHistoryList.forEach(documentHistory -> mailService.sendMailForReceivedDocument(documentHistory, document.getTitle()));
    }

    @Override
    @Transactional
    public void addHistoryForNewDocument(DocumentForm documentForm, int registryNumber, User user) {
        log.info("Enter addHistoryForNewDocument {}", registryNumber);
        List<DocumentHistory> documentHistoryList = getHistoryForDocumentForm(documentForm, registryNumber, user);
        try {
            documentHistoryList.forEach(documentHistory -> documentHistoryRepository.addDocumentHistory(documentHistory));
        } catch (RuntimeException e) {
            log.error("Error creating new document history");
            throw new OperationFailedException(ErrorMessageConstants.OPERATION_FAILED, e);
        }
        new Thread(() -> {
            documentHistoryList.stream()
                    .filter(documentHistory -> documentHistory.getInternalRecipient() != null)
                    .forEach(documentHistory -> mailService.sendMailForReceivedDocument(documentHistory, documentForm.getTitle()));
        }).start();
    }

    @Override
    @Transactional
    public void resolveDocument(int registryNumber, String resolvedMessage, Principal principal) {
        log.info("Enter resolveDocument {}", registryNumber);
        User user = userTranslator.getUserFromPrincipal(principal);
        DocumentHistory documentHistory = documentHistoryRepository.getDocumentHistoryForDocumentSentTo(registryNumber, user.getUserId());
        if (documentHistory != null) {
            documentHistory.setResolved(true);
            documentHistory.setResolvedMessage(resolvedMessage);
            try {
                documentHistoryRepository.updateDocumentHistoryStatus(documentHistory);
            } catch (Exception e) {
                log.error("Document with registry number {} not resolved", registryNumber);
                throw e;
            }
            DocumentDTO document = documentService.getDocumentByRegistryNumber(registryNumber);
            new Thread(() -> {
                mailService.sendMailForResolvedDocument(documentHistory, document.getTitle());
            }).start();
        }
        else {
            throw new EntityNotFoundException(ErrorMessageConstants.DOCUMENT_HISTORY_NOT_FOUND);
        }
    }

    @Override
    public List<DepartmentDTO> getAvailableReceiversForDocument(int registryNumber, Principal principal) {
        log.info("Enter getAvailableReceiversForDocument {}", registryNumber);
        List<DocumentHistoryDTO> existingHistory = getDocumentHistoryForDocument(registryNumber);
        List<UserDTO> existingReceivers = existingHistory.stream()
                .filter(documentHistory -> documentHistory.getInternalRecipient() != null)
                .map(documentHistory -> documentHistory.getInternalRecipient())
                .collect(Collectors.toList());
        List<UserDTO> allUsers = userService.getAllUsers(false, principal);
        List<UserDTO> availableUsers = allUsers.stream()
                .filter(user -> !existingReceivers.contains(user))
                .collect(Collectors.toList());
        return userService.getUsersGroupedByDepartment(availableUsers);
    }

    private List<DocumentHistory> getHistoryForDocumentForm(DocumentForm documentForm, int registryNumber, User user) {
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
