package com.operacluj.registry.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DocumentFile {

    private int documentFileId;
    private int registryNumber;
    private byte[] fileData;
    private LocalDateTime uploadDate;
    private int uploader;
    private String filename;
}
