package com.pharma.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.pharma.backend.model.Medicine;

public interface MedicineService {

    long getAvailableMedicinesCount();

    long getItemsInCartCount();

    List<Medicine> getAllMedicines();

    Medicine saveMedicine(Medicine medicine, Object imageFile); 

    long getMedicineCount();

    Medicine updateMedicine(Medicine medicine);

    void deleteMedicine(Long id);

    Medicine findById(Long id);

    default String saveImage(MultipartFile imageFile, String uploadDir) throws IOException {
        if (imageFile == null || imageFile.isEmpty()) return null;

        String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir + "images/");
        Files.createDirectories(uploadPath);

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "images/" + fileName;
    }
    Medicine saveMedicine(Medicine medicine);
}
