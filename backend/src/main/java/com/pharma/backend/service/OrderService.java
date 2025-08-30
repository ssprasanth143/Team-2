package com.pharma.backend.service;

import java.util.List;

import com.pharma.backend.model.Order;

public interface OrderService {
    long getOrdersCount();

    Order updateOrderStatus(Long id, String status);

    List<Order> getAllOrders();
}
