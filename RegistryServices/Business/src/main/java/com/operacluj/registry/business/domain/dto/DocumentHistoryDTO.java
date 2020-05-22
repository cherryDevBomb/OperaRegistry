package com.operacluj.registry.business.domain.dto;

import lombok.Data;

@Data
public class DocumentHistoryDTO {

    private int documentHistoryId;
    private int registryNumber;

    private String sentDate;
    private UserDTO sender;
    private String sentMessage;

    private UserDTO internalRecipient;
    private String externalRecipient;

    private boolean resolved;
    private String resolvedMessage;
    private String resolvedDate;
}
