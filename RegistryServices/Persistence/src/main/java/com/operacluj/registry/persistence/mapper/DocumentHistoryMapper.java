package com.operacluj.registry.persistence.mapper;

import com.operacluj.registry.model.DocumentHistory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class DocumentHistoryMapper implements RowMapper<DocumentHistory> {

    @Override
    public DocumentHistory mapRow(ResultSet resultSet, int i) throws SQLException {
        DocumentHistory documentHistory = new DocumentHistory();
        documentHistory.setDocumentHistoryId(resultSet.getInt("documenthistoryid"));
        documentHistory.setRegistryNumber(resultSet.getInt("registrynumber"));
        documentHistory.setSenderId(resultSet.getInt("senderid"));
        documentHistory.setRecipientId(resultSet.getInt("recipientId"));
        documentHistory.setExpeditedDate(resultSet.getDate("expediteddate").toLocalDate());
        documentHistory.setDeadline(resultSet.getDate("deadline").toLocalDate());
        documentHistory.setSolvedDate(resultSet.getDate("solveddate").toLocalDate());
        return documentHistory;
    }
}
