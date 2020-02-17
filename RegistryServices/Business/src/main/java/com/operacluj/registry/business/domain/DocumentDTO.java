package com.operacluj.registry.business.domain;

import com.operacluj.registry.model.User;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

public class DocumentDTO {

    private int registryNumber;

    private User createdBy;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdDate;

    private String title;

    private String globalStatus;

    private String documentType;

    private String path;

    private List<DocumentHistoryDTO> documentHistory;
}
