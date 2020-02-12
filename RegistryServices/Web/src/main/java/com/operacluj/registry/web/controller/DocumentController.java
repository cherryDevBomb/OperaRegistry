package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.facade.DocumentFacade;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.business.domain.DocumentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/documents")
@CrossOrigin
public class DocumentController {

    @Autowired
    private DocumentFacade documentFacade;

    @GetMapping("/{registryNumber}")
    @ResponseStatus(HttpStatus.OK)
    public Document getDocumentByRegistryNumber(@PathVariable int registryNumber) {
        return documentFacade.getDocumentByRegistryNumber(registryNumber);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Document> getAllDocuments() {
        return documentFacade.getAllDocuments();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public int addDocument(@RequestBody DocumentDTO documentDTO) {
        return documentFacade.addNewDocument(documentDTO);
    }
}
