package com.operacluj.registry.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootApplication(scanBasePackages = "com.operacluj.registry")
public class RegistryServicesApplication {

    public static void main(String[] args) {
        SpringApplication.run(RegistryServicesApplication.class, args);
    }
}
