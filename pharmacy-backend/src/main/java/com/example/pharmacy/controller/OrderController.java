package com.example.pharmacy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pharmacy.model.OrderItem;
import com.example.pharmacy.model.PharmacyOrder;
import com.example.pharmacy.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired private OrderService orderService;

    // place order - expects items with drug.id and quantity set
    @PostMapping("/place")
    public ResponseEntity<?> place(@RequestBody List<OrderItem> items, Authentication auth) {
        if (auth == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        try {
            PharmacyOrder o = orderService.placeOrder(auth.getName(), items);
            return ResponseEntity.ok(o);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
