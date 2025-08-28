package com.pharma.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;


@Entity
@Data
@Table(name = "members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private LocalDate dob;
    
    @Transient
    private String status;
    
	@Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String mobile;
    
    @Column(nullable = false)
    private String address;
    
    @Column(nullable = false)
    private String role = "MEMBER";
    
    @Column(nullable = false)
    private boolean approved = false;
    
    @Column(nullable = false)
    private boolean disabled = false;
    
    @Override
	public String toString() {
		return "Member [id=" + id + ", name=" + name + ", dob=" + dob + ", status=" + status + ", email=" + email
				+ ", password=" + password + ", mobile=" + mobile + ", address=" + address + ", role=" + role
				+ ", approved=" + approved + ", disabled=" + disabled + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getDob() {
		return dob;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
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


	public String getStatus() {
        if (approved && disabled) return "Approved";
        if (!approved && !disabled) return "Declined";
        return "Pending";
    }

    public void setStatus(String status) {
        this.status = status;
    }


	public void setDob(LocalDate localDate) {
		this.dob = dob;
		
	}

	public void setDob(String string) {
		this.dob = dob;
		
	}
	

  
}