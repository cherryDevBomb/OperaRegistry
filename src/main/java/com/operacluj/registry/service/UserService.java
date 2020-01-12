package com.operacluj.registry.service;

import com.operacluj.registry.model.User;

public interface UserService {

    User getUserByEmail(String email);
}
