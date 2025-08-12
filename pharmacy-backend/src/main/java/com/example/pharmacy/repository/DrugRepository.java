package com.example.pharmacy.repository;

import com.example.pharmacy.model.Drug;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface DrugRepository extends JpaRepository<Drug, Long> {
    Optional<Drug> findByName(String name);
    List<Drug> findByNameContainingIgnoreCase(String name);
}
