package com.operacluj.registry.persistence.repository;

public interface PaginationRepository {

    int getPageLimit();

    int getPageCountByTotalNumber(int total);

    int getAllDocumentsPageCount();
}
