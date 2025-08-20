package com.online.pharmacy.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.pharmacy.dto.AuthDtos.AuthResponse;
import com.online.pharmacy.dto.AuthDtos.LoginRequest;
import com.online.pharmacy.entity.Role;
import com.online.pharmacy.entity.Status;
import com.online.pharmacy.entity.User;
import com.online.pharmacy.repository.UserRepository;
import com.online.pharmacy.service.JwtService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController @RequestMapping("/auth") @RequiredArgsConstructor
public class AuthController {
  private final UserRepository userRepo = null;
  private final PasswordEncoder encoder = null;
  private final AuthenticationManager authManager = null;
  private final JwtService jwt = new JwtService();

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody User req){
    if(userRepo.findByUsername(req.getUsername()).isPresent()){
      return ResponseEntity.badRequest().body(Map.of("message","Username already exists"));
    }
    User u = User.builder()
        .username(req.getUsername())
        .password(encoder.encode(req.getPassword()))
        .email(req.getEmail())
        .mobile(req.getMobile())
        .role(Role.MEMBER)
        .status(Status.PENDING)
        .build();
    userRepo.save(u);
    return ResponseEntity.ok(Map.of("message","Registered. Await admin approval."));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest request){
    try{
     var tokenReq = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
      authManager.authenticate(tokenReq);
      User u = userRepo.findByUsername(request.getUsername()).orElseThrow();
      String token = jwt.generate(u.getUsername(), Map.of("role", u.getRole().name()));
      return ResponseEntity.ok(new AuthResponse(token, u.getUsername(), u.getRole().name()));
    }catch (BadCredentialsException e){
      return ResponseEntity.status(401).body(Map.of("message","Invalid credentials"));
    }catch (Exception e){
      return ResponseEntity.status(403).body(Map.of("message","Not approved or disabled"));
    }
  }
}
