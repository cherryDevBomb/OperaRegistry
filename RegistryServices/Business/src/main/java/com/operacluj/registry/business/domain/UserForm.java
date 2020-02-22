package com.operacluj.registry.business.domain;

import com.operacluj.registry.business.util.ErrorMessageConstants;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserForm {

    @NotBlank(message = ErrorMessageConstants.FIRST_NAME_REQUIRED)
    private String firstName;

    @NotBlank(message = ErrorMessageConstants.LAST_NAME_REQUIRED)
    private String lastName;

    @NotBlank(message = ErrorMessageConstants.EMAIL_REQUIRED)
    @Email(message = ErrorMessageConstants.EMAIL_NOT_VALID)
    private String email;

    @NotBlank(message = ErrorMessageConstants.DEPARTMENT_REQUIRED)
    private String department;

    @NotBlank(message = ErrorMessageConstants.PASSWORD_REQUIRED)
    private String password;

    @NotBlank(message = ErrorMessageConstants.PASSWORD_REQUIRED)
    private String confirmPassword;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
