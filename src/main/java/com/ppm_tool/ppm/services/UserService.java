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
			newUser.setUsername(newUser.getUsername());
			
			newUser.setPassword(bcryptencoder.encode(newUser.getPassword()));
			newUser.setConfirmPassword("");
				
			// Username has to be unique
			
			// Make sure passwords match
			return userRepo.save(newUser);
		}catch(Exception e) {
			throw new UniqueUsernameException("User with " + newUser.getUsername() + " already exists");	
		}		

	}
}
