package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.domain.DocumentDTO;
import com.operacluj.registry.business.domain.DocumentForm;
import com.operacluj.registry.business.domain.SearchCriteria;
import com.operacluj.registry.business.service.DocumentService;
import com.operacluj.registry.business.service.PaginationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private PaginationService paginationService;

    @GetMapping("/{registryNumber}")
    @ResponseStatus(HttpStatus.OK)
    public DocumentDTO getDocumentByRegistryNumber(@PathVariable int registryNumber) {
        return documentService.getDocumentByRegistryNumber(registryNumber);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<DocumentDTO> getDocuments(SearchCriteria searchCriteria, @RequestParam int page) {
        if (searchCriteria.isPresent()) {
            return documentService.getDocumentsByCriteria(searchCriteria, page);
        }
        return documentService.getAllDocuments(page);
    }

    @GetMapping("/my-documents")
    @ResponseStatus(HttpStatus.OK)
    public List<DocumentDTO> getAllDocumentsByCreator(Principal principal, @RequestParam boolean archived) {
        return documentService.getAllDocumentsCreatedBy(principal, archived);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Integer addDocument(@RequestBody DocumentForm documentForm, Principal principal) {
        return documentService.addDocument(documentForm, principal);
    }

    @PutMapping("/{registryNumber}/archive")
    @ResponseStatus(HttpStatus.OK)
    public void archiveDocument(@PathVariable int registryNumber, Principal principal) {
        documentService.archiveDocument(registryNumber, principal);
    }

    @DeleteMapping("/{registryNumber}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteDocumentByRegistryNumber(@PathVariable int registryNumber, Principal principal) {
        documentService.deleteDocument(registryNumber, principal);
    }

    @GetMapping("/page-count")
    @ResponseStatus(HttpStatus.OK)
    public Integer getDocumentsPageCount(SearchCriteria searchCriteria) {
        if (searchCriteria.isPresent()) {
            return paginationService.getPageCountByTotalNumber(documentService.getDocumentsByCriteria(searchCriteria).size());
        }
        return paginationService.getAllDocumentsPageCount();
    }
}
