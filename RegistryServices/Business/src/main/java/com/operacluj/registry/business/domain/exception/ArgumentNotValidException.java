package com.operacluj.registry.business.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.ConstraintViolation;
import java.util.Set;

@Getter
@AllArgsConstructor
public class ArgumentNotValidException extends RuntimeException {

    private Set<ConstraintViolation<Object>> constraintViolations;
}
