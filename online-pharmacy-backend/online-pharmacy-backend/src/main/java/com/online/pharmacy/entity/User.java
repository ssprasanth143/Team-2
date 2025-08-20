package com.online.pharmacy.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Table(name="users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String username;

  private String password;
  private String email;
  private String mobile;

  @Enumerated(EnumType.STRING)
  private Enum<Status> role;

  @Enumerated(EnumType.STRING)
  private Status status;

  @OneToMany(mappedBy = "user")
  private List<Order> orders;

  public Status getStatus() {
	return status;
  }

  public String getUsername() {
	return username;
  }

  public String getPassword() {
	return password;
  }

  public Enum<Status> getRole() {
	return status;
  }

  public String getEmail() {
	return email;
  }

  public Object getMobile() {
	return mobile;
  }

  public static Object builder() {
	return builder();
  }

  public Long getId() {
	return id;
  }

  public void setId(Long id) {
	this.id = id;
  }

  public List<Order> getOrders() {
	return orders;
  }

  public void setOrders(List<Order> orders) {
	this.orders = orders;
  }

  public void setUsername(String username) {
	this.username = username;
  }

  public void setPassword(String password) {
	this.password = password;
  }

  public void setEmail(String email) {
	this.email = email;
  }

  public void setMobile(String mobile) {
	this.mobile = mobile;
  }

  public void setRole(Enum<Status> enum1) {
	this.role = enum1;
  }

  public void setStatus(Status status) {
	this.status = status;
  }

}
