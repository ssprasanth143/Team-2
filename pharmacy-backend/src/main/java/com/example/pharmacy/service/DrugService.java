package com.example.pharmacy.service;

import com.example.pharmacy.model.Drug;
import com.example.pharmacy.repository.DrugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class DrugService {
    @Autowired private DrugRepository drugRepository;

    public Drug add(Drug d) { return drugRepository.save(d); }
    public List<Drug> listAll() { return drugRepository.findAll(); }
    public Optional<Drug> findById(Long id) { return drugRepository.findById(id); }
    public Optional<Drug> findByName(String name) { return drugRepository.findByName(name); }
    public List<Drug> searchByName(String name) { return drugRepository.findByNameContainingIgnoreCase(name); }
    public void delete(Long id) { drugRepository.deleteById(id); }
    public Drug update(Drug d) { return drugRepository.save(d); }
}
