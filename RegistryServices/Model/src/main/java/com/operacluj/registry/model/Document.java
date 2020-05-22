package com.operacluj.registry.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Document {

    private int registryNumber;
    private LocalDateTime createdDate;
    private String title;
    private DocumentType type;
    private int createdBy;
    private String origin;
    private boolean archived;
    private String archivingMessage;
    private LocalDateTime archivingDate;
    private String path;
}
