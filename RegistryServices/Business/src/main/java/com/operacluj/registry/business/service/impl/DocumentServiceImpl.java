package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.dto.DocumentDTO;
import com.operacluj.registry.business.domain.dto.DocumentSearchResponseDTO;
import com.operacluj.registry.business.domain.exception.EntityNotFoundException;
import com.operacluj.registry.business.domain.exception.OperationFailedException;
import com.operacluj.registry.business.domain.request.DocumentForm;
import com.operacluj.registry.business.domain.request.SearchCriteria;
import com.operacluj.registry.business.service.DocumentHistoryService;
import com.operacluj.registry.business.service.DocumentService;
import com.operacluj.registry.business.service.PaginationService;
import com.operacluj.registry.business.translator.DocumentTranslator;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.business.validator.InputValidator;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.User;
import com.operacluj.registry.persistence.repository.DocumentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private DocumentHistoryService documentHistoryService;

    @Autowired
    private PaginationService paginationService;

    @Autowired
    private InputValidator inputValidator;

    @Autowired
    private DocumentTranslator documentTranslator;

    @Autowired
    private UserTranslator userTranslator;

    @Override
    @Transactional(readOnly = true)
    public DocumentDTO getDocumentByRegistryNumber(int registryNumber) {
        log.info("Enter getDocumentByRegistryNumber {}", registryNumber);
        try {
            Document document = documentRepository.getDocumentByRegistryNumber(registryNumber);
            return documentTranslator.translate(document, false);
        } catch (EmptyResultDataAccessException e) {
            log.error("Document with registry number {} not found", registryNumber);
            throw new EntityNotFoundException(ErrorMessageConstants.DOCUMENT_NOT_FOUND, e);
        }
    }

    @Override
    public DocumentSearchResponseDTO getDocumentSearchResult(SearchCriteria searchCriteria, int page, int searchId) {
        List<DocumentDTO> documents;
        if (searchCriteria.isPresent()) {
            documents = getDocumentsByCriteria(searchCriteria, page);
        }
        else {
            documents = getAllDocuments(page);
        }

        DocumentSearchResponseDTO searchResult = new DocumentSearchResponseDTO();
        searchResult.setSearchId(searchId);
        searchResult.setDocuments(documents);

        return searchResult;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentDTO> getAllDocuments(int page) {
        try {
            log.info("Enter getAllDocuments for page {}", page);
            return documentRepository.getAllDocuments(page)
                    .stream()
                    .map(document -> documentTranslator.translate(document, false))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentDTO> getDocumentsByCriteria(SearchCriteria searchCriteria) {
        log.debug("Enter getDocumentsByCriteria");
        List<Document> allDocuments = documentRepository.getAllDocuments();

        if (!CollectionUtils.isEmpty(searchCriteria.getDocTypes())) {
            allDocuments = allDocuments.stream()
                    .filter(document -> searchCriteria.getDocTypes().contains(document.getType().toString()))
                    .collect(Collectors.toList());
        }

        if (!CollectionUtils.isEmpty(searchCriteria.getCreatedByList())) {
            allDocuments = allDocuments.stream()
                    .filter(document -> searchCriteria.getCreatedByList().contains(document.getCreatedBy()))
                    .collect(Collectors.toList());
        }

        if (searchCriteria.getArchived() != null) {
            allDocuments = allDocuments.stream()
                    .filter(document -> searchCriteria.isArchived() == document.isArchived())
                    .collect(Collectors.toList());
        }

        if (StringUtils.hasText(searchCriteria.getSearchString())) {
            String searchStrLower = searchCriteria.getSearchString().toLowerCase().trim();
            List<String> searchItems = Arrays.asList(searchStrLower.split(" "));
            allDocuments = allDocuments.stream()
                    .filter(document -> (searchItems.stream().allMatch(item -> document.getTitle().toLowerCase().contains(item))) ||
                            String.valueOf(document.getRegistryNumber()).contains(searchStrLower))
                    .collect(Collectors.toList());
        }

        if (searchCriteria.getFrom() != null && searchCriteria.getTo() != null) {
            DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                    .parseStrict()
                    .appendPattern("dd/MM/yyyy")
                    .toFormatter();
            LocalDate fromDate = LocalDate.parse(searchCriteria.getFrom(), formatter).atStartOfDay().toLocalDate();
            LocalDate toDate = LocalDate.parse(searchCriteria.getTo(), formatter).atStartOfDay().toLocalDate();
            allDocuments = allDocuments.stream()
                    .filter(document -> {
                        LocalDate createdDate = document.getCreatedDate().toLocalDate();
                        return ((createdDate.isEqual(fromDate) || createdDate.isAfter(fromDate)) && (createdDate.isBefore(toDate) || createdDate.isEqual(toDate)));
                    })
                    .collect(Collectors.toList());
        }

        if (!CollectionUtils.isEmpty(searchCriteria.getRecipientList())) {
            List<Integer> recipientIds = searchCriteria.getRecipientList();
            allDocuments = allDocuments.stream()
                    .filter(document -> documentHistoryService.getDocumentHistoryForDocument(document.getRegistryNumber())
                            .stream()
                            .anyMatch(dh -> (dh.getInternalRecipient() != null && recipientIds.contains(dh.getInternalRecipient().getUserId()))))
                    .collect(Collectors.toList());
        }

        return allDocuments.stream()
                .map(document -> documentTranslator.translate(document, false))
                .collect(Collectors.toList());
    }

    @Override
    public List<DocumentDTO> getDocumentsByCriteria(SearchCriteria searchCriteria, int page) {
        List<DocumentDTO> allDocumentsMatchingSearchCriteria = getDocumentsByCriteria(searchCriteria);

        if (!CollectionUtils.isEmpty(allDocumentsMatchingSearchCriteria)) {
            int limit = paginationService.getPageLimit();
            int start = (page - 1) * limit;
            int end = start + limit > allDocumentsMatchingSearchCriteria.size() ? allDocumentsMatchingSearchCriteria.size() : start + limit;

            return allDocumentsMatchingSearchCriteria.subList(start, end);
        }
        else {
            return Collections.emptyList();
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentDTO> getAllDocumentsCreatedBy(Principal principal, boolean archived, int page) {
        User user = userTranslator.getUserFromPrincipal(principal);
        log.debug("Enter getAllDocumentsCreatedBy {}, archived = {}", user.getEmail(), archived);
        return documentRepository.getAllDocumentsCreatedBy(user.getUserId(), archived, page)
                .stream()
                .map(document -> documentTranslator.translate(document, true))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentDTO> getAllDocumentsReceivedBy(Principal principal, boolean resolved, int page) {
        User user = userTranslator.getUserFromPrincipal(principal);
        log.debug("Enter getAllDocumentsReceivedBy {}, resolved = {}", user.getEmail(), resolved);
        return documentRepository.getAllDocumentsReceivedBy(user.getUserId(), resolved, page)
                .stream()
                .map(document -> documentTranslator.translate(document, true))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentDTO> getAllArchivedDocumentsReceivedBy(Principal principal, int page) {
        User user = userTranslator.getUserFromPrincipal(principal);
        log.debug("Enter getAllArchivedDocumentsReceivedBy {}", user.getEmail());
        return documentRepository.getAllArchivedDocumentsReceivedBy(user.getUserId(), page)
                .stream()
                .map(document -> documentTranslator.translate(document, true))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Integer addDocument(DocumentForm documentForm, Principal principal) {
        inputValidator.validate(documentForm);
        Document newDocument = documentTranslator.translate(documentForm);
        User user = userTranslator.getUserFromPrincipal(principal);
        newDocument.setCreatedBy(user.getUserId());
        log.info("Enter addDocument created by {}", user.getEmail());
        try {
            int registryNumber = documentRepository.addDocument(newDocument);
            documentHistoryService.addHistoryForNewDocument(documentForm, registryNumber, user);
            return registryNumber;
        } catch (RuntimeException e) {
            log.error("Error creating new document");
            throw new OperationFailedException(ErrorMessageConstants.DOCUMENT_NOT_CREATED, e);
        }
    }

    @Override
    @Transactional
    public void archiveDocument(int registryNumber, String archivingMessage, Principal principal) {
        log.info("Enter archiveDocument {}", registryNumber);
        User user = userTranslator.getUserFromPrincipal(principal);
        Document document = documentRepository.getDocumentByRegistryNumber(registryNumber);
        if (user.getUserId() == document.getCreatedBy()) {
            document.setArchived(true);
            document.setArchivingMessage(archivingMessage);
            try {
                documentRepository.updateDocument(document);
            } catch (Exception e) {
                log.error("Document with registry number {} not deleted", registryNumber);
                throw e;
            }
        }
        else {
            log.error("You don't have permissions to delete document with registry number {}", registryNumber);
            throw new AccessDeniedException(ErrorMessageConstants.ACCESS_DENIED);
        }
    }

    @Override
    @Transactional
    public void deleteDocument(int registryNumber, Principal principal) {
        log.info("Enter deleteDocument {}", registryNumber);
        User user = userTranslator.getUserFromPrincipal(principal);
        Document document = documentRepository.getDocumentByRegistryNumber(registryNumber);
        if (user.getUserId() == document.getCreatedBy()) {
            try {
                documentRepository.deleteDocument(registryNumber);
            } catch (EmptyResultDataAccessException e) {
                log.error("Document with registry number {} not deleted", registryNumber);
                throw new EntityNotFoundException(ErrorMessageConstants.DOCUMENT_NOT_FOUND, e);
            }
        }
        else {
            log.error("You don't have permissions to delete document with registry number {}", registryNumber);
            throw new AccessDeniedException(ErrorMessageConstants.ACCESS_DENIED);
        }
    }
}
