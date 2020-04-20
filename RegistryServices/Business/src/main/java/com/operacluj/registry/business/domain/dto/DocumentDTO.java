package com.operacluj.registry.business.domain.dto;

import java.util.List;
import java.util.Map;

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

    public int getRegistryNumber() {
        return registryNumber;
    }

    public void setRegistryNumber(int registryNumber) {
        this.registryNumber = registryNumber;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public UserDTO getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserDTO createdBy) {
        this.createdBy = createdBy;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public String getArchivingMessage() {
        return archivingMessage;
    }

    public void setArchivingMessage(String archivingMessage) {
        this.archivingMessage = archivingMessage;
    }

    public String getArchivingDate() {
        return archivingDate;
    }

    public void setArchivingDate(String archivingDate) {
        this.archivingDate = archivingDate;
    }

    public boolean isHasAttachment() {
        return hasAttachment;
    }

    public void setHasAttachment(boolean hasAttachment) {
        this.hasAttachment = hasAttachment;
    }

    public List<DocumentHistoryDTO> getDocumentHistory() {
        return documentHistory;
    }

    public void setDocumentHistory(List<DocumentHistoryDTO> documentHistory) {
        this.documentHistory = documentHistory;
    }

    public Map<String, List<DocumentTimelineItemDTO>> getDocumentTimeline() {
        return documentTimeline;
    }

    public void setDocumentTimeline(Map<String, List<DocumentTimelineItemDTO>> documentTimeline) {
        this.documentTimeline = documentTimeline;
    }
}
