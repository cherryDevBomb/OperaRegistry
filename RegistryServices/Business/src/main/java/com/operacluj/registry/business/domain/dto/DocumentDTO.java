package com.operacluj.registry.business.domain.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class DocumentDTO {

    private int registryNumber;
    private String createdDate;
    private UserDTO createdBy;
    private String origin;
    private String title;
    private String documentType;
    private boolean archived;
    private String archivingMessage;
    private String archivingDate;
    private boolean hasAttachment;
    private List<DocumentHistoryDTO> documentHistory;
    private Map<String, List<DocumentTimelineItemDTO>> documentTimeline;
}
