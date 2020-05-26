package com.operacluj.registry.business.service;

import com.operacluj.registry.model.DocumentHistory;
import com.operacluj.registry.model.User;

public interface MailService {

    void sendMailForReceivedDocument(DocumentHistory documentHistory, String documentTitle);

    void sendMailForResolvedDocument(DocumentHistory documentHistory, String documentTitle);

    void sendMailForNewRegistrationRequest(User user);

    void sendMailForRegistrationConfirmed(User user);
}
