package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
        fileService.uploadFile(file, registryNumber);
    }
}
