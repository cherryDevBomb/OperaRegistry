package com.operacluj.registry.business.validator;

import com.operacluj.registry.business.domain.exception.ArgumentNotValidException;
import com.operacluj.registry.business.domain.request.UserForm;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.model.Department;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.Map;

@Component
public class UserValidator extends InputValidator {

    @Override
    public void validate(Object object) {
        Map<String, String> errorMap = new HashMap<>();

        try {
            super.validate(object);
        } catch (ArgumentNotValidException e) {
            errorMap.putAll(e.getErrorMap());
        }

        UserForm userForm = (UserForm) object;
        if ((Department.getDepartment(userForm.getDepartment()) == null)) {
            errorMap.put("department", ErrorMessageConstants.INVALID_DEPARTMENT);
        }
        if (!userForm.getPassword().equals(userForm.getConfirmPassword())) {
            errorMap.put("confirmPassword", ErrorMessageConstants.PASSWORD_DOES_NOT_MATCH);
        }

        if (!CollectionUtils.isEmpty(errorMap)) {
            throw new ArgumentNotValidException(errorMap);
        }
    }
}
