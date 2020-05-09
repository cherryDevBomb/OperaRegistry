package com.operacluj.registry.business.domain.dto;

import com.operacluj.registry.model.Department;
import lombok.Data;

import java.util.List;

@Data
public class DepartmentDTO {

    private Department department;
    private String departmentName;
    private List<UserDTO> departmentUsers;
}
