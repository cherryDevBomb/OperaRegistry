package com.operacluj.registry.business.domain;

import com.operacluj.registry.business.util.ErrorMessageConstants;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;


public class DocumentForm {

    @NotBlank(message = ErrorMessageConstants.DOCUMENT_TITLE_REQUIRED)
    private String title;

    private String origin;

    private boolean isOriginExternal;

    private boolean isDestinationExternal;

    private String path;

    @NotEmpty(message = ErrorMessageConstants.DOCUMENT_RECIPIENT_REQUIRED)
    private List<String> recipients;
    //private List<String> recipientNames;

    private String sentMessage;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public boolean isOriginExternal() {
        return isOriginExternal;
    }

    public void setIsOriginExternal(boolean originExternal) {
        isOriginExternal = originExternal;
    }

    public boolean isDestinationExternal() {
        return isDestinationExternal;
    }

    public void setIsDestinationExternal(boolean destinationExternal) {
        isDestinationExternal = destinationExternal;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

//    public List<String> getRecipientNames() {
//        return recipientNames;
//    }
//
//    public void setRecipientNames(List<String> recipientNames) {
//        this.recipientNames = recipientNames;
//    }


    public List<String> getRecipients() {
        return recipients;
    }

    public void setRecipients(List<String> recipients) {
        this.recipients = recipients;
    }

    public String getSentMessage() {
        return sentMessage;
    }

    public void setSentMessage(String sentMessage) {
        this.sentMessage = sentMessage;
    }
}
