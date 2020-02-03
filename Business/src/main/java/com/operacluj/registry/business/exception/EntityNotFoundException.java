package com.operacluj.registry.business.exception;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(String message){
        super(message);
    }

    public EntityNotFoundException(String message, Throwable exception) {
        super(message, exception);
    }
}
