package com.online.pharmacy.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name="orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Order {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  public Long getId() {
	return id;
}

  public void setId(Long id) {
	this.id = id;
  }

  public LocalDateTime getOrderDate() {
	return orderDate;
  }

  public Order(Long id, LocalDateTime orderDate, OrderState status, User user, List<OrderItem> items) {
	super();
	this.id = id;
	this.orderDate = orderDate;
	this.status = status;
	this.user = user;
	this.items = items;
}

  public void setOrderDate(LocalDateTime orderDate) {
	this.orderDate = orderDate;
  }

  public OrderState getStatus() {
	return status;
  }

  public void setStatus(OrderState status) {
	this.status = status;
  }

  public User getUser() {
	return user;
  }

  public void setUser(User user) {
	this.user = user;
  }

  public List<OrderItem> getItems() {
	return items;
  }

  public void setItems(List<OrderItem> items) {
	this.items = items;
  }

  private LocalDateTime orderDate;

  @Enumerated(EnumType.STRING)
  private OrderState status;

  @ManyToOne
  @JoinColumn(name="user_id")
  private User user;

  @OneToMany(mappedBy="order", cascade=CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
  private List<OrderItem> items = new ArrayList<>();

  
}
