package com.operacluj.registry.business.service;

import com.operacluj.registry.business.domain.DepartmentDTO;
import com.operacluj.registry.business.domain.UserForm;
import com.operacluj.registry.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.Principal;
import java.util.List;

public interface UserService extends UserDetailsService {

    User getUserById(int id);
    User getUserByEmail(String email);
    int addUser(UserForm userForm);
    List<User> getAllUsersExceptPrincipal(Principal principal);
    List<DepartmentDTO> getAllUsersGroupedByDepartment(Principal principal);
}
