package com.operacluj.registry.business.domain.dto;

import lombok.Data;

@Data
public class UserDTO {

    private int userId;
    private String firstName;
    private String lastName;
    private String department;
    private String email;

    public String getFullName() {
        return firstName + " " + lastName;
    }
}
