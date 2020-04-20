package com.operacluj.registry.business.domain.dto;

import com.operacluj.registry.model.Department;
import com.operacluj.registry.model.User;

import java.util.List;

public class DepartmentDTO {

    private Department department;
    private String departmentName;
    private List<User> departmentUsers;

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
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
