package com.operacluj.registry.business.service;

import com.operacluj.registry.model.DocumentHistory;

public interface MailService {

    void sendMailForReceivedDocument(DocumentHistory documentHistory, String documentTitle);

    void sendMailForResolvedDocument(DocumentHistory documentHistory, String documentTitle);
}
