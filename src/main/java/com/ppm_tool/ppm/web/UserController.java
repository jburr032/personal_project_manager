package com.ppm_tool.ppm.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ppm_tool.ppm.domain.User;
import com.ppm_tool.ppm.payload.JWTLoginSuccessResponse;
import com.ppm_tool.ppm.payload.JWTProvider;
import com.ppm_tool.ppm.payload.LoginRequest;
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

	@Autowired
	private JWTProvider tokenProvider;

	@Autowired
	private AuthenticationManager authManager;
	
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mappingValidationService.MappingValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = "Bearer " +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(jwt, true));
    }

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
		userValidator.validate(user, result);

		ResponseEntity<?> errorMapping = mappingValidationService.MappingValidationService(result);
		if (errorMapping != null)
			return errorMapping;

		User newUser = userService.saveUser(user);

		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);

	}
}
