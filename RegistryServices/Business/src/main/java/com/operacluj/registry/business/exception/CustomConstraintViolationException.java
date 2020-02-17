package com.operacluj.registry.business.exception;

public class CustomConstraintViolationException extends RuntimeException {

    private String propertyName;
    private String violationMessage;

    public CustomConstraintViolationException(String propertyName, String violationMessage) {
        super();
        this.propertyName = propertyName;
        this.violationMessage = violationMessage;
    }

    public String getPropertyName() {
        return propertyName;
    }

    public String getViolationMessage() {
        return violationMessage;
    }
}
