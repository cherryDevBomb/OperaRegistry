package com.operacluj.registry.model;

import java.util.HashMap;
import java.util.Map;

public enum DocumentStatus {
    PENDING("Pending"),
    RESOLVED("Resolved");

    private String status;
    private static final Map<String, DocumentStatus> lookupTable = new HashMap<>();

    DocumentStatus(String status) {
        this.status = status;
    }

    static
    {
        for(DocumentStatus documentStatus : DocumentStatus.values())
        {
            lookupTable.put(documentStatus.getStatus(), documentStatus);
        }
    }

    /**
     * Enum to String
     *
     * @return String associated with enum value
     */
    public String getStatus() {
        return status;
    }

    /**
     * String to enum
     *
     * @param status String representing status
     * @return enum value associated with the string
     */
    public static DocumentStatus getStatusFromString(String status)
    {
        return lookupTable.get(status);
    }
}
