package com.operacluj.registry.repository.impl;

import com.operacluj.registry.model.User;
import com.operacluj.registry.repository.UserRepository;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
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

    private static final Logger LOG = LogManager.getLogger(UserRepositoryImpl.class);

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    private RowMapper<User> userMapper;

    @Value("${getUserByEmail}")
    private String getUserByEmailQuery;

    @Override
    public User getUserByEmail(String email) {
        LOG.info("Enter getUserByEmail :email={}", email);
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource("email", email);
        return this.namedParameterJdbcTemplate.queryForObject(getUserByEmailQuery, sqlParameterSource, userMapper);
    }
}
