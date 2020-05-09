package com.operacluj.registry.business.domain.request;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

public class SearchCriteria {

    private List<String> docTypes;
    private List<Integer> createdByList;
    private List<Integer> recipientList;
    private Boolean archived;
    private String searchString;
    private String from;
    private String to;

    public List<String> getDocTypes() {
        return docTypes;
    }

    public void setDocTypes(List<String> docTypes) {
        this.docTypes = docTypes;
    }

    public List<Integer> getCreatedByList() {
        return createdByList;
    }

    public void setCreatedByList(List<Integer> createdByList) {
        this.createdByList = createdByList;
    }

    public List<Integer> getRecipientList() {
        return recipientList;
    }

    public void setRecipientList(List<Integer> recipientList) {
        this.recipientList = recipientList;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public String getSearchString() {
        return searchString;
    }

    public void setSearchString(String searchString) {
        this.searchString = searchString;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
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