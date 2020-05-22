package com.operacluj.registry.web.response;

public class ErrorResponse {

    private String message;
    private String cause;

    public ErrorResponse(String message, String cause) {
        this.message = message;
        this.cause = cause;
    }
}
