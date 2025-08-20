package com.online.pharmacy.repository;

import com.online.pharmacy.entity.Drug;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DrugRepository extends JpaRepository<Drug, Long> {
  List<Drug> findByNameContainingIgnoreCase(String name);
}
