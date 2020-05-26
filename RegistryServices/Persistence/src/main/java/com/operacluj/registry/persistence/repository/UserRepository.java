package com.operacluj.registry.persistence.repository;

import com.operacluj.registry.model.User;
import com.operacluj.registry.model.UserRole;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface UserRepository {

    User getUserByEmail(String email);

    User getUserById(int userId);

    List<User> getAllUsers();

    List<User> getAllUsersExcept(User user);

    List<User> getAllUsersByRole(UserRole role);

    int addUser(User user);

    List<User> getPendingUsers();

    int confirmUserRegistration(int userId);
}

