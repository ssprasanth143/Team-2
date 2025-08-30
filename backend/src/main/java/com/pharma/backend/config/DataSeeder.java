package com.pharma.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.pharma.backend.model.Member;
import com.pharma.backend.repository.MemberRepository;

@Component
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(MemberRepository memberRepository) {
        return args -> {
            if (memberRepository.findByEmail("admin@example.com") == null) {
                Member admin = new Member();
                admin.setName("Admin");
                admin.setDob("1990-01-01"); // match your Member entity's dob type (String or LocalDate)
                admin.setEmail("admin@example.com");
                admin.setPassword("admin123");
                admin.setMobile("9999999999");
                admin.setAddress("HQ");
                admin.setStatus("ACTIVE");
                memberRepository.save(admin);
            }
        };
    }
}

