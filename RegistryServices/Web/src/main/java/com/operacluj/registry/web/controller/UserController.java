package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.domain.UserFormDTO;
import com.operacluj.registry.business.payload.JWTLoginSuccessResponse;
import com.operacluj.registry.business.payload.LoginRequest;
import com.operacluj.registry.business.service.AuthenticationService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/users")
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

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public int registerUser(@RequestBody UserFormDTO userFormDTO) {
        return userService.addUser(userFormDTO);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public JWTLoginSuccessResponse authenticateUser(@RequestBody LoginRequest loginRequest) {
        return authenticationService.loginUser(loginRequest);
    }

}
