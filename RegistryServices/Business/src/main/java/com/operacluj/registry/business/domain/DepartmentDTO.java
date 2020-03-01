package com.operacluj.registry.business.domain;

import com.operacluj.registry.model.User;

import java.util.List;

public class DepartmentDTO {

    private String departmentName;
    private List<User> departmentUsers;

    public DepartmentDTO(String departmentName, List<User> departmentUsers) {
        this.departmentName = departmentName;
        this.departmentUsers = departmentUsers;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public List<User> getDepartmentUsers() {
        return departmentUsers;
    }

    public void setDepartmentUsers(List<User> departmentUsers) {
        this.departmentUsers = departmentUsers;
    }
}
