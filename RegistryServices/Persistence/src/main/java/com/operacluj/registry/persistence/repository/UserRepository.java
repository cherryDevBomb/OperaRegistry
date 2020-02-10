package com.operacluj.registry.persistence.repository;

import com.operacluj.registry.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {

    User getUserByEmail(String email);
}

