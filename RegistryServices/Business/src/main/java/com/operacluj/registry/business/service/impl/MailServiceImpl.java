package com.operacluj.registry.business.service.impl;

import com.operacluj.registry.business.domain.dto.UserDTO;
import com.operacluj.registry.business.service.MailService;
import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.business.translator.UserTranslator;
import com.operacluj.registry.model.DocumentHistory;
import com.operacluj.registry.model.User;
import com.operacluj.registry.model.UserRole;
import freemarker.template.Template;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfig;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private UserTranslator userTranslator;

    @Autowired
    private FreeMarkerConfig freeMarkerConfig;

    private static final String RECEIVED_DOCUMENT_SUBJECT = "Ați primit un document nou";
    private static final String RESOLVED_DOCUMENT_SUBJECT = "Documentul dvs. a fost aprobat";
    private static final String REGISTRATION_REQUEST_SUBJECT = "Cerere nouă de înregistrare";
    private static final String REGISTRATION_CONFIRMED_SUBJECT = "Înregistrare confirmată";
    private static final String REGISTRATION_DECLINED_SUBJECT = "Înregistrare refuzată";

    private static final String RECEIVED_DOCUMENT_TEMPLATE = "received-document-template.html";
    private static final String RESOLVED_DOCUMENT_TEMPLATE = "resolved-document-template.html";
    private static final String REGISTRATION_REQUEST_TEMPLATE = "registration-request-template.html";
    private static final String REGISTRATION_CONFIRMED_TEMPLATE = "registration-confirmed-template.html";
    private static final String REGISTRATION_DECLINED_TEMPLATE = "registration-declined-template.html";

    @Override
    public void sendMailForReceivedDocument(DocumentHistory documentHistory, String documentTitle) {
        User sender = userService.getUserById(documentHistory.getSender());
        User recipient = userService.getUserById(documentHistory.getInternalRecipient());
        Map<String, String> placeholderMap = getDocumentPlaceholderMap(documentHistory.getRegistryNumber(), documentTitle, sender, documentHistory.getSentMessage());

        sendMail(recipient, RECEIVED_DOCUMENT_SUBJECT, RECEIVED_DOCUMENT_TEMPLATE, placeholderMap);
    }

    @Override
    public void sendMailForResolvedDocument(DocumentHistory documentHistory, String documentTitle) {
        User author = userService.getUserById(documentHistory.getSender());
        User resolver = userService.getUserById(documentHistory.getInternalRecipient());
        Map<String, String> placeholderMap = getDocumentPlaceholderMap(documentHistory.getRegistryNumber(), documentTitle, resolver, documentHistory.getResolvedMessage());

        sendMail(author, RESOLVED_DOCUMENT_SUBJECT, RESOLVED_DOCUMENT_TEMPLATE, placeholderMap);
    }

    @Override
    public void sendMailForNewRegistrationRequest(User user) {
        Map<String, String> placeholderMap = getUserPlaceholderMap(user);
        List<UserDTO> adminUsers = userService.getUsersByRole(UserRole.ROLE_ADMIN);
        adminUsers.forEach(admin -> sendMail(userTranslator.translate(admin), REGISTRATION_REQUEST_SUBJECT, REGISTRATION_REQUEST_TEMPLATE, placeholderMap));
    }

    @Override
    public void sendMailForRegistrationConfirmed(User user) {
        sendMail(user, REGISTRATION_CONFIRMED_SUBJECT, REGISTRATION_CONFIRMED_TEMPLATE, Collections.emptyMap());
    }

    @Override
    public void sendMailForRegistrationDeclined(User user) {
        sendMail(user, REGISTRATION_DECLINED_SUBJECT, REGISTRATION_DECLINED_TEMPLATE, Collections.emptyMap());
    }

    private void sendMail(User to, String subject, String templatePath, Map<String, String> placeholderMap) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            Template template = freeMarkerConfig.getConfiguration().getTemplate(templatePath);
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, placeholderMap);

            helper.setTo(to.getEmail());
            helper.setText(html, true);
            helper.setSubject(subject);

            mailSender.send(message);

        } catch (Exception e) {
            log.error("Error sending email notification");
            e.printStackTrace();
        }
    }

    private Map<String, String> getDocumentPlaceholderMap(int registryNumber, String title, User user, String message) {
        Map<String, String> placeholderMap = new HashMap<>();
        placeholderMap.put("registryNumber", String.valueOf(registryNumber));
        placeholderMap.put("title", title);
        placeholderMap.put("user", user.getFullName());
        if (StringUtils.hasText(message)) {
            placeholderMap.put("messageField", "Mesaj:");
            placeholderMap.put("message", message);
        }
        else {
            placeholderMap.put("messageField", "");
            placeholderMap.put("message", "");
        }
        return placeholderMap;
    }

    private Map<String, String> getUserPlaceholderMap(User user) {
        Map<String, String> placeholderMap = new HashMap<>();
        placeholderMap.put("lastName", user.getLastName());
        placeholderMap.put("firstName", user.getFirstName());
        placeholderMap.put("email", user.getEmail());
        placeholderMap.put("department", user.getDepartment().getTextValue());
        return placeholderMap;
    }
}
