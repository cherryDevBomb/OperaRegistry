package com.operacluj.registry.web.controller;

import com.operacluj.registry.business.domain.dto.DocumentDTO;
import com.operacluj.registry.business.domain.dto.DocumentSearchResponseDTO;
import com.operacluj.registry.business.domain.request.DocumentForm;
import com.operacluj.registry.business.domain.request.DocumentHistoryForm;
import com.operacluj.registry.business.domain.request.SearchCriteria;
import com.operacluj.registry.business.service.DocumentHistoryService;
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
    DocumentHistoryService documentHistoryService;

    @Autowired
    private PaginationService paginationService;

    @GetMapping("/{registryNumber}")
    @ResponseStatus(HttpStatus.OK)
    public DocumentDTO getDocumentByRegistryNumber(@PathVariable int registryNumber) {
        return documentService.getDocumentByRegistryNumber(registryNumber);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public DocumentSearchResponseDTO getDocuments(SearchCriteria searchCriteria, @RequestParam int page, int searchId) {
        return documentService.getDocumentSearchResult(searchCriteria, page, searchId);
    }

    @GetMapping("/created")
    @ResponseStatus(HttpStatus.OK)
    public List<DocumentDTO> getAllDocumentsByCreator(Principal principal, @RequestParam boolean archived, @RequestParam int page) {
        return documentService.getAllDocumentsCreatedBy(principal, archived, page);
    }

    @GetMapping("/received")
    @ResponseStatus(HttpStatus.OK)
    public List<DocumentDTO> getAllDocumentsByReceiver(Principal principal, @RequestParam boolean resolved, @RequestParam int page) {
        return documentService.getAllDocumentsReceivedBy(principal, resolved, page);
    }

    @GetMapping("/received/archived")
    @ResponseStatus(HttpStatus.OK)
    public List<DocumentDTO> getAllArchivedDocumentsByReceiver(Principal principal, @RequestParam int page) {
        return documentService.getAllArchivedDocumentsReceivedBy(principal, page);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Integer addDocument(@RequestBody DocumentForm documentForm, Principal principal) {
        return documentService.addDocument(documentForm, principal);
    }

    @PutMapping("/{registryNumber}/archive")
    @ResponseStatus(HttpStatus.OK)
    public void archiveDocument(@PathVariable int registryNumber, @RequestParam String archivingMessage, Principal principal) {
        documentService.archiveDocument(registryNumber, archivingMessage, principal);
    }

    @PutMapping("/{registryNumber}/resolve")
    @ResponseStatus(HttpStatus.OK)
    public void resolveDocument(@PathVariable int registryNumber, @RequestParam String resolvedMessage, Principal principal) {
        documentHistoryService.resolveDocument(registryNumber, resolvedMessage, principal);
    }

    @PostMapping("/{registryNumber}")
    @ResponseStatus(HttpStatus.OK)
    public void resendDocument(@PathVariable int registryNumber, @RequestBody DocumentHistoryForm documentHistoryForm, Principal principal) {
        documentHistoryService.addDocumentHistory(registryNumber, documentHistoryForm, principal);
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

    @GetMapping("/created/page-count")
    @ResponseStatus(HttpStatus.OK)
    public Integer getMyDocumentsPageCount(Principal principal, @RequestParam boolean archived) {
        return paginationService.getMyDocumentsPageCount(principal, archived);
    }

    @GetMapping("/received/page-count")
    @ResponseStatus(HttpStatus.OK)
    public Integer getReceivedDocumentsPageCount(Principal principal, @RequestParam boolean resolved) {
        return paginationService.getReceivedDocumentsPageCount(principal, resolved);
    }

    @GetMapping("/received/archived/page-count")
    @ResponseStatus(HttpStatus.OK)
    public Integer getArchivedReceivedDocumentsPageCount(Principal principal) {
        return paginationService.getArchivedReceivedDocumentsPageCount(principal);
    }
}
