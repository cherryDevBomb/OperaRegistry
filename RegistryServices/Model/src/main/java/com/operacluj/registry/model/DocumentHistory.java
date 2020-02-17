package com.operacluj.registry.model;

import java.time.LocalDate;

public class DocumentHistory {

    private int documentHistoryId;
    private int registryNumber;
    private int senderId;
    private int recipientId;
    private LocalDate expeditedDate;
    private LocalDate deadline;
    private LocalDate solvedDate;
    private DocumentStatus status;

    public int getDocumentHistoryId() {
        return documentHistoryId;
    }

    public void setDocumentHistoryId(int documentHistoryId) {
        this.documentHistoryId = documentHistoryId;
    }

    public int getRegistryNumber() {
        return registryNumber;
    }

    public void setRegistryNumber(int registryNumber) {
        this.registryNumber = registryNumber;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public int getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(int recipientId) {
        this.recipientId = recipientId;
    }

    public LocalDate getExpeditedDate() {
        return expeditedDate;
    }

    public void setExpeditedDate(LocalDate expeditedDate) {
        this.expeditedDate = expeditedDate;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public LocalDate getSolvedDate() {
        return solvedDate;
    }

    public void setSolvedDate(LocalDate solvedDate) {
        this.solvedDate = solvedDate;
    }

    public DocumentStatus getStatus() {
        return status;
    }

    public void setStatus(DocumentStatus status) {
        this.status = status;
    }
}
