package com.operacluj.registry.business.exception;

import javax.validation.ConstraintViolation;
import java.util.Set;


public class ArgumentNotValidException extends RuntimeException {

    private Set<ConstraintViolation<Object>> constraintViolations;

    public ArgumentNotValidException(Set<ConstraintViolation<Object>> constraintViolations) {
        this.constraintViolations = constraintViolations;
    }

    public Set<ConstraintViolation<Object>> getConstraintViolations() {
        return constraintViolations;
    }
}
