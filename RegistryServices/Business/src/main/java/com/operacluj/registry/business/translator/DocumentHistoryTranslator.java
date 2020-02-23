package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.DocumentHistoryDTO;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.DocumentHistory;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DocumentHistoryTranslator {

    @Autowired
    private UserService userService;

    public DocumentHistoryDTO translate(DocumentHistory documentHistory) {
        DocumentHistoryDTO documentHistoryDTO = new DocumentHistoryDTO();
        documentHistoryDTO.setDocumentHistoryId(documentHistory.getDocumentHistoryId());
        documentHistoryDTO.setRegistryNumber(documentHistory.getRegistryNumber());

        User sender = userService.getUserById(documentHistory.getSender());
        documentHistoryDTO.setSender(sender);
        documentHistoryDTO.setSentMessage(documentHistory.getSentMessage());

        if (documentHistory.getInternalRecipient() != null) {
            User internalRecipient = userService.getUserById(documentHistory.getInternalRecipient());
            documentHistoryDTO.setInternalRecipient(internalRecipient);
        }
        else {
            documentHistoryDTO.setExternalRecipient(documentHistory.getExternalRecipient());
        }

        documentHistoryDTO.setResolved(documentHistory.isResolved());
        documentHistoryDTO.setResolvedMessage(documentHistory.getResolvedMessage());

        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
        documentHistoryDTO.setSentDate(formatter.format(documentHistory.getSentDate()));
        documentHistoryDTO.setResolvedDate(documentHistory.isResolved() ? formatter.format(documentHistory.getResolvedDate()) : "");

        return documentHistoryDTO;
    }

    public List<DocumentHistoryDTO> translate(List<DocumentHistory> documentHistoryList) {
        return documentHistoryList.stream().map(this::translate).collect(Collectors.toList());
    }

}
