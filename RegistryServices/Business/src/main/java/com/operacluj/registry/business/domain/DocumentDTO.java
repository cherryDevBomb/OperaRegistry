package com.operacluj.registry.business.domain;

import com.operacluj.registry.model.User;

import java.util.List;

public class DocumentDTO {

    private int registryNumber;

    private User createdBy;

    private String createdDate;

    private String title;

    private String globalStatus;

    private String documentType;

    private String path;

    private List<DocumentHistoryDTO> documentHistory;

    public int getRegistryNumber() {
        return registryNumber;
    }

    public void setRegistryNumber(int registryNumber) {
        this.registryNumber = registryNumber;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGlobalStatus() {
        return globalStatus;
    }

    public void setGlobalStatus(String globalStatus) {
        this.globalStatus = globalStatus;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
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
