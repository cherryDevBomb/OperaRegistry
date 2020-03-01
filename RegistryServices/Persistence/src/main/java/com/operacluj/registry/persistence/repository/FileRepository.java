package com.operacluj.registry.persistence.repository;

public interface FileRepository {

    void saveFile(byte[] byteData, int registryNumber);
}
