package com.operacluj.registry.business.service;

import com.operacluj.registry.business.domain.dto.DepartmentDTO;
import com.operacluj.registry.business.domain.dto.UserDTO;
import com.operacluj.registry.business.domain.request.UserForm;
import com.operacluj.registry.model.User;
import com.operacluj.registry.model.UserRole;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.Principal;
import java.util.List;

public interface UserService extends UserDetailsService {

    User getUserById(int id);

    User getUserByEmail(String email);

    List<UserDTO> getAllUsers(boolean includePrincipal, Principal principal);

    List<UserDTO> getUsersByRole(UserRole role);

    List<DepartmentDTO> getAllUsersGroupedByDepartment(boolean includePrincipal, Principal principal);

    List<DepartmentDTO> getUsersByRoleGroupedByDepartment(UserRole role);

    List<DepartmentDTO> getUsersGroupedByDepartment(List<UserDTO> users);

    int addUser(UserForm userForm);

    List<String> getAllDepartments();
}
