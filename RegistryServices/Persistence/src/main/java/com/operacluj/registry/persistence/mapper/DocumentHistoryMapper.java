package com.operacluj.registry.persistence.mapper;

import com.operacluj.registry.model.DocumentHistory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Optional;

@Component
public class DocumentHistoryMapper implements RowMapper<DocumentHistory> {

    @Override
    public DocumentHistory mapRow(ResultSet resultSet, int i) throws SQLException {
        DocumentHistory documentHistory = new DocumentHistory();
        documentHistory.setDocumentHistoryId(resultSet.getInt("documenthistoryid"));
        documentHistory.setRegistryNumber(resultSet.getInt("registrynumber"));

        documentHistory.setSentDate(resultSet.getTimestamp("sentdate").toLocalDateTime());
        documentHistory.setSender(resultSet.getInt("sender"));
        documentHistory.setSentMessage(resultSet.getString("sentmessage"));

        documentHistory.setInternalRecipient(resultSet.getInt("internalrecipient"));
        documentHistory.setExternalRecipient(resultSet.getString("externalRecipient"));

        documentHistory.setResolved(resultSet.getBoolean("resolved"));
        documentHistory.setResolvedMessage(resultSet.getString("resolvedmessage"));

        Optional<Timestamp> optionalResolvedDate = Optional.ofNullable(resultSet.getTimestamp("resolveddate"));
        optionalResolvedDate.ifPresent(date -> documentHistory.setResolvedDate(date.toLocalDateTime()));

        return documentHistory;
    }
}
