package com.operacluj.registry.model;

import java.time.LocalDate;

public class DocumentHistory {

    private int documentHistoryId;
    private int registryNumber;

    private LocalDate sentDate;
    private int sender;
    private String sentMessage;

    private Integer internalRecipient;
    private String externalRecipient;

    private boolean resolved;
    private String resolvedMessage;
    private LocalDate resolvedDate;

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

    public LocalDate getSentDate() {
        return sentDate;
    }

    public void setSentDate(LocalDate sentDate) {
        this.sentDate = sentDate;
    }

    public int getSender() {
        return sender;
    }

    public void setSender(int sender) {
        this.sender = sender;
    }

    public String getSentMessage() {
        return sentMessage;
    }

    public void setSentMessage(String sentMessage) {
        this.sentMessage = sentMessage;
    }

    public Integer getInternalRecipient() {
        return internalRecipient;
    }

    public void setInternalRecipient(int internalRecipient) {
        this.internalRecipient = internalRecipient;
    }

    public String getExternalRecipient() {
        return externalRecipient;
    }

    public void setExternalRecipient(String externalRecipient) {
        this.externalRecipient = externalRecipient;
    }

    public boolean isResolved() {
        return resolved;
    }

    public void setResolved(boolean resolved) {
        this.resolved = resolved;
    }

    public String getResolvedMessage() {
        return resolvedMessage;
    }

    public void setResolvedMessage(String resolvedMessage) {
        this.resolvedMessage = resolvedMessage;
    }

    public LocalDate getResolvedDate() {
        return resolvedDate;
    }

    public void setResolvedDate(LocalDate resolvedDate) {
        this.resolvedDate = resolvedDate;
    }
}
