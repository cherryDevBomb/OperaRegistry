package com.operacluj.registry.business.domain;

import com.operacluj.registry.model.User;

public class DocumentHistoryDTO {

    private int documentHistoryId;
    private int registryNumber;

    private String sentDate;
    private User sender;
    private String sentMessage;

    private User internalRecipient;
    private String externalRecipient;

    private boolean resolved;
    private String resolvedMessage;
    private String resolvedDate;

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

    public String getSentDate() {
        return sentDate;
    }

    public void setSentDate(String sentDate) {
        this.sentDate = sentDate;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public String getSentMessage() {
        return sentMessage;
    }

    public void setSentMessage(String sentMessage) {
        this.sentMessage = sentMessage;
    }

    public User getInternalRecipient() {
        return internalRecipient;
    }

    public void setInternalRecipient(User internalRecipient) {
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

    public String getResolvedDate() {
        return resolvedDate;
    }

    public void setResolvedDate(String resolvedDate) {
        this.resolvedDate = resolvedDate;
    }
}
