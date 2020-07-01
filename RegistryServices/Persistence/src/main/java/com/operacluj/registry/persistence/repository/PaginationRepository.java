package com.operacluj.registry.persistence.repository;

public interface PaginationRepository {

    int getPageLimit();

    int getPageCountByTotalNumber(int total);

    int getAllDocumentsPageCount();

    int getAllDocumentsCreatedByPageCount(int userId, boolean archived);

    int getAllDocumentsReceivedByPageCount(int userId, boolean resolved);

    int getAllArchivedDocumentsReceivedByPageCount(int userId);
}
