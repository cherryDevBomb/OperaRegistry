package com.operacluj.registry.persistence.mapper;

import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.DocumentType;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Optional;


@Component
public class DocumentMapper implements RowMapper<Document> {

    @Override
    public Document mapRow(ResultSet resultSet, int i) throws SQLException {
        Document document = new Document();
        document.setRegistryNumber(resultSet.getInt("registrynumber"));
        document.setCreatedDate(resultSet.getTimestamp("createddate").toLocalDateTime());
        document.setTitle(resultSet.getString("title"));
        document.setType(DocumentType.valueOf(resultSet.getString("type")));
        document.setCreatedBy(resultSet.getInt("createdBy"));
        document.setOrigin(resultSet.getString("origin"));
        document.setArchived(resultSet.getBoolean("archived"));
        document.setArchivingMessage(resultSet.getString("archivingmessage"));
        Optional<Timestamp> optionalArchivingDate = Optional.ofNullable(resultSet.getTimestamp("archivingdate"));
        optionalArchivingDate.ifPresent(date -> document.setArchivingDate(date.toLocalDateTime()));
        return document;
    }
}
