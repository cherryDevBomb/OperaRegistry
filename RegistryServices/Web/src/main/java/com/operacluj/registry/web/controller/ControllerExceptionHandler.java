package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.domain.exception.ArgumentNotValidException;
import com.operacluj.registry.business.domain.exception.EntityNotFoundException;
import com.operacluj.registry.business.domain.exception.OperationFailedException;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.web.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleAuthException(AuthenticationException e, HttpServletResponse response) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("email", ErrorMessageConstants.EMPTY_MESSAGE);
        errorMap.put("password", ErrorMessageConstants.EMPTY_MESSAGE);
        return errorMap;
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleException(AccessDeniedException e) {
        return new ErrorResponse(ErrorMessageConstants.ACCESS_DENIED, getCause(e));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleException(EntityNotFoundException e) {
        return new ErrorResponse(e.getMessage(), getCause(e));
    }

    @ExceptionHandler(ArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map<String, String> handleException(ArgumentNotValidException e) {
        return e.getErrorMap();
    }

    @ExceptionHandler({OperationFailedException.class, Exception.class, ServletException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(Exception e) {
        return new ErrorResponse(e.getMessage(), getCause(e));
    }

    private String getCause(Exception e) {
        return e.getCause() == null ? "" : e.getCause().getMessage();
    }
}
