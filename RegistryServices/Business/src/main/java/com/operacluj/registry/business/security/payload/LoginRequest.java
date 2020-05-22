package com.operacluj.registry.business.security.payload;

import com.operacluj.registry.business.util.ErrorMessageConstants;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {

    @NotBlank(message = ErrorMessageConstants.REQUIRED_FIELD)
    private String email;

    @NotBlank(message = ErrorMessageConstants.REQUIRED_FIELD)
    private String password;
}
