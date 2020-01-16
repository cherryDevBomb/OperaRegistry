package com.operacluj.registry.controller;

import com.operacluj.registry.model.Document;
import com.operacluj.registry.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/document")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @GetMapping("/registry-number/{registryNumber}")
    @ResponseStatus(HttpStatus.OK)
    public Document getDocumentByRegistryNumber(@PathVariable int registryNumber) {
        return documentService.getDocumentByRegistryNumber(registryNumber);
    }
}
