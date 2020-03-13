package com.operacluj.registry.persistence.repository;

import com.operacluj.registry.model.DocumentFile;

public interface FileRepository {

    void saveFile(byte[] byteData, int registryNumber);
    DocumentFile getFile(int registryNumber);
    int getAttachmentsNumber(int registryNumber);
}
