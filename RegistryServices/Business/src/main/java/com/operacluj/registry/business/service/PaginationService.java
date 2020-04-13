package com.operacluj.registry.business.service;

import java.security.Principal;

public interface PaginationService {

    int getPageLimit();

    int getPageCountByTotalNumber(int total);

    int getAllDocumentsPageCount();

    int getMyDocumentsPageCount(Principal principal, boolean archived);
}
