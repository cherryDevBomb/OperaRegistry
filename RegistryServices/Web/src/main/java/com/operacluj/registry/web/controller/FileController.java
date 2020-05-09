package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.service.FileService;
import com.operacluj.registry.model.DocumentFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Arrays;

@RestController
@CrossOrigin
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping(value = "/{registryNumber}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void uploadFile(@RequestParam MultipartFile file, @PathVariable int registryNumber, Principal principal) {
        System.out.println("Got into upload");
        fileService.uploadFile(file, registryNumber, principal);
    }

    @GetMapping(value = "/{registryNumber}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable int registryNumber) {
        DocumentFile documentFile = fileService.getFile(registryNumber);
        byte[] encodedBytes = java.util.Base64.getEncoder().encode(documentFile.getFileData());
        ByteArrayResource byteArrayResource = new ByteArrayResource(encodedBytes);

        String dispositionHeaderValue = "attachment; filename=" + documentFile.getFilename();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setAccessControlExposeHeaders(Arrays.asList("Content-Disposition"));
        httpHeaders.setContentDisposition(ContentDisposition.builder(dispositionHeaderValue).build());
        httpHeaders.setContentLength(byteArrayResource.contentLength());
        return new ResponseEntity<>(byteArrayResource, httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/count/{registryNumber}")
    @ResponseStatus(HttpStatus.OK)
    public boolean hasAttachedFiles(@PathVariable int registryNumber) {
        return fileService.hasAttachedFiles(registryNumber);
    }
}
