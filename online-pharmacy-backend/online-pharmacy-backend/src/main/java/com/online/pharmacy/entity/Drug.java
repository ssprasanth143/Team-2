package com.online.pharmacy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Drug {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  public Long getId() {
	return id;
}
  public void setId(Long id) {
	this.id = id;
  }
  public void setName(String name) {
	this.name = name;
  }
  public void setDescription(String description) {
	this.description = description;
  }
  public void setPrice(Double price) {
	this.price = price;
  }
  public void setQuantity(Integer quantity) {
	this.quantity = quantity;
  }
  private String name;
  @Column(length=1000)
  private String description;
  private Double price;
  private Integer quantity;
  public Object getName() {
	return name;
  }
  public void setName(Object name2, String name) {
	this.name = name;
	
  }
  public Object getDescription() {
	return description;
  }
  public void setDescription(Object description2, String description) {
	this.description = description;
	
  }
  public Double getPrice() {
	return price;
  }
  public Object getQuantity() {
	return quantity;
  }
  public void setQuantity(Object quantity2, Integer quantity) {
	this.quantity = quantity;
  }
  public void setPrice(Object price2, Double price) {
	this.price = price;
  }
  public static Object builder() {
	return builder();
  }
}
