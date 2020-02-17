package com.operacluj.registry.business.service;

import com.operacluj.registry.business.domain.UserFormDTO;
import com.operacluj.registry.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User getUserById(int id);
    User getUserByEmail(String email);
    int addUser(UserFormDTO userFormDTO);
}
