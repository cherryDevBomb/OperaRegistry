package com.operacluj.registry.persistence.repository;

import com.operacluj.registry.model.User;

public interface PaginationRepository {

    int getPageLimit();

    int getPageCountByTotalNumber(int total);

    int getAllDocumentsPageCount();

    int getAllDocumentsCreatedByPageCount(int userId, boolean archived);
}
