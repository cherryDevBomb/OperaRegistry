package com.operacluj.registry.business.domain;

import com.operacluj.registry.business.util.ErrorMessageConstants;

import javax.validation.constraints.NotBlank;


public class DocumentFormDTO {

//    @NotBlank(message = ErrorMessageConstants.EMAIL_REQUIRED)
//    private String email;

    @NotBlank(message = ErrorMessageConstants.DOCUMENT_TITLE_REQUIRED)
    private String title;

    @NotBlank(message = ErrorMessageConstants.DOCUMENT_TYPE_REQUIRED)
    private String docType;

    private String path;

    private String recipientId;

    private String deadline;

//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(String recipientId) {
        this.recipientId = recipientId;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }
}
