package com.operacluj.registry.persistence.mapper;

import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.DocumentType;
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
        document.setTitle(resultSet.getString("title"));
        document.setType(DocumentType.valueOf(resultSet.getString("type")));
        document.setCreatedBy(resultSet.getInt("createdBy"));
        document.setOrigin(resultSet.getString("origin"));
        document.setArchived(resultSet.getBoolean("archived"));
        document.setCreatedDate(resultSet.getDate("createddate").toLocalDate());
        document.setPath(resultSet.getString("path"));
        return document;
    }
}
