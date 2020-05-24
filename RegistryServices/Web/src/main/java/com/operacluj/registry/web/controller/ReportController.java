package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.domain.exception.CustomConstraintViolationException;
import com.operacluj.registry.business.domain.request.SearchCriteria;
import com.operacluj.registry.business.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

@RestController
@CrossOrigin
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService pdfReportService;

    @Autowired
    private ReportService xlsReportService;

    private static String PDF_FORMAT = "pdf";
    private static String XLS_FORMAT = "xlsx";

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ByteArrayResource> getDocumentReport(SearchCriteria searchCriteria, @RequestParam String fileFormat) {

        String timestamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
        String dispositionHeaderValue = "attachment; filename=" + "Raport_" + timestamp + "." + fileFormat;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setAccessControlExposeHeaders(Arrays.asList("Content-Disposition"));
        httpHeaders.setContentDisposition(ContentDisposition.builder(dispositionHeaderValue).build());

        ByteArrayResource report;
        if (PDF_FORMAT.equals(fileFormat)) {
            report = pdfReportService.generateReport(searchCriteria);
            httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        }
        else if (XLS_FORMAT.equals(fileFormat)) {
            report = xlsReportService.generateReport(searchCriteria);
        }
        else {
            throw new CustomConstraintViolationException("fileFormat", "File format must be pdf or xls");
        }

        httpHeaders.setContentLength(report.contentLength());
        return new ResponseEntity<>(report, httpHeaders, HttpStatus.OK);
    }
}
