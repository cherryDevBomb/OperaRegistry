package com.operacluj.registry.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(scanBasePackages = "com.operacluj.registry")
public class RegistryServicesApplication {

    public static void main(String[] args) {
        SpringApplication.run(RegistryServicesApplication.class, args);
    }
}
