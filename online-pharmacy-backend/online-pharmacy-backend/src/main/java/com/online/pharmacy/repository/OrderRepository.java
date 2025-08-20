package com.online.pharmacy.repository;

import com.online.pharmacy.entity.Order;
import com.online.pharmacy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByUser(User user);
}
