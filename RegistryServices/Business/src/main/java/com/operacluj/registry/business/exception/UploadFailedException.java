package com.operacluj.registry.business.exception;

public class UploadFailedException extends RuntimeException {

    private String propertyName = "file";

    public UploadFailedException(String message) {
        super(message);
    }

    public String getPropertyName() {
        return propertyName;
    }
}
