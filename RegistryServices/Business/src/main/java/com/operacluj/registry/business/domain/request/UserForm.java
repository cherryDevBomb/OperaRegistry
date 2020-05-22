package com.operacluj.registry.business.domain.request;

import com.operacluj.registry.business.util.ErrorMessageConstants;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserForm {

    @NotBlank(message = ErrorMessageConstants.REQUIRED_FIELD)
    private String firstName;

    @NotBlank(message = ErrorMessageConstants.REQUIRED_FIELD)
    private String lastName;

    @NotBlank(message = ErrorMessageConstants.REQUIRED_FIELD)
    @Email(message = ErrorMessageConstants.EMAIL_NOT_VALID)
    private String email;

    @NotBlank(message = ErrorMessageConstants.REQUIRED_FIELD)
    private String department;

    @NotBlank(message = ErrorMessageConstants.REQUIRED_FIELD)
    private String password;

    @NotBlank(message = ErrorMessageConstants.REQUIRED_FIELD)
    private String confirmPassword;
}
