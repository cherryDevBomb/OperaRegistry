package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.domain.DepartmentDTO;
import com.operacluj.registry.business.domain.UserForm;
import com.operacluj.registry.business.payload.JWTLoginSuccessResponse;
import com.operacluj.registry.business.payload.LoginRequest;
import com.operacluj.registry.business.service.AuthenticationService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/email")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public int registerUser(@RequestBody UserForm userForm) {
        return userService.addUser(userForm);
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public JWTLoginSuccessResponse authenticateUser(@RequestBody LoginRequest loginRequest) {
        return authenticationService.loginUser(loginRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAllUsers(@RequestParam boolean includePrincipal, Principal principal) {
        return userService.getAllUsers(includePrincipal, principal);
    }

    @GetMapping("/grouped")
    @ResponseStatus(HttpStatus.OK)
    public List<DepartmentDTO> getAllUsersGroupedByDepartment(@RequestParam boolean includePrincipal, Principal principal) {
        return userService.getAllUsersGroupedByDepartment(includePrincipal, principal);
    }
}
