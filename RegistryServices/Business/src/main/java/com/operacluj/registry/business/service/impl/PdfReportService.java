package com.operacluj.registry.business.service.impl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.operacluj.registry.business.domain.dto.DocumentDTO;
import com.operacluj.registry.business.domain.dto.DocumentHistoryDTO;
import com.operacluj.registry.business.domain.request.SearchCriteria;
import com.operacluj.registry.business.domain.exception.OperationFailedException;
import com.operacluj.registry.business.service.DocumentService;
import com.operacluj.registry.business.service.ReportService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.business.util.ErrorMessageConstants;
import com.operacluj.registry.model.DocumentType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
public class PdfReportService implements ReportService {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private UserService userService;

    private PdfPTable table;
    private Font tableFont;
    private Font headerFont;

    private static final float[] TABLE_HEADER_COLUMN_WIDTHS = new float[]{8, 8, 12, 21, 43, 8};
    private static final float[] HISTORY_HEADER_COLUMN_WIDTHS = new float[]{15, 12, 8, 8};

    @Override
    public ByteArrayResource generateReport(SearchCriteria searchCriteria) {
        List<DocumentDTO> documents = documentService.getDocumentsByCriteria(searchCriteria);
        Collections.reverse(documents);

        table = new PdfPTable(TABLE_HEADER_COLUMN_WIDTHS);
        table.setWidthPercentage(95);
        tableFont = getRegularFont(8);
        headerFont = getBoldFont(8);
        addTableHeader();
        documents.forEach(doc -> {
            addCellAlignCenter(String.valueOf(doc.getRegistryNumber()));
            addCellAlignCenter(doc.getCreatedDate());
            addCell(StringUtils.hasText(doc.getOrigin()) ? doc.getOrigin() : doc.getCreatedBy().getFullName());
            addCell(doc.getTitle());
            addNestedCell(getDocHistory(doc.getDocumentHistory()));
            addCellAlignCenter(StringUtils.hasText(doc.getArchivingDate()) ? doc.getArchivingDate() : "-");
        });

        Document pdfReport = new Document(PageSize.A4.rotate(), 12, 12, 48, 36);
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try {
            PdfWriter.getInstance(pdfReport, output);
            pdfReport.open();
            pdfReport.add(getReportTitle());
            pdfReport.add(getReportHeader(searchCriteria));
            pdfReport.add(table);
        } catch (DocumentException e) {
            log.info(ErrorMessageConstants.REPORT_GENERATION_FAILED);
            throw new OperationFailedException(ErrorMessageConstants.REPORT_GENERATION_FAILED, e);
        } finally {
            pdfReport.close();
        }

        byte[] encodedBytes = java.util.Base64.getEncoder().encode(output.toByteArray());
        return new ByteArrayResource(encodedBytes);
    }

    private Paragraph getReportTitle() {
        String timestamp = new SimpleDateFormat("dd.MM.yyyy").format(new Date());
        Font titleFont = getBoldFont(14);
        Phrase title = new Phrase(REPORT_TITLE_PREFIX + timestamp + "\n\n", titleFont);
        Paragraph titleParagraph = new Paragraph(title);
        titleParagraph.setAlignment(Element.ALIGN_CENTER);
        return titleParagraph;
    }

    private Paragraph getReportHeader(SearchCriteria searchCriteria) {
        Font font = getRegularFont(12);
        List<Phrase> criteria = new ArrayList<>();

        if (!CollectionUtils.isEmpty(searchCriteria.getDocTypes())) {
            List<String> searchedTypes = searchCriteria.getDocTypes()
                    .stream()
                    .map(type -> getTypeMapping().get(type))
                    .collect(Collectors.toList());
            String typesStr = String.join(DELIMITER, searchedTypes);
            criteria.add(new Phrase(DOCUMENT_TYPE_CRITERIA + typesStr + "\n", font));
        }

        if (!CollectionUtils.isEmpty(searchCriteria.getCreatedByList())) {
            List<String> searchedCreators = searchCriteria.getCreatedByList()
                    .stream()
                    .map(id -> userService.getUserById(id).getFullName())
                    .collect(Collectors.toList());
            String creatorsStr = String.join(DELIMITER, searchedCreators);
            criteria.add(new Phrase(CREATED_BY_LIST_CRITERIA + creatorsStr + "\n", font));
        }

        if (!CollectionUtils.isEmpty(searchCriteria.getRecipientList())) {
            List<String> searchedRecipients = searchCriteria.getRecipientList()
                    .stream()
                    .map(id -> userService.getUserById(id).getFullName())
                    .collect(Collectors.toList());
            String recipientsStr = String.join(DELIMITER, searchedRecipients);
            criteria.add(new Phrase(RECIPIENT_LIST_CRITERIA + recipientsStr + "\n", font));
        }

        if (searchCriteria.getArchived() != null) {
            String searchedArchived = searchCriteria.getArchived() ? ONLY_ARCHIVED : ONLY_NOT_ARCHIVED;
            criteria.add(new Phrase(ARCHIVED_CRITERIA + searchedArchived + "\n", font));
        }

        if (StringUtils.hasText(searchCriteria.getSearchString())) {
            criteria.add(new Phrase(SEARCH_STRING_CRITERIA + searchCriteria.getSearchString() + "\n", font));
        }

        if (searchCriteria.getFrom() != null && searchCriteria.getTo() != null) {
            criteria.add(new Phrase(DATE_CRITERIA + searchCriteria.getFrom() + " - " + searchCriteria.getTo() + "\n", font));
        }

        criteria.add(new Phrase("\n"));

        Paragraph headerParagraph = new Paragraph();
        headerParagraph.setAlignment(Element.ALIGN_CENTER);
        headerParagraph.addAll(criteria);
        return headerParagraph;
    }

