package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.domain.UserDTO;
import com.operacluj.registry.business.payload.JWTLoginSuccessResponse;
import com.operacluj.registry.business.payload.LoginRequest;
import com.operacluj.registry.business.service.AuthenticationService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


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
    public int registerUser(@RequestBody UserDTO userDTO) {
        return userService.addUser(userDTO);
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public JWTLoginSuccessResponse authenticateUser(@RequestBody LoginRequest loginRequest) {
        return authenticationService.loginUser(loginRequest);
    }

}
