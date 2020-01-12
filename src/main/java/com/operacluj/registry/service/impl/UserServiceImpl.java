package com.operacluj.registry.service.impl;

import com.operacluj.registry.model.User;
import com.operacluj.registry.repository.UserRepository;
import com.operacluj.registry.service.UserService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger LOG = LogManager.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        try {
            return userRepository.getUserByEmail(email);
        } catch (EmptyResultDataAccessException e) {
            LOG.error("User with email {} not found", email);
            //throw new ResourceNotFoundException("Failed to get user with email: " + email, e);
            return null;
        }
    }
}
