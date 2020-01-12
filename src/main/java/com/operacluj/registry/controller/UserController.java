package com.operacluj.registry.controller;

import com.operacluj.registry.model.User;
import com.operacluj.registry.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {



    @Autowired
    private UserService userService;

    @GetMapping("/email")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }
}
