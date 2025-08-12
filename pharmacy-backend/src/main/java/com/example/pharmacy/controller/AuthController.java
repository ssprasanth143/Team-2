package com.example.pharmacy.controller;

import com.example.pharmacy.model.AppUser;
import com.example.pharmacy.repository.UserRepository;
import com.example.pharmacy.service.AuthService;
import com.example.pharmacy.security.TokenBlacklist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired private AuthService authService;
    @Autowired private UserRepository userRepository;
    @Autowired private TokenBlacklist tokenBlacklist;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AppUser u) {
        if (userRepository.findByUsername(u.getUsername()).isPresent()) return ResponseEntity.status(HttpStatus.CONFLICT).body("Username exists");
        AppUser saved = authService.register(u);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        String username = body.get("username");
        String password = body.get("password");
        Optional<String> t = authService.login(username, password);
        if (t.isPresent()) {
            Map<String,String> res = new HashMap<>();
            res.put("token", t.get());
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials or not approved/disabled");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String header) {
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            tokenBlacklist.blacklist(token);
        }
        return ResponseEntity.ok("Logged out");
    }
}
