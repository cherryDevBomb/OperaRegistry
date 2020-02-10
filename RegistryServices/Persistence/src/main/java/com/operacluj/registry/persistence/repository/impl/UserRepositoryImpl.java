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
import org.springframework.stereotype.Repository;


@Repository
@PropertySource("classpath:/queries.properties")
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    private RowMapper<User> userMapper;

    @Value("${getUserByEmail}")
    private String getUserByEmailQuery;

    @Override
    public User getUserByEmail(String email) {
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource("email", email);
        return jdbcTemplate.queryForObject(getUserByEmailQuery, sqlParameterSource, userMapper);
    }

    private SqlParameterSource getSqlParameterSourceForEntity(User user) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        if (user != null) {
            parameterSource.addValue("userid", user.getUserId());
            parameterSource.addValue("firstname", user.getFirstName());
            parameterSource.addValue("lastname", user.getLastName());
            parameterSource.addValue("email", user.getEmail());
            parameterSource.addValue("password", user.getPassword());
        }
        return parameterSource;
    }
}
