package com.online.pharmacy.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.online.pharmacy.entity.Drug;
import com.online.pharmacy.entity.Role;
import com.online.pharmacy.entity.Status;
import com.online.pharmacy.entity.User;
import com.online.pharmacy.repository.DrugRepository;
import com.online.pharmacy.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component @RequiredArgsConstructor
public class InitService implements CommandLineRunner {
  private final UserRepository userRepo = null;
  private final DrugRepository drugRepo = null;
  private final PasswordEncoder encoder = null;

  @Override
  public void run(String... args) throws Exception {
    if(userRepo.findByUsername("admin").isEmpty()){
      User admin = User.builder()
          .username("admin")
          .password(encoder.encode("admin123"))
          .email("admin@example.com")
          .mobile("9999999999")
          .role(Role.ADMIN)
          .status(Status.APPROVED)
          .build();
      userRepo.save(admin);
    }
    if(drugRepo.count()==0){
      drugRepo.save(Drug.builder().name("Paracetamol 500mg").description("Pain reliever").price(20.0).quantity(100).build());
      drugRepo.save(Drug.builder().name("Amoxicillin 250mg").description("Antibiotic").price(60.0).quantity(50).build());
    }
  }
}
