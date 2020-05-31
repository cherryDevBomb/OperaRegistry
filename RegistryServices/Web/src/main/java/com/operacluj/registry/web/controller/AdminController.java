package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.domain.dto.UserDTO;
import com.operacluj.registry.business.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/pending")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> getPendingUsers() {
        return adminService.getPendingUsers();
    }

    @PutMapping(path = "/confirm/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public void confirmUserRegistration(@PathVariable int userId) {
        adminService.confirmUserRegistration(userId);
    }

    @DeleteMapping(path = "/decline/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public void declineUserRegistration(@PathVariable int userId) {
        adminService.declineUserRegistration(userId);
    }

    @PutMapping(path = "/grant/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public void grantAdminRole(@PathVariable int userId) {
        adminService.grantAdminRole(userId);
    }
}
