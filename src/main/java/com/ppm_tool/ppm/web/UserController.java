package com.ppm_tool.ppm.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ppm_tool.ppm.domain.User;
import com.ppm_tool.ppm.services.MappingValidationErrors;
import com.ppm_tool.ppm.services.UserService;
import com.ppm_tool.ppm.validators.UserValidator;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	
	@Autowired
	private UserValidator userValidator;

	@Autowired
	private MappingValidationErrors mappingValidationService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
		userValidator.validate(user, result);
		
		ResponseEntity<?> errorMapping = mappingValidationService.MappingValidationService(result);
		if(errorMapping != null) return errorMapping;
		
		User newUser = userService.saveUser(user);
		
		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
		
	}
}
