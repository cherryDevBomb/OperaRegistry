package com.operacluj.registry.business.exception;

public class FileOperationException extends RuntimeException {

    private String propertyName = "file";

    public FileOperationException(String message) {
        super(message);
    }

    public String getPropertyName() {
        return propertyName;
    }
}
