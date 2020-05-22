package com.operacluj.registry.business.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class DocumentSearchResponseDTO {

    private List<DocumentDTO> documents;
    private int searchId;
}
