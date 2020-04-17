package com.operacluj.registry.business.domain;

import com.operacluj.registry.model.DocumentAction;

public class DocumentTimelineItemDTO implements Comparable<DocumentTimelineItemDTO> {

    private UserDTO actor;
    private String action;
    private String date;
    private String message;

    private UserDTO internalRecipient;
    private String externalRecipient;

    public UserDTO getActor() {
        return actor;
    }

    public void setActor(UserDTO actor) {
        this.actor = actor;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserDTO getInternalRecipient() {
        return internalRecipient;
    }

    public void setInternalRecipient(UserDTO internalRecipient) {
        this.internalRecipient = internalRecipient;
    }

    public String getExternalRecipient() {
        return externalRecipient;
    }

    public void setExternalRecipient(String externalRecipient) {
        this.externalRecipient = externalRecipient;
    }

    @Override
    public int compareTo(DocumentTimelineItemDTO other) {
        //TODO compare date objects, not strings
        int dateCompare = date.compareTo(other.getDate());

        if (dateCompare != 0) {
            return dateCompare;
        }

        DocumentAction thisAction = DocumentAction.valueOf(action);
        DocumentAction otherAction = DocumentAction.valueOf(other.getAction());
        return thisAction.getPrecedence().compareTo(otherAction.getPrecedence());
    }
}
