package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.security.payload.JWTLoginSuccessResponse;
import com.operacluj.registry.business.security.payload.LoginRequest;
import com.operacluj.registry.business.security.JwtTokenProvider;
import com.operacluj.registry.business.security.SecurityConstants;
import com.operacluj.registry.business.service.AuthenticationService;
import com.operacluj.registry.business.validator.InputValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private InputValidator inputValidator;

    @Override
    public JWTLoginSuccessResponse loginUser(LoginRequest loginRequest) {
        inputValidator.validate(loginRequest);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = SecurityConstants.TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);
        return new JWTLoginSuccessResponse(true, jwt);
    }
}
