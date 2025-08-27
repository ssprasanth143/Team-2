package com.pharma.backend.service.impl;

import com.pharma.backend.model.Medicine;
import com.pharma.backend.repository.CartRepository;
import com.pharma.backend.repository.MedicineRepository;
import com.pharma.backend.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private CartRepository cartRepository;

    @Override
    public long getAvailableMedicinesCount() {
        return medicineRepository.countAvailableMedicines();
    }

    @Override
    public long getItemsInCartCount() {
        return cartRepository.countItemsInCart();
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @Override
    public Medicine saveMedicine(Medicine medicine, Object imageFile) {
      
        return medicineRepository.save(medicine);
    }

    @Override
    public long getMedicineCount() {
        return medicineRepository.count(); 
    }

    @Override
    public Medicine updateMedicine(Medicine medicine) {
        if (!medicineRepository.existsById(medicine.getId())) {
            throw new RuntimeException("Medicine not found with id: " + medicine.getId());
        }
        return medicineRepository.save(medicine);
    }

    @Override
    public void deleteMedicine(Long id) {
        if (!medicineRepository.existsById(id)) {
            throw new RuntimeException("Medicine not found with id: " + id);
        }
        medicineRepository.deleteById(id);
    }

    @Override
    public Medicine findById(Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
    }

    @Override
    public Medicine saveMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }
}
