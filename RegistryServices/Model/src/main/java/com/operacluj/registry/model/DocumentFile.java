package com.operacluj.registry.model;

import java.time.LocalDate;

public class DocumentFile {

    private int documentFileId;
    private int registryNumber;
    private byte[] fileData;
    private LocalDate uploadDate;
    private String filename;

    public int getDocumentFileId() {
        return documentFileId;
    }

    public void setDocumentFileId(int documentFileId) {
        this.documentFileId = documentFileId;
    }

    public int getRegistryNumber() {
        return registryNumber;
    }

    public void setRegistryNumber(int registryNumber) {
        this.registryNumber = registryNumber;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public LocalDate getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }
}
