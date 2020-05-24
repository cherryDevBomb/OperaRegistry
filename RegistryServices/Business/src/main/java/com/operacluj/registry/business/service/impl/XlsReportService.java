package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.dto.DocumentDTO;
import com.operacluj.registry.business.domain.dto.DocumentHistoryDTO;
import com.operacluj.registry.business.domain.exception.OperationFailedException;
import com.operacluj.registry.business.domain.request.SearchCriteria;
import com.operacluj.registry.business.service.DocumentService;
import com.operacluj.registry.business.service.ReportService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.IntStream;

@Service
@Slf4j
public class XlsReportService implements ReportService {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private UserService userService;

    private Workbook workbook;
    private CellStyle headerCellStyle;
    private CellStyle cellStyle;

    private final List<String> headerTitles = Arrays.asList(
            REGISTRY_NUMBER_HEADER,
            CREATED_DATE_HEADER,
            ORIGIN_HEADER,
            TITLE_HEADER,
            DEPARTMENT_HEADER,
            DESTINATION_HEADER,
            SEND_DATE_HEADER,
            RESOLVED_DATE_HEADER,
            ARCHIVING_DATE_HEADER
    );

    private static final String CRITERIA_SHEET_TITLE = "Criterii de căutare";

    @Override
    public ByteArrayResource generateReport(SearchCriteria searchCriteria) {
        workbook = new XSSFWorkbook();
        headerCellStyle = createHeaderStyle();
        cellStyle = createCellStyle();

        String timestamp = new SimpleDateFormat("dd.MM.yyyy").format(new Date());
        String sheetTitle = REPORT_TITLE_PREFIX + timestamp;
        Sheet sheet = workbook.createSheet(sheetTitle);

        addHeader(sheet);
        List<DocumentDTO> documents = documentService.getDocumentsByCriteria(searchCriteria);
        Collections.reverse(documents);
        addDocumentTable(sheet, documents);
        IntStream.rangeClosed(0, headerTitles.size()).forEach(sheet::autoSizeColumn);

        Sheet criteriaSheet = workbook.createSheet(CRITERIA_SHEET_TITLE);
        addCriteriaInformation(criteriaSheet, searchCriteria);


        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try {
            workbook.write(output);
        } catch (IOException e) {
            log.error(ErrorMessageConstants.REPORT_GENERATION_FAILED);
            throw new OperationFailedException(ErrorMessageConstants.REPORT_GENERATION_FAILED, e);
        }

        byte[] encodedBytes = java.util.Base64.getEncoder().encode(output.toByteArray());
        return new ByteArrayResource(encodedBytes);
    }

