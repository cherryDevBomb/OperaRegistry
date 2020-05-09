package com.operacluj.registry.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DocumentHistory {

    private int documentHistoryId;
    private int registryNumber;

    private LocalDateTime sentDate;
    private int sender;
    private String sentMessage;

    private Integer internalRecipient;
    private String externalRecipient;

    private boolean resolved;
    private String resolvedMessage;
    private LocalDateTime resolvedDate;
}
