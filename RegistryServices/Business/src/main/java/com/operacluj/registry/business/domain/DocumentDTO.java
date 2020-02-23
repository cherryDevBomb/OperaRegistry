package com.operacluj.registry.business.domain;

import com.operacluj.registry.model.User;

import java.util.List;

public class DocumentDTO {

    private int registryNumber;
    private String createdDate;
    private User createdBy;
    private String origin;
    private String title;
    private String documentType;
    private boolean archived;
    private String archivingMessage;
    private String archivingDate;
    private String path;
    private List<DocumentHistoryDTO> documentHistory;

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

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<DocumentHistoryDTO> getDocumentHistory() {
        return documentHistory;
    }

    public void setDocumentHistory(List<DocumentHistoryDTO> documentHistory) {
        this.documentHistory = documentHistory;
    }
}