    private void addTableHeader() {
        addHeaderCell(REGISTRY_NUMBER_HEADER);
        addHeaderCell(CREATED_DATE_HEADER);
        addHeaderCell(ORIGIN_HEADER);
        addHeaderCell(TITLE_HEADER);

        PdfPTable historyHeader = new PdfPTable(HISTORY_HEADER_COLUMN_WIDTHS);
        historyHeader.setWidthPercentage(100);
        addHeaderCell(DEPARTMENT_HEADER, historyHeader);
        addHeaderCell(DESTINATION_HEADER, historyHeader);
        addHeaderCell(SEND_DATE_HEADER, historyHeader);
        addHeaderCell(RESOLVED_DATE_HEADER, historyHeader);
        addNestedCell(historyHeader);

        addHeaderCell(ARCHIVING_DATE_HEADER);
    }

    private PdfPTable getDocHistory(List<DocumentHistoryDTO> history) {
        PdfPTable historyTable = new PdfPTable(HISTORY_HEADER_COLUMN_WIDTHS);
        historyTable.setWidthPercentage(100);

        history.forEach(entry -> {
            if (StringUtils.hasText(entry.getExternalRecipient())) {
                addCell("", historyTable);
                addCell(entry.getExternalRecipient(), historyTable);
            }
            else if (entry.getInternalRecipient() != null) {
                addCell(entry.getInternalRecipient().getDepartment(), historyTable);
                addCell(entry.getInternalRecipient().getFullName(), historyTable);
            }
            else {
                return;
            }
            addCellAlignCenter(entry.getSentDate(), historyTable);
            addCellAlignCenter(StringUtils.hasText(entry.getResolvedDate()) ? entry.getResolvedDate() : "-", historyTable);
        });

        return historyTable;
    }

    private void addCell(String cellContent) {
        addCell(cellContent, table);
    }

    private void addCellAlignCenter(String cellContent) {
        addCellAlignCenter(cellContent, table);
    }

    private void addCell(String cellContent, PdfPTable table) {
        addCell(cellContent, table, tableFont);
    }

    private void addCellAlignCenter(String cellContent, PdfPTable table) {
        addCellAlignCenter(cellContent, table, tableFont);
    }

    private void addHeaderCell(String cellContent) {
        addHeaderCell(cellContent, table);
    }

    private void addHeaderCell(String cellContent, PdfPTable table) {
        addCellAlignCenter(cellContent, table, headerFont);
    }

    private void addCell(String cellContent, PdfPTable table, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(cellContent, font));
        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.addCell(cell);
    }

    private void addCellAlignCenter(String cellContent, PdfPTable table, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(cellContent, font));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.addCell(cell);
    }

    private void addNestedCell(Element cellContent) {
        PdfPCell cell = new PdfPCell();
        cell.setPadding(0);
        cell.addElement(cellContent);
        table.addCell(cell);
    }

    private Font getRegularFont(int size) {
        Font font;
        try {
            BaseFont baseFont = BaseFont.createFont("Aileron-Regular.otf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            font = new Font(baseFont, size);
        } catch (Exception e) {
            font = FontFactory.getFont(BaseFont.HELVETICA, BaseFont.CP1250, 8);
        }
        return font;
    }

    private Font getBoldFont(int size) {
        Font font;
        try {
            BaseFont baseFont = BaseFont.createFont("Aileron-Bold.otf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            font = new Font(baseFont, size);
        } catch (Exception e) {
            font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, BaseFont.CP1250, 8);
        }
        return font;
    }

    private Map<String, String> getTypeMapping() {
        return Stream.of(
                new AbstractMap.SimpleImmutableEntry<>(DocumentType.INTERNAL.toString(), INTERNAL_TYPE),
                new AbstractMap.SimpleImmutableEntry<>(DocumentType.ORIGIN_EXTERNAL.toString(), ORIGIN_EXTERNAL_TYPE),
                new AbstractMap.SimpleImmutableEntry<>(DocumentType.DESTINATION_EXTERNAL.toString(), DESTINATION_EXTERNAL_TYPE))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }
}
