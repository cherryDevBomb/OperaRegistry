package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.dto.DocumentHistoryDTO;
import com.operacluj.registry.business.domain.request.DocumentHistoryForm;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.DocumentHistory;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class DocumentHistoryTranslator {

    @Autowired
    private UserService userService;

    @Autowired
    private UserTranslator userTranslator;

    public List<DocumentHistoryDTO> translate(List<DocumentHistory> documentHistoryList) {
        return documentHistoryList.stream().map(this::translate).collect(Collectors.toList());
    }

    private DocumentHistoryDTO translate(DocumentHistory documentHistory) {
        DocumentHistoryDTO documentHistoryDTO = new DocumentHistoryDTO();
        documentHistoryDTO.setDocumentHistoryId(documentHistory.getDocumentHistoryId());
        documentHistoryDTO.setRegistryNumber(documentHistory.getRegistryNumber());

        User sender = userService.getUserById(documentHistory.getSender());
        documentHistoryDTO.setSender(userTranslator.translate(sender));
        documentHistoryDTO.setSentMessage(documentHistory.getSentMessage());

        Optional<Integer> optionalInternalRecipientId = Optional.ofNullable(documentHistory.getInternalRecipient());
        if (optionalInternalRecipientId.orElse(0) != 0) {
            User internalRecipient = userService.getUserById(optionalInternalRecipientId.get());
            documentHistoryDTO.setInternalRecipient(userTranslator.translate(internalRecipient));
        }
        else {
            documentHistoryDTO.setExternalRecipient(documentHistory.getExternalRecipient());
        }

        documentHistoryDTO.setResolved(documentHistory.isResolved());
        documentHistoryDTO.setResolvedMessage(documentHistory.getResolvedMessage());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.YYYY");
        documentHistoryDTO.setSentDate(formatter.format(documentHistory.getSentDate()));
        documentHistoryDTO.setResolvedDate(documentHistory.isResolved() ? formatter.format(documentHistory.getResolvedDate()) : null);

        return documentHistoryDTO;
    }

    public List<DocumentHistory> translate(DocumentHistoryForm documentHistoryForm, User sender) {
        return documentHistoryForm.getRecipients()
                .stream()
                .map(recipient -> {
                    DocumentHistory dh = new DocumentHistory();
                    dh.setRegistryNumber(documentHistoryForm.getRegistryNumber());
                    dh.setSender(sender.getUserId());
                    dh.setInternalRecipient(userService.getUserByEmail(recipient).getUserId());
                    dh.setSentMessage(documentHistoryForm.getSentMessage());
                    return dh;
                })
                .collect(Collectors.toList());

    }
}
