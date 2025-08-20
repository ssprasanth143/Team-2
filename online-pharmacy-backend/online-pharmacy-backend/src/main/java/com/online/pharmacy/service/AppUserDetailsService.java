package com.online.pharmacy.service;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.online.pharmacy.entity.Status;
import com.online.pharmacy.entity.User;
import com.online.pharmacy.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service @RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository = null;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User u = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    // Only allow APPROVED users
    boolean enabled = u.getStatus() == Status.APPROVED;
    return org.springframework.security.core.userdetails.User.builder()
        .username(u.getUsername())
        .password(u.getPassword())
        .disabled(!enabled)
        .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + u.getRole().name())))
        .build();
  }
}
