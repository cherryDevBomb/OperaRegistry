package com.operacluj.registry.model;

public enum DocumentAction {
    CREATE(0),
    UPLOAD(1),
    SEND(2),
    RESOLVE(3),
    ARCHIVE(4);

    private Integer precedence;

    DocumentAction(Integer precedence) {
        this.precedence = precedence;
    }

    public Integer getPrecedence() {
        return precedence;
    }
}
