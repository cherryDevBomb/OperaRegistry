package com.operacluj.registry.business.service;

import com.operacluj.registry.business.domain.dto.UserDTO;

import java.util.List;

public interface AdminService {

    List<UserDTO> getPendingUsers();

    void confirmUserRegistration(int userId);

    void declineUserRegistration(int userId);

    void grantAdminRole(int userId);
}
