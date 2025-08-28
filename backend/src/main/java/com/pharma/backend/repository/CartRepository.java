package com.pharma.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pharma.backend.model.CartItem;

public interface CartRepository extends JpaRepository<CartItem, Long> {

    @Query("SELECT COUNT(c) FROM CartItem c")
    long countItemsInCart();
    
    long count(); 
}
