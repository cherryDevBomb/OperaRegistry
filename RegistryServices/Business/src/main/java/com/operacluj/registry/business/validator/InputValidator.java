package com.operacluj.registry.business.validator;

import com.operacluj.registry.business.exception.ArgumentNotValidException;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;


@Component
public class InputValidator {

    public void validate(Object dtoObject) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        Set<ConstraintViolation<Object>> constraintViolations = validator.validate(dtoObject);
        if (!CollectionUtils.isEmpty(constraintViolations)) {
            throw new ArgumentNotValidException(constraintViolations);
        }
    }
}
