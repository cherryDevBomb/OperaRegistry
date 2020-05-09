package com.operacluj.registry.business.service;

import com.operacluj.registry.business.security.payload.JWTLoginSuccessResponse;
import com.operacluj.registry.business.security.payload.LoginRequest;

public interface AuthenticationService {

    JWTLoginSuccessResponse loginUser(LoginRequest loginRequest);
}
