package com.online.pharmacy.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class OrderDtos {

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PlaceOrderRequest {
  private List<Item> items;
  public List<Item> getItems() {
	return items;
}
  public void setItems(List<Item> items) {
	this.items = items;
  }
  @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
  public  class Item {
    private Long drugId;
    public Long getDrugId() {
		return drugId;
	}
	public void setDrugId(Long drugId) {
		this.drugId = drugId;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	private Integer quantity;
  }
}

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UpdateOrderStatusRequest {
  public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

  private String status;
}
}
