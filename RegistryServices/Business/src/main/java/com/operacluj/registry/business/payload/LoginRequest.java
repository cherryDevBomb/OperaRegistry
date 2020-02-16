package com.operacluj.registry.business.payload;

import com.operacluj.registry.business.util.ErrorMessageConstants;

import javax.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = ErrorMessageConstants.EMAIL_REQUIRED)
    private String email;

    @NotBlank(message = ErrorMessageConstants.PASSWORD_REQUIRED)
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
