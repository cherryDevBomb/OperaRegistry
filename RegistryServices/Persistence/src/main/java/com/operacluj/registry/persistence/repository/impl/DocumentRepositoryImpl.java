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
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@PropertySource("classpath:/queries.properties")
@PropertySource("classpath:/pagination.properties")
public class DocumentRepositoryImpl implements DocumentRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    private RowMapper<Document> documentMapper;

    @Value("${page_limit}")
    private int pageLimit;

    @Value("${getDocumentByRegistryNumber}")
    private String getDocumentByRegistryNumberQuery;

    @Value("${getAllDocuments}")
    private String getAllDocumentsQuery;

    @Value("${getAllDocumentsPaged}")
    private String getAllDocumentsPagedQuery;

    @Value("${getAllDocumentsCreatedBy}")
    private String getAllDocumentsCreatedByQuery;

    @Value("${addDocument}")
    private String addDocumentQuery;

    @Value("${updateDocument}")
    private String updateDocumentQuery;

    @Value("${deleteDocument}")
    private String deleteDocumentQuery;

    @Value("${getLastMatchingDocument}")
    private String getLastMatchingDocumentQuery;

    @Override
    public Document getDocumentByRegistryNumber(int registryNumber) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("registrynumber", registryNumber);
        return jdbcTemplate.queryForObject(getDocumentByRegistryNumberQuery, parameterSource, documentMapper);
    }

    @Override
    public List<Document> getAllDocuments() {
        return jdbcTemplate.query(getAllDocumentsQuery, documentMapper);
    }

    @Override
    public List<Document> getAllDocuments(int page) {
        return jdbcTemplate.query(getAllDocumentsPagedQuery, getSqlParameterSourceForPagination(page), documentMapper);
    }

    @Override
    public List<Document> getAllDocumentsCreatedBy(int userId, boolean archived, int page) {
        MapSqlParameterSource parameterSource = getSqlParameterSourceForPagination(page);
        parameterSource.addValue("createdby", userId);
        parameterSource.addValue("archived", archived);
        return jdbcTemplate.query(getAllDocumentsCreatedByQuery, parameterSource, documentMapper);
    }

    @Override
    @Transactional
    public int addDocument(Document document) {
        jdbcTemplate.update(addDocumentQuery, getSqlParameterSourceForEntity(document));
        return getLastMatchingDocument(document).getRegistryNumber();
    }

    @Override
    public void updateDocument(Document document) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("archived", document.isArchived());
        parameterSource.addValue("archivingmessage", document.getArchivingMessage());
        parameterSource.addValue("registrynumber", document.getRegistryNumber());
        jdbcTemplate.update(updateDocumentQuery, parameterSource);
    }

    @Override
    public void deleteDocument(int registryNumber) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("registrynumber", registryNumber);
        jdbcTemplate.update(deleteDocumentQuery, parameterSource);
    }

    private Document getLastMatchingDocument(Document document) {
        return jdbcTemplate.queryForObject(getLastMatchingDocumentQuery, getSqlParameterSourceForEntity(document), documentMapper);
    }

    private SqlParameterSource getSqlParameterSourceForEntity(Document document) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        if (document != null) {
            parameterSource.addValue("title", document.getTitle());
            parameterSource.addValue("type", document.getType().toString());
            parameterSource.addValue("createdby", document.getCreatedBy());
            parameterSource.addValue("origin", document.getOrigin());
        }
        return parameterSource;
    }

    private MapSqlParameterSource getSqlParameterSourceForPagination(int page) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("offset", (page - 1) * pageLimit);
        parameterSource.addValue("rowcount", pageLimit);
        return parameterSource;
    }
}
