package com.operacluj.registry.business.service;

public interface PaginationService {

    int getPageLimit();

    int getPageCountByTotalNumber(int total);

    int getAllDocumentsPageCount();
}
