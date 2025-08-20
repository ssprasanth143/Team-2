package com.online.pharmacy.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  public Long getId() {
	return id;
}
  public void setId(Long id) {
	this.id = id;
  }
  public Order getOrder() {
	return order;
  }
  public void setOrder(Order order) {
	this.order = order;
  }
  public Drug getDrug() {
	return drug;
  }
  public void setDrug(Drug drug) {
	this.drug = drug;
  }
  public Integer getQuantity() {
	return quantity;
  }
  public void setQuantity(Integer quantity) {
	this.quantity = quantity;
  }
  public Double getPrice() {
	return price;
  }
  public void setPrice(Double price) {
	this.price = price;
  }
  @ManyToOne @JoinColumn(name="order_id")
  private Order order;

  @ManyToOne @JoinColumn(name="drug_id")
  private Drug drug;

  private Integer quantity;
  private Double price;
}
