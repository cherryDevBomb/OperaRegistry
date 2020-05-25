package com.operacluj.registry.persistence.repository;

import com.operacluj.registry.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository {

    User getUserByEmail(String email);

    User getUserById(int userId);

    List<User> getAllUsers();

    List<User> getAllUsersExcept(User user);

    int addUser(User user);

    int confirmUserRegistration(int userId);
}

