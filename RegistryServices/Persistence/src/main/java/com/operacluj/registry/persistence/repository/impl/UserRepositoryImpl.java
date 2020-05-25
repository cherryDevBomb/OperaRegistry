package com.operacluj.registry.persistence.repository.impl;

import com.operacluj.registry.model.User;
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

    @Value("${addUser}")
    private String addUserQuery;

    @Value("${getPendingUsers}")
    private String getPendingUsersQuery;

    @Value("${confirmUser}")
    private String confirmUserQuery;

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
    public int confirmUserRegistration(int userId) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("userid", userId);
        return jdbcTemplate.update(confirmUserQuery, parameterSource);
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
