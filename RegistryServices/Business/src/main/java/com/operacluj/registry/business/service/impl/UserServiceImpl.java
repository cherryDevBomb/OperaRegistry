package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.dto.DepartmentDTO;
import com.operacluj.registry.business.domain.dto.UserDTO;
import com.operacluj.registry.business.domain.request.UserForm;
import com.operacluj.registry.business.domain.exception.CustomConstraintViolationException;
import com.operacluj.registry.business.domain.exception.EntityNotFoundException;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.business.validator.UserValidator;
import com.operacluj.registry.model.Department;
import com.operacluj.registry.model.User;
import com.operacluj.registry.persistence.repository.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger LOG = LogManager.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserValidator userValidator;

    @Autowired
    UserTranslator userTranslator;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        LOG.info("Enter loadUserByUsername {}", email);
        try {
            return userRepository.getUserByEmail(email);
        } catch (EmptyResultDataAccessException e) {
            LOG.error("User with email {} not found", email);
            throw new EntityNotFoundException(ErrorMessageConstants.USER_NOT_FOUND, e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(int userId) {
        LOG.debug("Enter getUserById {}", userId);
        try {
            return userRepository.getUserById(userId);
        } catch (EmptyResultDataAccessException e) {
            LOG.error("User with id {} not found", userId);
            throw new EntityNotFoundException(ErrorMessageConstants.USER_NOT_FOUND, e);
        }
    }

    @Override
    @Transactional
    public User getUserByEmail(String email) {
        LOG.info("Enter getUserByEmail email {}", email);
        try {
            return userRepository.getUserByEmail(email);
        } catch (EmptyResultDataAccessException e) {
            LOG.error("User with email {} not found", email);
            throw new EntityNotFoundException(ErrorMessageConstants.USER_NOT_FOUND, e);
        }
    }

    @Override
    @Transactional
    public int addUser(UserForm userForm) {
        LOG.info("Enter addUser with email {}", userForm.getEmail());
        userValidator.validate(userForm);
        User newUser = userTranslator.translate(userForm);
        try {
            return userRepository.addUser(newUser);
        } catch (DuplicateKeyException e) {
            LOG.error("User with email {} already exists", newUser.getEmail());
            throw new CustomConstraintViolationException("email", ErrorMessageConstants.USER_ALREADY_EXISTS);
        }
    }

    @Override
    public List<UserDTO> getAllUsers(boolean includePrincipal, Principal principal) {
        LOG.debug("Enter getAllUsers requested by {}", principal.getName());
        List<User> users;
        if (includePrincipal) {
            users = userRepository.getAllUsers();
        }
        else {
            User user = userTranslator.getUserFromPrincipal(principal);
            users = userRepository.getAllUsersExcept(user);
        }
        return users.stream().map(user -> userTranslator.translate(user)).collect(Collectors.toList());
    }

    @Override
    public List<DepartmentDTO> getAllUsersGroupedByDepartment(boolean includePrincipal, Principal principal) {
        LOG.debug("Enter getAllUsersGroupedByDepartment requested by {}", principal.getName());
        List<UserDTO> allUsers = getAllUsers(includePrincipal, principal);
        return getUsersGroupedByDepartment(allUsers);
    }

    @Override
    public List<DepartmentDTO> getUsersGroupedByDepartment(List<UserDTO> users) {
        LOG.info("Enter getUsersGroupedByDepartment");
        Map<String, List<UserDTO>> departmentMap = users.stream()
                .collect(Collectors.groupingBy(UserDTO::getDepartment));
        return departmentMap.keySet().stream()
                .map(department -> {
                    DepartmentDTO departmentDTO = new DepartmentDTO();
                    departmentDTO.setDepartment(Department.getDepartment(department));
                    departmentDTO.setDepartmentName(department);
                    departmentDTO.setDepartmentUsers(departmentMap.get(department));
                    return departmentDTO;
                })
                .collect(Collectors.toList());
    }
}
