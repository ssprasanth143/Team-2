package com.example.pharmacy.repository;

import com.example.pharmacy.model.PharmacyOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface OrderRepository extends JpaRepository<PharmacyOrder, Long> {
    List<PharmacyOrder> findByMemberId(Long memberId);
}
