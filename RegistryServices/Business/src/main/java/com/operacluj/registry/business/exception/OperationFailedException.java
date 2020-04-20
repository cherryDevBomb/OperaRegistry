package com.operacluj.registry.business.exception;


public class OperationFailedException extends RuntimeException {

    public OperationFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