    private void addHeader(Sheet sheet) {
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headerTitles.size(); ++i) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headerTitles.get(i));
            headerCell.setCellStyle(headerCellStyle);
        }
    }

    private void addDocumentTable(Sheet sheet, List<DocumentDTO> documents) {
        AtomicInteger rowIndex = new AtomicInteger(1);
        documents.forEach(doc -> {
            Row row = sheet.createRow(rowIndex.getAndIncrement());

            addCell(row, 0, String.valueOf(doc.getRegistryNumber()));
            addCell(row, 1, doc.getCreatedDate());
            addCell(row, 2, StringUtils.hasText(doc.getOrigin()) ? doc.getOrigin() : doc.getCreatedBy().getFullName());
            addCell(row, 3, doc.getTitle());

            List<DocumentHistoryDTO> history = doc.getDocumentHistory();
            history.forEach(entry -> {
                Row entryRow = (history.indexOf(entry) != 0) ? sheet.createRow(rowIndex.getAndIncrement()) : row;

                if (StringUtils.hasText(entry.getExternalRecipient())) {
                    addCell(entryRow, 5, entry.getExternalRecipient());
                }
                else if (entry.getInternalRecipient() != null) {
                    addCell(entryRow, 4, entry.getInternalRecipient().getDepartment());
                    addCell(entryRow, 5, entry.getInternalRecipient().getFullName());
                }
                else {
                    return;
                }
                addCell(entryRow, 6, entry.getSentDate());
                addCell(entryRow, 7, StringUtils.hasText(entry.getResolvedDate()) ? entry.getResolvedDate() : "-");

            });
            addCell(row, 8, StringUtils.hasText(doc.getArchivingDate()) ? doc.getArchivingDate() : "-");

            //merge cells for documents with more than one recipient
            if (history.size() > 1) {
                List<Integer> columnsToMerge = Arrays.asList(0, 1, 2, 3, 8);
                columnsToMerge.forEach(colNumber -> sheet.addMergedRegion(new CellRangeAddress(row.getRowNum(), rowIndex.get() - 1, colNumber, colNumber)));
            }
        });
    }

    private void addCriteriaInformation(Sheet criteriaSheet, SearchCriteria searchCriteria) {
        int rowIndex = 0;
        if (!CollectionUtils.isEmpty(searchCriteria.getDocTypes())) {
            Row typesRow = criteriaSheet.createRow(rowIndex++);
            addCell(typesRow, 0, DOCUMENT_TYPE_CRITERIA);
            AtomicInteger typeIndex = new AtomicInteger(1);
            searchCriteria.getDocTypes()
                    .stream()
                    .map(type -> getTypeMapping().get(type))
                    .forEach(type -> addCell(typesRow, typeIndex.getAndIncrement(), type));
        }

        if (!CollectionUtils.isEmpty(searchCriteria.getCreatedByList())) {
            Row creatorsRow = criteriaSheet.createRow(rowIndex++);
            addCell(creatorsRow, 0, CREATED_BY_LIST_CRITERIA);
            AtomicInteger creatorIndex = new AtomicInteger(1);
            searchCriteria.getCreatedByList()
                    .stream()
                    .map(id -> userService.getUserById(id).getFullName())
                    .forEach(creator -> addCell(creatorsRow, creatorIndex.getAndIncrement(), creator));
        }

        if (!CollectionUtils.isEmpty(searchCriteria.getRecipientList())) {
            Row recipientsRow = criteriaSheet.createRow(rowIndex++);
            addCell(recipientsRow, 0, RECIPIENT_LIST_CRITERIA);
            AtomicInteger recipientIndex = new AtomicInteger(1);
            searchCriteria.getRecipientList()
                    .stream()
                    .map(id -> userService.getUserById(id).getFullName())
                    .forEach(recipient -> addCell(recipientsRow, recipientIndex.getAndIncrement(), recipient));
        }

        if (searchCriteria.getArchived() != null) {
            String searchedArchived = searchCriteria.getArchived() ? ONLY_ARCHIVED : ONLY_NOT_ARCHIVED;
            Row archivedRow = criteriaSheet.createRow(rowIndex++);
            addCell(archivedRow, 0, ARCHIVED_CRITERIA);
            addCell(archivedRow, 1, searchedArchived);
        }

        if (StringUtils.hasText(searchCriteria.getSearchString())) {
            Row searchStringRow = criteriaSheet.createRow(rowIndex++);
            addCell(searchStringRow, 0, SEARCH_STRING_CRITERIA);
            addCell(searchStringRow, 1, searchCriteria.getSearchString());
        }

        if (searchCriteria.getFrom() != null && searchCriteria.getTo() != null) {
            Row dateRow = criteriaSheet.createRow(rowIndex++);
            addCell(dateRow, 0, DATE_CRITERIA);
            addCell(dateRow, 1, searchCriteria.getFrom() + " - " + searchCriteria.getTo());
        }

        int numberOfColumns = IntStream.range(0, criteriaSheet.getPhysicalNumberOfRows())
                .map(row -> criteriaSheet.getRow(row).getLastCellNum())
                .max()
                .orElse(0);

        IntStream.rangeClosed(0, numberOfColumns).forEach(criteriaSheet::autoSizeColumn);
    }

    private void addCell(Row row, int index, String cellContent) {
        Cell cell = row.createCell(index);
        cell.setCellValue(cellContent);
        cell.setCellStyle(cellStyle);
    }

    private CellStyle createHeaderStyle() {
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 12);

        CellStyle headerCellStyle = workbook.createCellStyle();
        headerCellStyle.setFont(headerFont);
        headerCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        return headerCellStyle;
    }

    private CellStyle createCellStyle() {
        Font font = workbook.createFont();
        font.setFontHeightInPoints((short) 12);

        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFont(font);
        cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        return cellStyle;
    }
}
