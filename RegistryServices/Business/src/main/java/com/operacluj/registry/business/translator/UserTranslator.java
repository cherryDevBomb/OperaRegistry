package com.operacluj.registry.business.translator;

import com.operacluj.registry.business.domain.dto.UserDTO;
import com.operacluj.registry.business.domain.request.UserForm;
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

    public UserDTO translate(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setDepartment(user.getDepartment().getTextValue());
        return userDTO;
    }

    public User getUserFromPrincipal(Principal principal) {
        return (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
    }
}
