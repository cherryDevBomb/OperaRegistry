package com.operacluj.registry.business.service;

import com.operacluj.registry.business.payload.JWTLoginSuccessResponse;
import com.operacluj.registry.business.payload.LoginRequest;

public interface AuthenticationService {

    JWTLoginSuccessResponse loginUser(LoginRequest loginRequest);
}
