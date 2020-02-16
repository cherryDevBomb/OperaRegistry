package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.service.DocumentService;
import com.operacluj.registry.model.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/documents")
@CrossOrigin
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @GetMapping("/{registryNumber}")
    @ResponseStatus(HttpStatus.OK)
    public Document getDocumentByRegistryNumber(@PathVariable int registryNumber) {
        return documentService.getDocumentByRegistryNumber(registryNumber);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Integer addDocument(@RequestBody DocumentDTO documentDTO, Principal principal) {
        return documentService.addDocument(documentDTO, principal);
    }
}
