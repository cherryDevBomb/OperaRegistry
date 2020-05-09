package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.dto.DocumentTimelineItemDTO;
import com.operacluj.registry.business.domain.dto.UserDTO;
import com.operacluj.registry.business.service.DocumentTimelineService;
import com.operacluj.registry.business.service.FileService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.model.*;
import com.operacluj.registry.persistence.repository.DocumentHistoryRepository;
import com.operacluj.registry.persistence.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DocumentTimelineServiceImpl implements DocumentTimelineService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private DocumentHistoryRepository documentHistoryRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserTranslator userTranslator;

    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.YYYY");


    @Override
    public Map<String, List<DocumentTimelineItemDTO>> getDocumentTimeline(int registryNumber, boolean hasAttachedFiles) {
        Document document = documentRepository.getDocumentByRegistryNumber(registryNumber);
        List<DocumentHistory> documentHistoryList = documentHistoryRepository.getDocumentHistoryForDocument(registryNumber);

        List<DocumentTimelineItemDTO> timelineItems = new ArrayList<>();

        timelineItems.add(getCreateActionItem(document));

        List<DocumentTimelineItemDTO> documentSendActions = documentHistoryList.stream()
                .map(this::getSendActionItem)
                .collect(Collectors.toList());
        timelineItems.addAll(documentSendActions);

        List<DocumentTimelineItemDTO> documentResolveActions = documentHistoryList.stream()
                .filter(DocumentHistory::isResolved)
                .map(this::getResolveActionItem)
                .collect(Collectors.toList());
        timelineItems.addAll(documentResolveActions);

        if (hasAttachedFiles) {
            DocumentFile documentFile = fileService.getFile(document.getRegistryNumber());
            DocumentTimelineItemDTO uploadTimelineItem = getUploadActionItem(documentFile);
            timelineItems.add(uploadTimelineItem);
        }

        if (document.isArchived()) {
            timelineItems.add(getArchiveActionItem(document));
        }

        //sort and group by date
        return timelineItems.stream()
                .sorted()
                .collect(Collectors.groupingBy(DocumentTimelineItemDTO::getDate, LinkedHashMap::new, Collectors.toList()));
    }

    private DocumentTimelineItemDTO getCreateActionItem(Document document) {
        DocumentTimelineItemDTO createItem = new DocumentTimelineItemDTO();
        createItem.setAction(DocumentAction.CREATE.toString());
        createItem.setActor(getActor(document.getCreatedBy()));
        createItem.setDate(formatter.format(document.getCreatedDate()));
        createItem.setTimestamp(document.getCreatedDate());

        return createItem;
    }

    private DocumentTimelineItemDTO getArchiveActionItem(Document document) {
        if (document.isArchived()) {
            DocumentTimelineItemDTO archiveItem = new DocumentTimelineItemDTO();
            archiveItem.setAction(DocumentAction.ARCHIVE.toString());
            archiveItem.setActor(getActor(document.getCreatedBy()));
            archiveItem.setDate(formatter.format(document.getArchivingDate()));
            archiveItem.setMessage(document.getArchivingMessage());
            archiveItem.setTimestamp(document.getArchivingDate());

            return archiveItem;
        }
        return null;
    }

    private DocumentTimelineItemDTO getSendActionItem(DocumentHistory documentHistory) {
        DocumentTimelineItemDTO sendItem = new DocumentTimelineItemDTO();

        sendItem.setAction(DocumentAction.SEND.toString());
        sendItem.setActor(getActor(documentHistory.getSender()));
        sendItem.setDate(formatter.format(documentHistory.getSentDate()));
        sendItem.setMessage(documentHistory.getSentMessage());
        sendItem.setInternalRecipient(getActor(documentHistory.getInternalRecipient()));
        sendItem.setExternalRecipient(documentHistory.getExternalRecipient());
        sendItem.setTimestamp(documentHistory.getSentDate());

        return sendItem;
    }

    private DocumentTimelineItemDTO getResolveActionItem(DocumentHistory documentHistory) {
        DocumentTimelineItemDTO resolveItem = new DocumentTimelineItemDTO();

        resolveItem.setAction(DocumentAction.RESOLVE.toString());
        resolveItem.setActor(getActor(documentHistory.getInternalRecipient()));
        resolveItem.setDate(formatter.format(documentHistory.getResolvedDate()));
        resolveItem.setMessage(documentHistory.getResolvedMessage());
        resolveItem.setTimestamp(documentHistory.getResolvedDate());

        return resolveItem;
    }

    private DocumentTimelineItemDTO getUploadActionItem(DocumentFile documentFile) {
        DocumentTimelineItemDTO uploadItem = new DocumentTimelineItemDTO();
        uploadItem.setAction(DocumentAction.UPLOAD.toString());
        uploadItem.setActor(getActor(documentFile.getUploader()));
        uploadItem.setDate(formatter.format(documentFile.getUploadDate()));
        uploadItem.setTimestamp(documentFile.getUploadDate());
        return uploadItem;
    }

    private UserDTO getActor(int userId) {
        if (userId != 0) {
            User actor = userService.getUserById(userId);
            return userTranslator.translate(actor);
        }
        else {
            return null;
        }
    }
}
