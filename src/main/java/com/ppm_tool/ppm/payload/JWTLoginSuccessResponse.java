package com.ppm_tool.ppm.payload;

public class JWTLoginSuccessResponse {
	private boolean success;
	private String token;
	
	public JWTLoginSuccessResponse(String token, boolean success) {
		this.success = success;
		this.token = token;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "JWTLoginSuccessResponse [success=" + success + ", token=" + token + "]";
	}
	
	
}
