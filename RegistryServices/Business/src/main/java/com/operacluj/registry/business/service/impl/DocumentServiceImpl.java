package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.*;
import com.operacluj.registry.business.exception.CreateEntityException;
import com.operacluj.registry.business.exception.EntityNotFoundException;
import com.operacluj.registry.business.service.DocumentHistoryService;
import com.operacluj.registry.business.service.DocumentService;
import com.operacluj.registry.business.service.FileService;
import com.operacluj.registry.business.service.PaginationService;
import com.operacluj.registry.business.translator.DocumentHistoryTranslator;
import com.operacluj.registry.business.translator.DocumentTranslator;
import com.operacluj.registry.business.translator.FileTranslator;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.business.validator.InputValidator;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.DocumentAction;
import com.operacluj.registry.model.DocumentFile;
import com.operacluj.registry.model.User;
import com.operacluj.registry.persistence.repository.DocumentRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class DocumentServiceImpl implements DocumentService {

    private static final Logger LOG = LogManager.getLogger(DocumentServiceImpl.class);

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private DocumentHistoryService documentHistoryService;

    @Autowired
    private PaginationService paginationService;

    @Autowired
    private FileService fileService;

    @Autowired
    private InputValidator inputValidator;

    @Autowired
    private DocumentTranslator documentTranslator;

    @Autowired
    private DocumentHistoryTranslator documentHistoryTranslator;

    @Autowired
    private UserTranslator userTranslator;

    @Autowired
    FileTranslator fileTranslator;

    @Override
    @Transactional(readOnly = true)
    public DocumentDTO getDocumentByRegistryNumber(int registryNumber) {
        LOG.info("Enter getDocumentByRegistryNumber {}", registryNumber);
        try {
            Document document = documentRepository.getDocumentByRegistryNumber(registryNumber);
            return documentTranslator.translate(document);
        } catch (EmptyResultDataAccessException e) {
            LOG.error("Document with registry number {} not found", registryNumber);
            throw new EntityNotFoundException(ErrorMessageConstants.DOCUMENT_NOT_FOUND, e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentDTO> getAllDocuments(int page) {
        LOG.info("Enter getAllDocuments for page {}", page);
        return documentRepository.getAllDocuments(page)
                .stream()
                .map(document -> documentTranslator.translate(document))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentDTO> getDocumentsByCriteria(SearchCriteria searchCriteria) {
        LOG.info("Enter getDocumentsByCriteria");
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
            String searchStrLower = searchCriteria.getSearchString().toLowerCase();
            allDocuments = allDocuments.stream()
                    .filter(document -> (document.getTitle().toLowerCase().contains(searchStrLower) ||
                            String.valueOf(document.getRegistryNumber()).contains(searchStrLower)))
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
                    .filter(document -> (document.getCreatedDate().isAfter(fromDate) && document.getCreatedDate().isBefore(toDate)))
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
                .map(document -> documentTranslator.translate(document))
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
        LOG.info("Enter getAllDocumentsCreatedBy {}, archived = {}", user.getEmail(), archived);
        return documentRepository.getAllDocumentsCreatedBy(user.getUserId(), archived, page)
                .stream()
                .map(document -> documentTranslator.translate(document))
                .collect(Collectors.toList());
    }

    @Override
    public List<DocumentDTO> getAllDocumentsReceivedBy(Principal principal, boolean resolved, int page) {
        User user = userTranslator.getUserFromPrincipal(principal);
        LOG.info("Enter getAllDocumentsReceivedBy {}, resolved = {}", user.getEmail(), resolved);
        return documentRepository.getAllDocumentsReceivedBy(user.getUserId(), resolved, page)
                .stream()
                .map(document -> documentTranslator.translate(document))
                .collect(Collectors.toList());
    }

    @Override
    public List<DocumentDTO> getAllArchivedDocumentsReceivedBy(Principal principal, int page) {
        User user = userTranslator.getUserFromPrincipal(principal);
        LOG.info("Enter getAllArchivedDocumentsReceivedBy {}", user.getEmail());
        return documentRepository.getAllArchivedDocumentsReceivedBy(user.getUserId(), page)
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
    public void archiveDocument(int registryNumber, String archivingMessage, Principal principal) {
        LOG.info("Enter archiveDocument {}", registryNumber);
        User user = userTranslator.getUserFromPrincipal(principal);
        Document document = documentRepository.getDocumentByRegistryNumber(registryNumber);
        if (user.getUserId() == document.getCreatedBy()) {
            document.setArchived(true);
            document.setArchivingMessage(archivingMessage);
            try {
                documentRepository.updateDocument(document);
            } catch (Exception e) {
                LOG.error("Document with registry number {} not deleted", registryNumber);
                throw e;
            }
        }
        else {
            throw new AccessDeniedException(ErrorMessageConstants.ACCESS_DENIED);
        }
    }

    @Override
    @Transactional
    public void deleteDocument(int registryNumber, Principal principal) {
        LOG.info("Enter deleteDocument {}", registryNumber);
        User user = userTranslator.getUserFromPrincipal(principal);
        Document document = documentRepository.getDocumentByRegistryNumber(registryNumber);
        if (user.getUserId() == document.getCreatedBy()) {
            try {
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

    @Override
    public Map<String, List<DocumentTimelineItemDTO>> getDocumentTimeline(int registryNumber) {
        DocumentDTO documentDTO = getDocumentByRegistryNumber(registryNumber);
        List<DocumentTimelineItemDTO> documentTimelineItems = documentTranslator.translateToTimelineItems(documentDTO);

        List<DocumentHistoryDTO> documentHistoryDTOs = documentHistoryService.getDocumentHistoryForDocument(registryNumber);
        List<DocumentTimelineItemDTO> historyTimelineItems = documentHistoryTranslator.translateToTimelineItems(documentHistoryDTOs);

        List<DocumentTimelineItemDTO> documentTimeline = new ArrayList<>(documentTimelineItems);
        documentTimeline.addAll(historyTimelineItems);

        if (fileService.hasAttachedFiles(registryNumber)) {
            DocumentFile documentFile = fileService.getFile(registryNumber);
            DocumentTimelineItemDTO uploadTimelineItem = fileTranslator.translateToTimelineItem(documentFile);
            documentTimeline.add(uploadTimelineItem);
        }

        //sort and group by date
        return documentTimeline.stream()
                //TODO check if needs to be reversed
                .sorted()
                .collect(Collectors.groupingBy(DocumentTimelineItemDTO::getDate));
    }
}
