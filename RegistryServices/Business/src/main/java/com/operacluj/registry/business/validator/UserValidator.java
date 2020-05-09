package com.operacluj.registry.business.validator;

import com.operacluj.registry.business.exception.CustomConstraintViolationException;
import com.operacluj.registry.business.domain.request.UserForm;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import org.springframework.stereotype.Component;

@Component
public class UserValidator extends InputValidator {

    @Override
    public void validate(Object object) {
        super.validate(object);
        UserForm userForm = (UserForm) object;
        if (!userForm.getPassword().equals(userForm.getConfirmPassword())) {
            throw new CustomConstraintViolationException("confirmPassword", ErrorMessageConstants.PASSWORD_DOES_NOT_MATCH);
        }
    }
}
