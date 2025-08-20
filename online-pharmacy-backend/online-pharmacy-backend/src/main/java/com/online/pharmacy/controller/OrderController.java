package com.online.pharmacy.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.pharmacy.dto.OrderDtos.PlaceOrderRequest;
import com.online.pharmacy.dto.OrderDtos.UpdateOrderStatusRequest;
import com.online.pharmacy.entity.Order;
import com.online.pharmacy.entity.OrderItem;
import com.online.pharmacy.entity.OrderState;
import com.online.pharmacy.entity.User;
import com.online.pharmacy.repository.DrugRepository;
import com.online.pharmacy.repository.OrderRepository;
import com.online.pharmacy.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.var;


@RestController @RequestMapping("/orders") @RequiredArgsConstructor
public class OrderController {
  private final OrderRepository orderRepo;
  private final DrugRepository drugRepo;
  private final UserRepository userRepo;

  @PostMapping
  @PreAuthorize("hasAnyRole('MEMBER','ADMIN')")
  public ResponseEntity<?> place(Authentication auth, @RequestBody PlaceOrderRequest req){
    User u = userRepo.findByUsername(auth.getName()).orElseThrow();
    Order order = new Order();
    order.setOrderDate(LocalDateTime.now());
    order.setStatus(OrderState.PENDING);
    order.setUser(u);
    for (var it : req.getItems()){
      var drug = drugRepo.findById(it.getDrugId()).orElseThrow();
      if(drug.getQuantity() < it.getQuantity()) return ResponseEntity.badRequest().body("Insufficient stock for drug id " + drug.getId());
      drug.setQuantity(drug.getQuantity() - it.getQuantity());
      OrderItem oi = new OrderItem();
      oi.setOrder(order);
      oi.setDrug(drug);
      oi.setQuantity(it.getQuantity());
      oi.setPrice(drug.getPrice());
      order.getItems().add(oi);
    }
    orderRepo.save(order);
    return ResponseEntity.ok(order);
  }

  @GetMapping("/my")
  @PreAuthorize("hasAnyRole('MEMBER','ADMIN')")
  public List<Order> my(Authentication auth){
    User u = userRepo.findByUsername(auth.getName()).orElseThrow();
    return orderRepo.findByUser(u);
  }

  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public List<Order> all(){ return orderRepo.findAll(); }

  @PutMapping("/{id}/status")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody UpdateOrderStatusRequest req){
    return orderRepo.findById(id).map(o -> {
      o.setStatus(OrderState.valueOf(req.getStatus()));
      orderRepo.save(o);
      return ResponseEntity.ok(o);
    }).orElse(ResponseEntity.notFound().build());
  }
}
