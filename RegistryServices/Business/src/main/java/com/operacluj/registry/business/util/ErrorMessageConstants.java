package com.operacluj.registry.business.util;

import org.springframework.beans.factory.annotation.Value;


public class ErrorMessageConstants {

    public static final String DOCUMENT_TITLE_REQUIRED = "Document title is required";
    public static final String DOCUMENT_TYPE_REQUIRED = "Document type is required";
    public static final String DOCUMENT_NOT_FOUND = "Document not found";
    public static final String DOCUMENT_NOT_CREATED = "Failed to create a new document";

    public static final String DOCUMENT_HISTORY_NOT_CREATED = "Failed to create a new document history entry";
    public static final String EMPTY_DOCUMENT_HISTORY = "Empty document history";

    public static final String EMAIL_REQUIRED = "Email is required";
    public static final String EMAIL_NOT_VALID = "Not a valid email";
    public static final String PASSWORD_REQUIRED = "Password is required";
    public static final String FIRST_NAME_REQUIRED = "First name is required";
    public static final String LAST_NAME_REQUIRED = "Last name is required";
    public static final String PASSWORD_DOES_NOT_MATCH = "Password does not match";
    public static final String USER_ALREADY_EXISTS = "A user with this email is already registered";
    public static final String USER_NOT_FOUND = "User not found";

    public static final String INVALID_LOGIN = "Incorrect email or password";

    public static final String ACCESS_DENIED = "Access denied";


    public static final String EMPTY_MESSAGE = " ";
}
