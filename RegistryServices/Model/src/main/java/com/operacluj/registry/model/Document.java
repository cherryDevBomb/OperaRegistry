package com.operacluj.registry.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;


public class Document {

    private int registryNumber;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdDate;

    private String title;
    private DocumentType type;
    private int createdBy;
    private String origin;
    private boolean archived;
    private String archivingMessage;
    private LocalDate archivingDate;
    private String path;

    public int getRegistryNumber() {
        return registryNumber;
    }

    public void setRegistryNumber(int registryNumber) {
        this.registryNumber = registryNumber;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public DocumentType getType() {
        return type;
    }

    public void setType(DocumentType type) {
        this.type = type;
    }

    public int getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(int createdBy) {
        this.createdBy = createdBy;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public String getArchivingMessage() {
        return archivingMessage;
    }

    public void setArchivingMessage(String archivingMessage) {
        this.archivingMessage = archivingMessage;
    }

    public LocalDate getArchivingDate() {
        return archivingDate;
    }

    public void setArchivingDate(LocalDate archivingDate) {
        this.archivingDate = archivingDate;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
