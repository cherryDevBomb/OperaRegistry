package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.UserFormDTO;
import com.operacluj.registry.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
public class UserTranslator {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User translate(UserFormDTO userFormDTO) {
        User user = new User();
        user.setFirstName(userFormDTO.getFirstName());
        user.setLastName(userFormDTO.getLastName());
        user.setEmail(userFormDTO.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(userFormDTO.getPassword()));
        return user;
    }

    public User getUserFromPrincipal(Principal principal) {
        return (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
    }
}
