package com.operacluj.registry.business.domain.request;

import lombok.Data;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Data
public class SearchCriteria {

    private List<String> docTypes;
    private List<Integer> createdByList;
    private List<Integer> recipientList;
    private Boolean archived;
    private String searchString;
    private String from;
    private String to;

    public boolean isArchived() {
        return archived;
    }

    /**
     * Check if search criteria contains at least one search parameter
     *
     * @return true if at least one parameter is present, false if all are null
     */
    public boolean isPresent() {
        return !Stream.of(docTypes, createdByList, recipientList, archived, searchString, to, from)
                .allMatch(Objects::isNull);
    }
}