package com.ppm_tool.ppm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ppm_tool.ppm.domain.User;
import com.ppm_tool.ppm.exceptions.UniqueUsernameException;
import com.ppm_tool.ppm.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private BCryptPasswordEncoder bcryptencoder;
	
	public User saveUser(User newUser) {
		try {
            newUser.setPassword(bcryptencoder.encode(newUser.getPassword()));
            
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            
            return userRepo.save(newUser);
		}catch(Exception e) {
			throw new UniqueUsernameException("User with " + newUser.getUsername() + " already exists");	
		}		

	}
}
