package com.operacluj.registry.business.domain;

import com.operacluj.registry.model.DocumentAction;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        LocalDate thisDate = LocalDate.parse(date, formatter);
        LocalDate otherDate = LocalDate.parse(other.getDate(), formatter);

        int dateCompare = thisDate.compareTo(otherDate);
        if (dateCompare != 0) {
            return dateCompare;
        }

        DocumentAction thisAction = DocumentAction.valueOf(action);
        DocumentAction otherAction = DocumentAction.valueOf(other.getAction());
        return otherAction.getPrecedence().compareTo(thisAction.getPrecedence());
    }
}
