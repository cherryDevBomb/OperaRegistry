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

    @Value("${getDocumentHistoryForDocumentSentTo}")
    private String getDocumentHistoryForDocumentSentToQuery;

    @Value("${addDocumentHistory}")
    private String addDocumentHistoryQuery;

    @Value("${updateDocumentHistoryStatus}")
    private String updateDocumentHistoryStatusQuery;

    @Override
    public List<DocumentHistory> getDocumentHistoryForDocument(int registryNumber) {
        SqlParameterSource parameterSource = new MapSqlParameterSource("registrynumber", registryNumber);
        return jdbcTemplate.query(getDocumentHistoryForDocumentQuery, parameterSource, documentHistoryMapper);
    }

    @Override
    public DocumentHistory getDocumentHistoryForDocumentSentTo(int registryNumber, int userId) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("registrynumber", registryNumber);
        parameterSource.addValue("internalrecipient", userId);
        return jdbcTemplate.queryForObject(getDocumentHistoryForDocumentSentToQuery, parameterSource, documentHistoryMapper);
    }

    @Override
    public int addDocumentHistory(DocumentHistory documentHistory) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(addDocumentHistoryQuery, getSqlParameterSourceForEntity(documentHistory), keyHolder);
        return Objects.requireNonNull(keyHolder.getKey()).intValue();
    }

    @Override
    public void updateDocumentHistoryStatus(DocumentHistory documentHistory) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("resolved", documentHistory.isResolved());
        parameterSource.addValue("resolvedmessage", documentHistory.getResolvedMessage());
        parameterSource.addValue("documenthistoryid", documentHistory.getDocumentHistoryId());
        jdbcTemplate.update(updateDocumentHistoryStatusQuery, parameterSource);
    }

    private SqlParameterSource getSqlParameterSourceForEntity(DocumentHistory documentHistory) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        if (documentHistory != null) {
            parameterSource.addValue("registrynumber", documentHistory.getRegistryNumber());
            parameterSource.addValue("sender", documentHistory.getSender());
            parameterSource.addValue("sentmessage", documentHistory.getSentMessage());
            parameterSource.addValue("internalrecipient", documentHistory.getInternalRecipient());
            parameterSource.addValue("externalrecipient", documentHistory.getExternalRecipient());
        }
        return parameterSource;
    }
}
