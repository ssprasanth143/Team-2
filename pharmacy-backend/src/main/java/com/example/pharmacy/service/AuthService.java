package com.example.pharmacy.service;

import com.example.pharmacy.model.AppUser;
import com.example.pharmacy.repository.UserRepository;
import com.example.pharmacy.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.*;

@Service
public class AuthService {
    @Autowired private UserRepository userRepository;
    @Autowired private JwtUtil jwtUtil;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AppUser register(AppUser u) {
        u.setPassword(encoder.encode(u.getPassword()));
        u.setRole("ROLE_USER");
        u.setEnabled(false); // requires admin approval
        u.setDisabled(false);
        return userRepository.save(u);
    }

    public Optional<String> login(String username, String password) {
        Optional<AppUser> ou = userRepository.findByUsername(username);
        if (ou.isPresent()) {
            AppUser user = ou.get();
            if (!user.isEnabled() || user.isDisabled()) return Optional.empty();
            if (encoder.matches(password, user.getPassword())) {
                String token = jwtUtil.generateToken(username, user.getRole());
                return Optional.of(token);
            }
        }
        return Optional.empty();
    }
}
