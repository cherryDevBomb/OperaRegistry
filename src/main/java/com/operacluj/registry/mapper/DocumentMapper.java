package com.operacluj.registry.mapper;

import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.DocumentStatus;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;


@Component
public class DocumentMapper implements RowMapper<Document> {

    @Override
    public Document mapRow(ResultSet resultSet, int i) throws SQLException {
        Document document = new Document();
        document.setRegistryNumber(resultSet.getInt("registrynumber"));
        document.setCreatedBy(resultSet.getInt("creatorid"));
        document.setCreatedDate(resultSet.getDate("createddate").toLocalDate());
        document.setTitle(resultSet.getString("title"));
        document.setGlobalStatus(DocumentStatus.getStatusFromString(resultSet.getString("globalstatus")));
        document.setDocumentType(resultSet.getString("doctype"));
        document.setPath(resultSet.getString("path"));
        return document;
    }
}
