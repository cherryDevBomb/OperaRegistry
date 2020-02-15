package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.exception.ArgumentNotValidException;
import com.operacluj.registry.business.exception.DuplicateEntityException;
import com.operacluj.registry.business.exception.EntityNotFoundException;
import com.operacluj.registry.business.domain.ErrorResponse;
import com.operacluj.registry.business.exception.PasswordDoesNotMatchException;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleAuthException(AuthenticationException e, HttpServletResponse response) {
        return new ErrorResponse(ErrorMessageConstants.INVALID_LOGIN_MESSAGE, ErrorMessageConstants.INVALID_LOGIN_CAUSE);
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
        Map<String, String> errorMap = new HashMap<>();
        for (ConstraintViolation<Object> constraintViolation : e.getConstraintViolations()) {
            errorMap.put(constraintViolation.getPropertyPath().toString(), constraintViolation.getMessage());
        }
        return errorMap;
    }

    @ExceptionHandler({PasswordDoesNotMatchException.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleException(PasswordDoesNotMatchException e) {
        return new ErrorResponse(e.getMessage(), getCause(e));
    }

    @ExceptionHandler({Exception.class, ServletException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(Exception e) {
        return new ErrorResponse(e.getMessage(), getCause(e));
    }

    private String getCause(Exception e) {
        return e.getCause() == null ? "" : e.getCause().getMessage();
    }
}
