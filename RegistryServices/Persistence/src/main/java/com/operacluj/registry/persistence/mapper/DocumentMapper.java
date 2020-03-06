package com.operacluj.registry.persistence.mapper;

import com.operacluj.registry.model.Document;
import com.operacluj.registry.model.DocumentType;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;


@Component
public class DocumentMapper implements RowMapper<Document> {

    @Override
    public Document mapRow(ResultSet resultSet, int i) throws SQLException {
        Document document = new Document();
        document.setRegistryNumber(resultSet.getInt("registrynumber"));
        document.setCreatedDate(resultSet.getDate("createddate").toLocalDate());
        document.setTitle(resultSet.getString("title"));
        document.setType(DocumentType.valueOf(resultSet.getString("type")));
        document.setCreatedBy(resultSet.getInt("createdBy"));
        document.setOrigin(resultSet.getString("origin"));
        document.setArchived(resultSet.getBoolean("archived"));
        document.setArchivingMessage(resultSet.getString("archivingmessage"));
        Optional<Date> optionalArchivingDate = Optional.ofNullable(resultSet.getDate("archivingdate"));
        optionalArchivingDate.ifPresent(date -> document.setArchivingDate(date.toLocalDate()));
        return document;
    }
}
