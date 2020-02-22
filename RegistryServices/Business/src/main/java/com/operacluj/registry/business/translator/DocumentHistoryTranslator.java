package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.DocumentForm;
import com.operacluj.registry.business.domain.DocumentHistoryDTO;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.DocumentHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DocumentHistoryTranslator {

    public DocumentHistoryDTO translate(DocumentHistory documentHistory) {
        DocumentHistoryDTO documentHistoryDTO = new DocumentHistoryDTO();
        return documentHistoryDTO;
    }

    public List<DocumentHistoryDTO> translate(List<DocumentHistory> documentHistoryList) {
        return documentHistoryList.stream().map(this::translate).collect(Collectors.toList());
    }

}
