package com.online.pharmacy.dto;

import lombok.*;

public class AuthDtos {

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class LoginRequest {
  public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
  private String username;
  private String password;
  
}

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
class RegisterRequest {
  private String username;
  public String getUsername() {
	return username;
}
  public void setUsername(String username) {
	this.username = username;
  }
  public String getPassword() {
	return password;
  }
  public void setPassword(String password) {
	this.password = password;
  }
  public String getEmail() {
	return email;
  }
  public void setEmail(String email) {
	this.email = email;
  }
  public String getMobile() {
	return mobile;
  }
  public void setMobile(String mobile) {
	this.mobile = mobile;
  }
  private String password;
  private String email;
  private String mobile;
}

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AuthResponse {
  public AuthResponse(String token, String username, String role) {
		super();
		this.token = token;
		this.username = username;
		this.role = role;
	}
  private String token;
  public String getToken() {
	return token;
}
  public void setToken(String token) {
	this.token = token;
  }
  public String getUsername() {
	return username;
  }
  public void setUsername(String username) {
	this.username = username;
  }
  public String getRole() {
	return role;
  }
  public void setRole(String role) {
	this.role = role;
  }
  private String username;
  private String role;
}

}
