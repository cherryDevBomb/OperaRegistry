package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.service.FileService;
import com.operacluj.registry.model.DocumentFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping(value = "/{registryNumber}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void uploadFile(@RequestParam MultipartFile file, @PathVariable int registryNumber) {
        System.out.println(file.getContentType());
        fileService.uploadFile(file, registryNumber);
    }

    @GetMapping(value = "/{registryNumber}", produces = MediaType.APPLICATION_PDF_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable int registryNumber) {
        DocumentFile documentFile = fileService.getFile(registryNumber);
        byte[] encodedBytes = java.util.Base64.getEncoder().encode(documentFile.getFileData());
        ByteArrayResource byteArrayResource = new ByteArrayResource(encodedBytes);

        String dispositionHeaderValue = "attachment; filename=" + "doc.pdf";
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentLength(byteArrayResource.contentLength());
        httpHeaders.setContentDisposition(ContentDisposition.builder(dispositionHeaderValue).build());
        String filename = "Document_nr_" + registryNumber + ".pdf";
        return new ResponseEntity<>(byteArrayResource, httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/count/{registryNumber}")
    @ResponseStatus(HttpStatus.OK)
    public boolean hasAttachedFiles(@PathVariable int registryNumber) {
        return fileService.hasAttachedFiles(registryNumber);
    }
}
