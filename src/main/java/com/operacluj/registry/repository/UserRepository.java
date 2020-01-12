package com.operacluj.registry.repository;

import com.operacluj.registry.model.User;

public interface UserRepository {

    User getUserByEmail(String email);
}

