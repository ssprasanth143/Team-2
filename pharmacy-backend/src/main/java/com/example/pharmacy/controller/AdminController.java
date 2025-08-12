package com.example.pharmacy.controller;

import com.example.pharmacy.model.*;
import com.example.pharmacy.repository.*;
import com.example.pharmacy.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired private DrugService drugService;
    @Autowired private UserRepository userRepository;

    // Drug operations
    @PostMapping("/drugs")
    public Drug addDrug(@RequestBody Drug d) { return drugService.add(d); }

    @GetMapping("/drugs")
    public List<Drug> listDrugs() { return drugService.listAll(); }

    @PutMapping("/drugs/{id}")
    public ResponseEntity<?> updateDrug(@PathVariable Long id, @RequestBody Drug d) {
        return drugService.findById(id).map(existing -> {
            existing.setName(d.getName());
            existing.setDescription(d.getDescription());
            existing.setPrice(d.getPrice());
            existing.setQuantity(d.getQuantity());
            drugService.update(existing);
            return ResponseEntity.ok(existing);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/drugs/{id}")
    public ResponseEntity<?> deleteDrug(@PathVariable Long id) {
        drugService.delete(id);
        return ResponseEntity.ok().build();
    }

    // User management
    @GetMapping("/users")
    public List<AppUser> listUsers() { return userRepository.findAll(); }

    @PutMapping("/users/{id}/approve")
    public ResponseEntity<?> approveUser(@PathVariable Long id) {
        return userRepository.findById(id).map(u -> {
            u.setEnabled(true);
            userRepository.save(u);
            return ResponseEntity.ok(u);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/users/{id}/disable")
    public ResponseEntity<?> disableUser(@PathVariable Long id) {
        return userRepository.findById(id).map(u -> {
            u.setDisabled(true);
            userRepository.save(u);
            return ResponseEntity.ok(u);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody AppUser updated) {
        return userRepository.findById(id).map(u -> {
            u.setEmail(updated.getEmail());
            u.setMobile(updated.getMobile());
            u.setRole(updated.getRole());
            u.setDisabled(updated.isDisabled());
            u.setEnabled(updated.isEnabled());
            userRepository.save(u);
            return ResponseEntity.ok(u);
        }).orElse(ResponseEntity.notFound().build());
    }
}
