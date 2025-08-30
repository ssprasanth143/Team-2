package com.pharma.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class MemberDTO {
    private String name;
    public LocalDate getDob() {
		return dob;
	}
	public void setDob(LocalDate dob) {
		this.dob = dob;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	private LocalDate dob;
    private String email;
    private String password;
    private String mobile;
    private String address;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}