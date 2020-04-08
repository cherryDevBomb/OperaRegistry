package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.service.PaginationService;
import com.operacluj.registry.persistence.repository.PaginationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaginationServiceImpl implements PaginationService {

    @Autowired
    PaginationRepository paginationRepository;

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
}
