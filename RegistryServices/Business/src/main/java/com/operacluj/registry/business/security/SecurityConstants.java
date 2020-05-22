package com.operacluj.registry.business.security;

public class SecurityConstants {

    public static final String SIGN_UP_URL = "/users/register";
    public static final String SIGN_IN_URL = "/users/login";

    public static final String SECRET = "SecretKeyToGenerateJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 5_000_000;
}
