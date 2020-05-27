package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.dto.UserDTO;
import com.operacluj.registry.business.domain.exception.ArgumentNotValidException;
import com.operacluj.registry.business.service.AdminService;
import com.operacluj.registry.business.service.MailService;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.model.User;
import com.operacluj.registry.persistence.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserTranslator userTranslator;

    @Autowired
    private MailService mailService;

    @Override
    public List<UserDTO> getPendingUsers() {
        log.debug("Enter getPendingUsers");
        return userRepository.getPendingUsers()
                .stream()
                .map(user -> userTranslator.translate(user))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void confirmUserRegistration(int userId) {
        log.info("Enter confirmUserRegistration for userId {}", userId);
        int updated = userRepository.confirmUserRegistration(userId);
        if (updated == 0) {
            log.error("User {} not found", userId);
            throw new ArgumentNotValidException(Collections.singletonMap("userId", ErrorMessageConstants.USER_NOT_FOUND));
        }
        User confirmedUser = userRepository.getUserById(userId);
        mailService.sendMailForRegistrationConfirmed(confirmedUser);
    }
}
