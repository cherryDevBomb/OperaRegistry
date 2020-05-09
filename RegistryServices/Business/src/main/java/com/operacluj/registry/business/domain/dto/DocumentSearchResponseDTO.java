package com.operacluj.registry.business.domain.dto;

import java.util.List;

public class DocumentSearchResponseDTO {

    private List<DocumentDTO> documents;
    private int searchId;

    public List<DocumentDTO> getDocuments() {
        return documents;
    }

    public void setDocuments(List<DocumentDTO> documents) {
        this.documents = documents;
    }

    public int getSearchId() {
        return searchId;
    }

    public void setSearchId(int searchId) {
        this.searchId = searchId;
    }
}
