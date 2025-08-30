package com.pharma.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharma.backend.model.CartItem;
import com.pharma.backend.model.Medicine;
import com.pharma.backend.repository.CartRepository;
import com.pharma.backend.repository.MedicineRepository;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartItem cart) {
        Optional<Medicine> medicineOpt = medicineRepository.findById(cart.getMedicineId());

        if (medicineOpt.isPresent()) {
            Medicine medicine = medicineOpt.get();

            cart.setName(medicine.getName());
            cart.setPrice(medicine.getPrice());

            cartRepository.save(cart);
            return ResponseEntity.ok("Item added to cart");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Medicine not found");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        List<CartItem> cartItems = cartRepository.findAll();
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long id) {
        if (!cartRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart item not found");
        }
        cartRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear/{memberId}")
    public ResponseEntity<?> clearCartByMember(@PathVariable Long memberId) {
        List<CartItem> items = cartRepository.findAll().stream()
                .filter(c -> memberId != null && memberId.equals(c.getMemberId()))
                .toList();
        if (items.isEmpty()) {
            return ResponseEntity.ok("Cart already empty");
        }
        cartRepository.deleteAll(items);
        return ResponseEntity.ok("Cart cleared");
    }

    

    
}
