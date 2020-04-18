package com.operacluj.registry.persistence.mapper;

import com.operacluj.registry.model.DocumentFile;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class DocumentFileMapper implements RowMapper<DocumentFile> {
    @Override
    public DocumentFile mapRow(ResultSet resultSet, int i) throws SQLException {
        DocumentFile documentFile = new DocumentFile();
        documentFile.setDocumentFileId(resultSet.getInt("documentfileid"));
        documentFile.setRegistryNumber(resultSet.getInt("registrynumber"));
        documentFile.setFileData(resultSet.getBytes("file"));
        documentFile.setUploadDate(resultSet.getDate("uploaddate").toLocalDate());
        documentFile.setUploader(resultSet.getInt("uploader"));
        documentFile.setFilename(resultSet.getString("filename"));
        return documentFile;
    }
}
