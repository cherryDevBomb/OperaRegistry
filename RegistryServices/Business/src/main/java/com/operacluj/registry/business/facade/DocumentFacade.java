//package com.operacluj.registry.business.facade;
//
//import com.operacluj.registry.business.domain.DocumentDTO;
//import com.operacluj.registry.business.service.DocumentService;
//import com.operacluj.registry.business.service.UserService;
//import com.operacluj.registry.business.translator.DocumentTranslator;
//import com.operacluj.registry.business.validator.InputValidator;
//import com.operacluj.registry.model.Document;
//import com.operacluj.registry.model.DocumentStatus;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import java.security.Principal;
//import java.util.List;
//
//@Component
//public class DocumentFacade {
//
//    @Autowired
//    private DocumentService documentService;
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    InputValidator inputValidator;
//
//    @Autowired
//    private DocumentTranslator documentTranslator;
//
//    public Document getDocumentByRegistryNumber(int registryNumber) {
//        return documentService.getDocumentByRegistryNumber(registryNumber);
//    }
//
//    public List<Document> getAllDocuments() {
//        return documentService.getAllDocuments();
//    }
//
//    public int addNewDocument(DocumentDTO documentDTO, String principalEmail) {
//    //String email, String title, String docType, String path, String recipientId, String deadline)
//        inputValidator.validate(documentDTO);
//        Document newDocument = documentTranslator.translate(documentDTO);
//        newDocument.setGlobalStatus(DocumentStatus.PENDING);
//        int registryNumber = documentService.addDocument(newDocument);
//
//        //TODO add an entry to documenthistory containing recipient & deadline
//
//        return registryNumber;
//    }
//
//}
