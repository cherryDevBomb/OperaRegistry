package com.operacluj.registry.business.domain.dto;

import com.operacluj.registry.model.DocumentAction;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DocumentTimelineItemDTO implements Comparable<DocumentTimelineItemDTO> {

    private UserDTO actor;
    private String action;
    private String date;
    private String message;

    private UserDTO internalRecipient;
    private String externalRecipient;

    private LocalDateTime timestamp;

    @Override
    public int compareTo(DocumentTimelineItemDTO other) {
        int dateCompare = other.getTimestamp().compareTo(getTimestamp());
        if (dateCompare != 0) {
            return dateCompare;
        }

        DocumentAction thisAction = DocumentAction.valueOf(action);
        DocumentAction otherAction = DocumentAction.valueOf(other.getAction());
        return otherAction.getPrecedence().compareTo(thisAction.getPrecedence());
    }
}
