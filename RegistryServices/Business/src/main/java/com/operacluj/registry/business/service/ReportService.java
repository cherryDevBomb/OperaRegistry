package com.operacluj.registry.business.service;

import com.operacluj.registry.business.domain.request.SearchCriteria;
import org.springframework.core.io.ByteArrayResource;

public interface ReportService {

    String REGISTRY_NUMBER_HEADER = "Nr. înregistrare";
    String CREATED_DATE_HEADER = "Data înregistrării";
    String ORIGIN_HEADER = "Emitent";
    String TITLE_HEADER = "Titlu (conținutul pe scurt al documentului)";
    String DEPARTMENT_HEADER = "Compartimentul căruia i s-a repartizat documentul";
    String DESTINATION_HEADER = "Destinatar";
    String SEND_DATE_HEADER = "Data expedierii";
    String RESOLVED_DATE_HEADER = "Data aprobării";
    String ARCHIVING_DATE_HEADER = "Data arhivării";

    String DOCUMENT_TYPE_CRITERIA = "Tipul documentelor: ";
    String CREATED_BY_LIST_CRITERIA = "Originea documentelor: ";
    String RECIPIENT_LIST_CRITERIA = "Destinația documentelor: ";
    String ARCHIVED_CRITERIA = "Starea de arhivare: ";
    String SEARCH_STRING_CRITERIA = "Documente care conțin secvența: ";
    String DATE_CRITERIA = "Data de înregistrare: ";

    String INTERNAL_TYPE = "interne";
    String ORIGIN_EXTERNAL_TYPE = "cu origine externă";
    String DESTINATION_EXTERNAL_TYPE = "cu destinație externă";

    String ONLY_ARCHIVED = "Doar documente arhivate";
    String ONLY_NOT_ARCHIVED = "Doar documente nearhivate";

    String REPORT_TITLE_PREFIX = "Raport generat la data de ";
    String DELIMITER = ",";

    ByteArrayResource generateReport(SearchCriteria searchCriteria);
}
