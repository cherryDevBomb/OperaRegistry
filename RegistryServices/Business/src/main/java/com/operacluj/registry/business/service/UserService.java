package com.operacluj.registry.business.service;

import com.operacluj.registry.model.User;

public interface UserService {

    User getUserByEmail(String email);
}
