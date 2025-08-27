package com.pharma.backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pharma.backend.model.Medicine;
import com.pharma.backend.service.MedicineService;


@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    
    @GetMapping("/available-count")
    public long getAvailableMedicinesCount() {
        return medicineService.getAvailableMedicinesCount();
    }

    
    @GetMapping("/cart-count")
    public long getItemsInCartCount() {
        return medicineService.getItemsInCartCount();
    }

    
    @GetMapping("/count")
    public ResponseEntity<Long> getMedicineCount() {
        long count = medicineService.getMedicineCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/all")
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    
    @PostMapping("/add")
    public ResponseEntity<?> addMedicine(@RequestBody Medicine medicine) {
        try {
            Medicine savedMedicine = medicineService.saveMedicine(medicine, null); 
            return ResponseEntity.ok(savedMedicine);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving medicine: " + e.getMessage());
        }
    }
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Medicine med = medicineService.findById(id);
        if (med != null && med.getImageData() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(med.getImageType()))
                    .body(med.getImageData());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMedicine(@PathVariable Long id, @RequestBody Medicine updatedMedicine) {
        try {
            Medicine existing = medicineService.findById(id);
            if (existing == null) {
                return ResponseEntity.badRequest().body("Medicine with ID " + id + " not found.");
            }

          
            existing.setName(updatedMedicine.getName());
            existing.setCompany(updatedMedicine.getCompany());
            existing.setType(updatedMedicine.getType());
            existing.setPrice(updatedMedicine.getPrice());
            existing.setAvailableQuantity(updatedMedicine.getAvailableQuantity());
            existing.setRating(updatedMedicine.getRating());
            existing.setDescription(updatedMedicine.getDescription());
            existing.setBanned(updatedMedicine.isBanned());
            existing.setImageUrl(updatedMedicine.getImageUrl());

            Medicine saved = medicineService.saveMedicine(existing, null); 
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating medicine: " + e.getMessage());
        }
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedicine(@PathVariable Long id) {
        try {
            medicineService.deleteMedicine(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting medicine: " + e.getMessage());
        }
    }

    
    @GetMapping("/verify-image/{filename}")
    public ResponseEntity<String> verifyImage(@PathVariable String filename) {
        Path path = Paths.get("C:/Users/sneha/Downloads/pharma/uploads/images/" + filename);
        if (Files.exists(path)) {
            return ResponseEntity.ok("Image exists at: " + path.toString());
        }
        return ResponseEntity.status(404).body("Image not found at: " + path.toString());
    }

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<?> addMedicine(
        @RequestParam("name") String name,
        @RequestParam("company") String company,
        @RequestParam("type") String type,
        @RequestParam("price") double price,
        @RequestParam("availableQuantity") int availableQuantity,
        @RequestParam("rating") int rating,
        @RequestParam("banned") boolean banned,
        @RequestParam("description") String description,
        @RequestParam(value = "imageFile", required = false) MultipartFile imageFile
        ){
    try {
        Medicine medicine = new Medicine();
        medicine.setName(name);
        medicine.setCompany(company);
        medicine.setType(type);
        medicine.setPrice(price);
        medicine.setAvailableQuantity(availableQuantity);
        medicine.setRating(rating);
        medicine.setBanned(banned);
        medicine.setDescription(description);

        if (imageFile != null && !imageFile.isEmpty()) {
            medicine.setImageData(imageFile.getBytes());
            medicine.setImageType(imageFile.getContentType());
        }

        Medicine savedMedicine = medicineService.saveMedicine(medicine, imageFile);
        return ResponseEntity.ok(savedMedicine);
    } catch (IOException e) {
        return ResponseEntity.badRequest().body("Error reading image file: " + e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error saving medicine: " + e.getMessage());
    }
}


}
