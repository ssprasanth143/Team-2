package com.pharma.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pharma.backend.model.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

   
    @Query("SELECT COUNT(m) FROM Medicine m WHERE m.availableQuantity > 0")
    long countAvailableMedicines();
}
