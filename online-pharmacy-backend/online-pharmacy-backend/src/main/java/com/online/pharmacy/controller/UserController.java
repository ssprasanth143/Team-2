package com.online.pharmacy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.pharmacy.entity.Status;
import com.online.pharmacy.entity.User;
import com.online.pharmacy.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController @RequestMapping("/users") @RequiredArgsConstructor
public class UserController {
  private final UserRepository userRepo = null;

  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public List<User> all(){ return userRepo.findAll(); }

  @PutMapping("/{id}/approve")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> approve(@PathVariable Long id){
    return userRepo.findById(id).map(u->{ u.setStatus(Status.APPROVED); userRepo.save(u); return ResponseEntity.ok(u);} )
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}/disable")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> disable(@PathVariable Long id){
    return userRepo.findById(id).map(u->{ u.setStatus(Status.DISABLED); userRepo.save(u); return ResponseEntity.ok(u);} )
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> remove(@PathVariable Long id){
    if(!userRepo.existsById(id)) return ResponseEntity.notFound().build();
    userRepo.deleteById(id);
    return ResponseEntity.ok(Map.of("message","Deleted"));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> update(@PathVariable Long id, @RequestBody User req){
    return userRepo.findById(id).map(u->{
      u.setEmail(req.getEmail()); u.setMobile((String) req.getMobile()); u.setRole(req.getRole()); u.setStatus(req.getStatus());
      userRepo.save(u); return ResponseEntity.ok(u);
    }).orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/me")
  public ResponseEntity<?> updateMe(Authentication auth, @RequestBody Map<String, String> req){
    User u = userRepo.findByUsername(auth.getName()).orElseThrow();
    if(req.containsKey("email")) u.setEmail(req.get("email"));
    if(req.containsKey("mobile")) u.setMobile(req.get("mobile"));
    userRepo.save(u);
    return ResponseEntity.ok(u);
  }
}
