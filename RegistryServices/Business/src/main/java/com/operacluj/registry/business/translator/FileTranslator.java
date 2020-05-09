package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.service.UserService;
import com.operacluj.registry.model.DocumentFile;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@Component
public class FileTranslator {

    @Autowired
    UserService userService;

    @Autowired
    UserTranslator userTranslator;

    public DocumentFile translate(MultipartFile file, int registryNumber, Principal principal) throws IOException {
        DocumentFile documentFile = new DocumentFile();
        documentFile.setRegistryNumber(registryNumber);
        documentFile.setFileData(file.getBytes());
        documentFile.setFilename(file.getOriginalFilename());

        User user = userTranslator.getUserFromPrincipal(principal);
        documentFile.setUploader(user.getUserId());

        return documentFile;
    }
}
