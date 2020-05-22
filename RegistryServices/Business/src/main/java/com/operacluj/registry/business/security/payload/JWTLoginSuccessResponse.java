package com.operacluj.registry.business.security.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JWTLoginSuccessResponse {

    private boolean success;
    private String token;
}
