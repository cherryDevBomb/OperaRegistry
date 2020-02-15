package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.domain.UserDTO;
import com.operacluj.registry.model.User;
import com.operacluj.registry.business.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/email")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public int registerUser(@RequestBody UserDTO userDTO) {
        return userService.addUser(userDTO);
    }

}
