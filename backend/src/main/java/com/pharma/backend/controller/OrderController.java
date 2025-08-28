package com.pharma.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pharma.backend.model.CartItem;
import com.pharma.backend.model.Order;
import com.pharma.backend.repository.CartRepository;
import com.pharma.backend.repository.OrderRepository;
import com.pharma.backend.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173", 
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.OPTIONS},
             allowedHeaders = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

   
    @GetMapping("/count")
    public long getOrdersCount() {
        return orderService.getOrdersCount();
    }

   
    @PostMapping("/place")
    public ResponseEntity<String> placeOrder() {
        List<CartItem> cartItems = cartRepository.findAll();

        if (cartItems.isEmpty()) {
            return ResponseEntity.badRequest().body("Cart is empty");
        }

        for (CartItem cartItem : cartItems) {
            Order order = new Order();
            order.setName(cartItem.getName());
            order.setPrice(cartItem.getPrice());
            order.setQuantity(cartItem.getQuantity());
            order.setMemberId(cartItem.getMemberId());
            order.setStatus("PLACED");

            orderRepository.save(order);
        }

        cartRepository.deleteAll(); 
        return ResponseEntity.ok("Order placed successfully");
    }

    
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    
    @PutMapping("/{id}/status")
    public ResponseEntity<Object> updateOrderStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, request.getStatus()));
    }

    
    @RequestMapping(method = RequestMethod.OPTIONS, value = "/**")
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }

    
    public static class StatusUpdateRequest {
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
