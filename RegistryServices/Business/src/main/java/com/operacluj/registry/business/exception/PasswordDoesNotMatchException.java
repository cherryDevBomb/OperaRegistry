package com.operacluj.registry.business.exception;

public class PasswordDoesNotMatchException extends RuntimeException {

    private String propertyName = "confirmPassword";

    public PasswordDoesNotMatchException(String message){
        super(message);
    }
}
