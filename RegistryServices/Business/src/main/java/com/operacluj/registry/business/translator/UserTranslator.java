package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.UserForm;
import com.operacluj.registry.model.Department;
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

    public User translate(UserForm userForm) {
        User user = new User();
        user.setFirstName(userForm.getFirstName());
        user.setLastName(userForm.getLastName());
        user.setEmail(userForm.getEmail());
        user.setDepartment(Department.getDepartment(userForm.getDepartment()));
        user.setPassword(bCryptPasswordEncoder.encode(userForm.getPassword()));
        return user;
    }

    public User getUserFromPrincipal(Principal principal) {
        return (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
    }
}
