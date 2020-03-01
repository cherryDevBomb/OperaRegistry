package com.operacluj.registry.persistence.repository.impl;

import com.operacluj.registry.persistence.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:/queries.properties")
public class FileRepositoryImpl implements FileRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

//    @Autowired
//    private RowMapper<User> userMapper;

    @Value("${saveFile}")
    private String saveFileQuery;

    @Override
    public void saveFile(byte[] byteData, int registryNumber) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("file", byteData);
        parameterSource.addValue("registrynumber", registryNumber);
        jdbcTemplate.update(saveFileQuery, parameterSource, keyHolder);
//        return Objects.requireNonNull(keyHolder.getKey()).intValue();
    }
}
