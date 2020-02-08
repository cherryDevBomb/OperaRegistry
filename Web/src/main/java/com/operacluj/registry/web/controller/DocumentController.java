package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.facade.DocumentFacade;
import com.operacluj.registry.model.Document;
import com.operacluj.registry.business.domain.DocumentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/document")
public class DocumentController {

    @Autowired
    private DocumentFacade documentFacade;

    @GetMapping("/registry-number/{registryNumber}")
    @ResponseStatus(HttpStatus.OK)
    public Document getDocumentByRegistryNumber(@PathVariable int registryNumber) {
        return documentFacade.getDocumentByRegistryNumber(registryNumber);
    }

    @PostMapping(value="/new", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public int addDocument(@Valid @RequestBody DocumentDTO documentDTO) {
//        String email = documentDTO.getEmail();
//        String title = documentDTO.getTitle();
//        String docType = documentDTO.getDocType();
//        String path = documentDTO.getPath();
//        String recipientId = documentDTO.getRecipientId();
//        String deadline = documentDTO.getDeadline();
        return documentFacade.addNewDocument(documentDTO);
    }
}
