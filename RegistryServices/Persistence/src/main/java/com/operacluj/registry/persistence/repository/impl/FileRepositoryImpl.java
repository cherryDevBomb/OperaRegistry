package com.operacluj.registry.persistence.repository.impl;

import com.operacluj.registry.model.DocumentFile;
import com.operacluj.registry.persistence.repository.FileRepository;
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

@Repository
@PropertySource("classpath:/queries.properties")
public class FileRepositoryImpl implements FileRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    private RowMapper<DocumentFile> documentFileMapper;

    @Value("${saveFile}")
    private String saveFileQuery;

    @Value("${getFile}")
    private String getFileQuery;

    @Value("${getAttachmentsNumber}")
    private String getAttachmentsNumberQuery;

    @Override
    public void saveFile(DocumentFile documentFile) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("file", documentFile.getFileData());
        parameterSource.addValue("registrynumber", documentFile.getRegistryNumber());
        parameterSource.addValue("filename", documentFile.getFilename());
        jdbcTemplate.update(saveFileQuery, parameterSource, keyHolder);
    }

    @Override
    public DocumentFile getFile(int registryNumber) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("registrynumber", registryNumber);
        return jdbcTemplate.queryForObject(getFileQuery, parameterSource, documentFileMapper);
    }

    @Override
    public int getAttachmentsNumber(int registryNumber) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("registrynumber", registryNumber);
        return jdbcTemplate.queryForObject(getAttachmentsNumberQuery, parameterSource, Integer.class);
    }
}
