package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.dto.DocumentDTO;
import com.operacluj.registry.business.domain.request.DocumentForm;
import com.operacluj.registry.business.domain.dto.DocumentHistoryDTO;
import com.operacluj.registry.business.domain.dto.DocumentTimelineItemDTO;
import com.operacluj.registry.business.service.DocumentHistoryService;
import com.operacluj.registry.business.service.FileService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class DocumentTranslator {

    @Autowired
    private UserService userService;

    @Autowired
    private DocumentHistoryService documentHistoryService;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserTranslator userTranslator;

    @Autowired
    private DocumentHistoryTranslator documentHistoryTranslator;

    @Autowired
    FileTranslator fileTranslator;

    public Document translate(DocumentForm documentForm) {
        Document document = new Document();
        document.setTitle(documentForm.getTitle());
        if (StringUtils.hasText(documentForm.getOrigin())) {
            document.setOrigin(documentForm.getOrigin());
        }

        if (documentForm.isOriginExternal()) {
            document.setType(DocumentType.ORIGIN_EXTERNAL);
        }
        else if (documentForm.isDestinationExternal()) {
            document.setType(DocumentType.DESTINATION_EXTERNAL);
        }
        else {
            document.setType(DocumentType.INTERNAL);
        }

        return document;
    }

    public DocumentDTO translate(Document document) {
        DocumentDTO documentDTO = new DocumentDTO();
        documentDTO.setRegistryNumber(document.getRegistryNumber());
        documentDTO.setOrigin(document.getOrigin());
        documentDTO.setTitle(document.getTitle());
        documentDTO.setDocumentType(document.getType().toString());
        documentDTO.setArchived(document.isArchived());
        documentDTO.setArchivingMessage(document.getArchivingMessage());

        User documentAuthor = userService.getUserById(document.getCreatedBy());
        documentDTO.setCreatedBy(userTranslator.translate(documentAuthor));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.YYYY");
        documentDTO.setCreatedDate(formatter.format(document.getCreatedDate()));
        documentDTO.setArchivingDate(document.isArchived() ? formatter.format(document.getArchivingDate()) : null);

        boolean hasAttachedFiles = fileService.hasAttachedFiles(document.getRegistryNumber());
        documentDTO.setHasAttachment(hasAttachedFiles);

        List<DocumentHistoryDTO> documentHistoryDTOList = documentHistoryService.getDocumentHistoryForDocument(document.getRegistryNumber());
        documentDTO.setDocumentHistory(documentHistoryDTOList);

        Map<String, List<DocumentTimelineItemDTO>> documentTimeline = getDocumentTimeline(documentDTO, documentHistoryDTOList, hasAttachedFiles);
        documentDTO.setDocumentTimeline(documentTimeline);

        return documentDTO;
    }

    private Map<String, List<DocumentTimelineItemDTO>> getDocumentTimeline(DocumentDTO documentDTO, List<DocumentHistoryDTO> documentHistoryDTO, boolean hasAttachedFiles) {
        List<DocumentTimelineItemDTO> documentTimelineItems = translateToTimelineItems(documentDTO);
        List<DocumentTimelineItemDTO> historyTimelineItems = documentHistoryTranslator.translateToTimelineItems(documentHistoryDTO);

        List<DocumentTimelineItemDTO> documentTimeline = new ArrayList<>(documentTimelineItems);
        documentTimeline.addAll(historyTimelineItems);

        if (hasAttachedFiles) {
            DocumentFile documentFile = fileService.getFile(documentDTO.getRegistryNumber());
            DocumentTimelineItemDTO uploadTimelineItem = fileTranslator.translateToTimelineItem(documentFile);
            documentTimeline.add(uploadTimelineItem);
        }

        //sort and group by date
        return documentTimeline.stream()
                .sorted()
                .collect(Collectors.groupingBy(DocumentTimelineItemDTO::getDate));
    }

    private List<DocumentTimelineItemDTO> translateToTimelineItems(DocumentDTO documentDTO) {
        List<DocumentTimelineItemDTO> documentTimelineItems = new ArrayList<>();

        DocumentTimelineItemDTO createItem = new DocumentTimelineItemDTO();
        createItem.setAction(DocumentAction.CREATE.toString());
        createItem.setActor(documentDTO.getCreatedBy());
        createItem.setDate(documentDTO.getCreatedDate());
        documentTimelineItems.add(createItem);

        if (documentDTO.isArchived()) {
            DocumentTimelineItemDTO archiveItem = new DocumentTimelineItemDTO();
            archiveItem.setAction(DocumentAction.ARCHIVE.toString());
            archiveItem.setActor(documentDTO.getCreatedBy());
            archiveItem.setDate(documentDTO.getArchivingDate());
            archiveItem.setMessage(documentDTO.getArchivingMessage());
            documentTimelineItems.add(archiveItem);
        }

        return documentTimelineItems;
    }
}
