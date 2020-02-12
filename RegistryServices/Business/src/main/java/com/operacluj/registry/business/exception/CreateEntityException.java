package com.operacluj.registry.business.exception;


public class CreateEntityException extends RuntimeException {

    public CreateEntityException(String message){
        super(message);
    }

    public CreateEntityException(String message, Throwable exception) {
        super(message, exception);
    }
}
