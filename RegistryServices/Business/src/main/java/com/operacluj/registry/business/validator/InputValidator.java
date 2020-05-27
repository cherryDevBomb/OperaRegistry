package com.operacluj.registry.business.validator;

import com.operacluj.registry.business.domain.exception.ArgumentNotValidException;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Component
public class InputValidator {

    public void validate(Object object) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        Set<ConstraintViolation<Object>> constraintViolations = validator.validate(object);

        if (!CollectionUtils.isEmpty(constraintViolations)) {
            Map<String, String> errorMap = new HashMap<>();
            for (ConstraintViolation<Object> constraintViolation : constraintViolations) {
                errorMap.put(constraintViolation.getPropertyPath().toString(), constraintViolation.getMessage());
            }
            throw new ArgumentNotValidException(errorMap);
        }
    }
}
