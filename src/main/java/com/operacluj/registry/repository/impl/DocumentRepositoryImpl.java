package com.operacluj.registry.repository.impl;

import com.operacluj.registry.model.Document;
import com.operacluj.registry.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;

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
        return 0;
    }

    private SqlParameterSource getSqlParameterSourceForEntity(Document document) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        if (document != null) {
            parameterSource.addValue("registrynumber", document.getRegistryNumber());
            parameterSource.addValue("creatorid", document.getCreatedBy());
            //parameterSource.addValue("createddate", document.getCreatedDate());
            parameterSource.addValue("title", document.getTitle());
            parameterSource.addValue("globalstatus", document.getGlobalStatus().getStatus());
            parameterSource.addValue("doctype", document.getDocumentType());
            parameterSource.addValue("path", document.getPath());
        }
        return parameterSource;
    }
}
