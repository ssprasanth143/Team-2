package com.example.pharmacy;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.pharmacy.repository.*;
import com.example.pharmacy.model.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.*;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired private UserRepository userRepository;
    @Autowired private DrugRepository drugRepository;

    @Override
    public void run(String... args) throws Exception {
        BCryptPasswordEncoder enc = new BCryptPasswordEncoder();
        if (userRepository.count() == 0) {
            AppUser admin = AppUser.builder().username("admin").password(enc.encode("admin123")).role("ROLE_ADMIN").enabled(true).disabled(false).email("admin@example.com").mobile("000").build();
            AppUser user = AppUser.builder().username("user").password(enc.encode("user123")).role("ROLE_USER").enabled(true).disabled(false).email("user@example.com").mobile("111").build();
            userRepository.save(admin); userRepository.save(user);
        }
        if (drugRepository.count() == 0) {
            drugRepository.save(Drug.builder().name("Paracetamol").description("Pain reliever").price(1.5).quantity(100).build());
            drugRepository.save(Drug.builder().name("Aspirin").description("Anti-inflammatory").price(2.0).quantity(50).build());
            drugRepository.save(Drug.builder().name("Amoxicillin").description("Antibiotic").price(5.0).quantity(20).build());
        }
    }
}
