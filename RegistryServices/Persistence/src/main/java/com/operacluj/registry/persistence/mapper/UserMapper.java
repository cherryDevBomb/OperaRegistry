package com.operacluj.registry.persistence.mapper;

import com.operacluj.registry.model.Department;
import com.operacluj.registry.model.User;
import com.operacluj.registry.model.UserRole;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;


@Component
public class UserMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet resultSet, int i) throws SQLException {
        User user = new User();
        user.setUserId(resultSet.getInt("userid"));
        user.setFirstName(resultSet.getString("firstname"));
        user.setLastName(resultSet.getString("lastname"));
        user.setDepartment(Department.valueOf(resultSet.getString("department")));
        user.setEmail(resultSet.getString("email"));
        user.setPassword(resultSet.getString("password"));
        user.setRole(UserRole.valueOf(resultSet.getString("role")));
        return user;
    }
}
