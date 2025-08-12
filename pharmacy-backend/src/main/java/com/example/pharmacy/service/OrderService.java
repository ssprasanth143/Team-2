package com.example.pharmacy.service;

import com.example.pharmacy.model.*;
import com.example.pharmacy.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class OrderService {
    @Autowired private OrderRepository orderRepository;
    @Autowired private DrugRepository drugRepository;
    @Autowired private UserRepository userRepository;

    public PharmacyOrder placeOrder(String username, List<OrderItem> items) {
        AppUser user = userRepository.findByUsername(username).orElse(null);
        if (user == null) throw new RuntimeException("User not found");
        double total = 0;
        for (OrderItem it: items) {
            Drug d = drugRepository.findById(it.getDrug().getId()).orElseThrow(() -> new RuntimeException("Drug not found"));
            if (d.getQuantity() < it.getQuantity()) throw new RuntimeException("Insufficient stock for " + d.getName());
            d.setQuantity(d.getQuantity() - it.getQuantity());
            drugRepository.save(d);
            it.setPrice(d.getPrice() * it.getQuantity());
            total += it.getPrice();
        }
        PharmacyOrder o = PharmacyOrder.builder().member(user).items(items).total(total).createdAt(new Date()).build();
        return orderRepository.save(o);
    }
}
