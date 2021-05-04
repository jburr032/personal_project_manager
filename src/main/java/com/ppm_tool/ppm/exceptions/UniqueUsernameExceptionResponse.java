package com.ppm_tool.ppm.exceptions;

public class UniqueUsernameExceptionResponse {
	private String username;
	
	public UniqueUsernameExceptionResponse(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
