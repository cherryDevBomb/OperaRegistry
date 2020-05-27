package com.operacluj.registry.persistence.repository.impl;

import com.operacluj.registry.model.User;
import com.operacluj.registry.model.UserRole;
import com.operacluj.registry.persistence.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;


@Repository
@PropertySource("classpath:/queries.properties")
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    private RowMapper<User> userMapper;

    @Value("${getUserByEmail}")
    private String getUserByEmailQuery;

    @Value("${getUserById}")
    private String getUserByIdQuery;

    @Value("${getAllUsersExcept}")
    private String getAllUsersExceptQuery;

    @Value("${getAllUsers}")
    private String getAllUsersQuery;

    @Value("${getAllUsersByRole}")
    private String getAllUsersByRoleQuery;

    @Value("${addUser}")
    private String addUserQuery;

    @Value("${getPendingUsers}")
    private String getPendingUsersQuery;

    @Value("${getPendingUserById}")
    private String getPendingUserByIdQuery;

    @Value("${confirmUser}")
    private String confirmUserQuery;

    @Value("${deleteUser}")
    private String deleteUserQuery;

    @Override
    public User getUserByEmail(String email) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("email", email);
        return jdbcTemplate.queryForObject(getUserByEmailQuery, parameterSource, userMapper);
    }

    @Override
    public User getUserById(int userId) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("userid", userId);
        return jdbcTemplate.queryForObject(getUserByIdQuery, parameterSource, userMapper);
    }

    @Override
    public List<User> getAllUsers() {
        return jdbcTemplate.query(getAllUsersQuery, userMapper);
    }

    @Override
    public List<User> getAllUsersExcept(User user) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("userid", user.getUserId());
        return jdbcTemplate.query(getAllUsersExceptQuery, parameterSource, userMapper);
    }

    @Override
    public List<User> getAllUsersByRole(UserRole role) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("role", role.toString());
        return jdbcTemplate.query(getAllUsersByRoleQuery, parameterSource, userMapper);
    }

    @Override
    public int addUser(User user) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(addUserQuery, getSqlParameterSourceForEntity(user), keyHolder);
        return Objects.requireNonNull(keyHolder.getKey()).intValue();
    }

    @Override
    public List<User> getPendingUsers() {
        return jdbcTemplate.query(getPendingUsersQuery, userMapper);
    }

    @Override
    public User getPendingUserById(int userId) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("userid", userId);
        return jdbcTemplate.queryForObject(getPendingUserByIdQuery, parameterSource, userMapper);
    }

    @Override
    public int confirmUserRegistration(int userId) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("userid", userId);
        return jdbcTemplate.update(confirmUserQuery, parameterSource);
    }

    @Override
    public int deleteUserById(int userId) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("userid", userId);
        return jdbcTemplate.update(deleteUserQuery, parameterSource);
    }

    private SqlParameterSource getSqlParameterSourceForEntity(User user) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        if (user != null) {
            parameterSource.addValue("firstname", user.getFirstName());
            parameterSource.addValue("lastname", user.getLastName());
            parameterSource.addValue("department", user.getDepartment().toString());
            parameterSource.addValue("email", user.getEmail());
            parameterSource.addValue("password", user.getPassword());
        }
        return parameterSource;
    }
}
