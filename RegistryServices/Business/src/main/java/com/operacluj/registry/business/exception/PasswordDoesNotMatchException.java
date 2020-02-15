package com.operacluj.registry.business.exception;

public class PasswordDoesNotMatchException extends RuntimeException {

    public PasswordDoesNotMatchException(String message){
        super(message);
    }
}
