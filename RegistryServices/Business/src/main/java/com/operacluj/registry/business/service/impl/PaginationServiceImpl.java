package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.service.PaginationService;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.model.User;
import com.operacluj.registry.persistence.repository.PaginationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;

@Service
public class PaginationServiceImpl implements PaginationService {

    @Autowired
    PaginationRepository paginationRepository;

    @Autowired
    private UserTranslator userTranslator;

    @Override
    public int getPageLimit() {
        return paginationRepository.getPageLimit();
    }

    @Override
    public int getPageCountByTotalNumber(int total) {
        return paginationRepository.getPageCountByTotalNumber(total);
    }

    @Override
    @Transactional(readOnly = true)
    public int getAllDocumentsPageCount() {
        return paginationRepository.getAllDocumentsPageCount();
    }

    @Override
    @Transactional(readOnly = true)
    public int getMyDocumentsPageCount(Principal principal, boolean archived) {
        User user = userTranslator.getUserFromPrincipal(principal);
        return paginationRepository.getAllDocumentsCreatedByPageCount(user.getUserId(), archived);
    }
}
