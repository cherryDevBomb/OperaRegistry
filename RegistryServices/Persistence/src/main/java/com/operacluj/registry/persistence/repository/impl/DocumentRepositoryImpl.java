package com.operacluj.registry.persistence.repository.impl;

import com.operacluj.registry.model.Document;
import com.operacluj.registry.persistence.repository.DocumentRepository;
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
public class DocumentRepositoryImpl implements DocumentRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    private RowMapper<Document> documentMapper;

    @Value("${getDocumentByRegistryNumber}")
    private String getDocumentByRegistryNumberQuery;

    @Value("${getAllDocuments}")
    private String getAllDocumentsQuery;

    @Value("${addDocument}")
    private String addDocumentQuery;

    @Value("${deleteDocument}")
    private String deleteDocumentQuery;

    @Override
    public Document getDocumentByRegistryNumber(int registryNumber) {
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource("registrynumber", registryNumber);
        return jdbcTemplate.queryForObject(getDocumentByRegistryNumberQuery, sqlParameterSource, documentMapper);
    }

    @Override
    public List<Document> getAllDocuments() {
        return jdbcTemplate.query(getAllDocumentsQuery, documentMapper);
    }

    @Override
    public int addDocument(Document document) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        this.jdbcTemplate.update(addDocumentQuery, getSqlParameterSourceForEntity(document), keyHolder);
        return Objects.requireNonNull(keyHolder.getKey()).intValue();
    }

    @Override
    public void deleteDocument(int documentId) {
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource("documentid", documentId);
        jdbcTemplate.update(deleteDocumentQuery, sqlParameterSource);
    }

    private SqlParameterSource getSqlParameterSourceForEntity(Document document) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        if (document != null) {
            parameterSource.addValue("creatorid", document.getCreatedBy());
            parameterSource.addValue("title", document.getTitle());
            parameterSource.addValue("globalstatus", document.getGlobalStatus().getStatus());
            parameterSource.addValue("doctype", document.getDocumentType());
            parameterSource.addValue("path", document.getPath());
        }
        return parameterSource;
    }


}
