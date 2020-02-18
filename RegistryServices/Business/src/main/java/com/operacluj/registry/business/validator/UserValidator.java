package com.operacluj.registry.business.validator;

import com.operacluj.registry.business.domain.UserDTO;
import com.operacluj.registry.business.exception.CustomConstraintViolationException;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import org.springframework.stereotype.Component;

@Component
public class UserValidator extends InputValidator {

    @Override
    public void validate(Object dtoObject) {
        super.validate(dtoObject);
        UserDTO userDTO = (UserDTO) dtoObject;
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            throw new CustomConstraintViolationException("confirmPassword", ErrorMessageConstants.PASSWORD_DOES_NOT_MATCH);
        }
    }
}
