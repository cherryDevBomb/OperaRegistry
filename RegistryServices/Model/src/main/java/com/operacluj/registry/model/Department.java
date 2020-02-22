package com.operacluj.registry.model;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public enum Department {
    GENERAL_MANAGER("Manager General"),
    ECONOMY("Direcția economică"),
    ARTISTIC("Direcția artistică"),
    TECH("Direcția tehnică"),
    MARKETING("Direcția Marketing"),
    LAW("Compartimentul juridic"),
    AUDIT("Compartimentul Audit Public Intern"),
    HR("Biroul Resurse umane, Salarizare"),
    PUBLIC_ACQUISITION("Biroul Achiziții Publice"),
    ADMINISTRATION("Biroul Achiziții Publice"),
    SECRETARY("Secretariat");

    private String textValue;
    private static final Map<String, Department> lookupTable = new HashMap<>();

    Department(String textValue) {
        this.textValue = textValue;
    }

    static {
        for (Department department : Department.values()) {
            lookupTable.put(department.getTextValue(), department);
        }
    }

    /**
     * Enum to String
     *
     * @return String associated with enum value
     */
    public String getTextValue() {
        return textValue;
    }

    /**
     * String to enum
     *
     * @param department department as String
     * @return enum value associated with the string
     */
    public static Department getDepartment(String department) {
        return lookupTable.get(department);
    }

    /**
     * Get all departments
     *
     * @return list of departments represented by their text value
     */
    public List<String> getAllDepartments() {
        return EnumSet.allOf(Department.class).stream()
                .map(Department::getTextValue)
                .sorted()
                .collect(Collectors.toList());
    }
}
