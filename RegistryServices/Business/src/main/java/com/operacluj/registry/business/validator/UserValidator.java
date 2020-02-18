package com.operacluj.registry.business.validator;

import com.operacluj.registry.business.domain.UserForm;
import com.operacluj.registry.business.exception.PasswordDoesNotMatchException;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import org.springframework.stereotype.Component;

@Component
public class UserValidator extends InputValidator {

    @Override
    public void validate(Object dtoObject) {
        super.validate(dtoObject);
        UserForm userForm = (UserForm) dtoObject;
        if (!userForm.getPassword().equals(userForm.getConfirmPassword())) {
            throw new PasswordDoesNotMatchException(ErrorMessageConstants.PASSWORD_DOES_NOT_MATCH);
        }
    }
}
