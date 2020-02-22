package com.operacluj.registry.persistence.repository.impl;

import com.operacluj.registry.model.DocumentHistory;
import com.operacluj.registry.persistence.repository.DocumentHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
public class DocumentHistoryRepositoryImpl implements DocumentHistoryRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    private RowMapper<DocumentHistory> documentHistoryMapper;

    @Value("${getDocumentHistoryForDocument}")
    private String getDocumentHistoryForDocumentQuery;

    @Value("${addDocumentHistory}")
    private String addDocumentHistoryQuery;

    @Value("${updateDocumentHistoryStatus}")
    private String updateDocumentHistoryStatusQuery;

    @Override
    public List<DocumentHistory> getDocumentHistoryForDocument(int registryNumber) {
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource("registrynumber", registryNumber);
        return jdbcTemplate.query(getDocumentHistoryForDocumentQuery, sqlParameterSource, documentHistoryMapper);
    }

    @Override
    public int addDocumentHistory(DocumentHistory documentHistory) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        this.jdbcTemplate.update(addDocumentHistoryQuery, getSqlParameterSourceForEntity(documentHistory), keyHolder);
        return Objects.requireNonNull(keyHolder.getKey()).intValue();
    }

    @Override
    public void updateDocumentHistoryStatus(DocumentHistory documentHistory) {

    }

    private SqlParameterSource getSqlParameterSourceForEntity(DocumentHistory documentHistory) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        if (documentHistory != null) {
            parameterSource.addValue("registrynumber", documentHistory.getRegistryNumber());
            parameterSource.addValue("senderid", documentHistory.getSenderId());
            parameterSource.addValue("recipientid", documentHistory.getRecipientId());
            parameterSource.addValue("deadline", documentHistory.getDeadline());
            parameterSource.addValue("status", documentHistory.getStatus());

        }
        return parameterSource;
    }
}
