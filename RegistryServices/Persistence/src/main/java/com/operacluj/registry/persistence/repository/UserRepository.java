package com.operacluj.registry.persistence.repository;

import com.operacluj.registry.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository {

    User getUserByEmail(String email);

    User getUserById(int userId);

    int addUser(User user);

    List<User> getAllUsersExcept(User user);
}

