package com.operacluj.registry.business.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomConstraintViolationException extends RuntimeException {

    private String propertyName;
    private String violationMessage;
}
