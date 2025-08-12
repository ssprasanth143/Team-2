package com.example.pharmacy.controller;

import com.example.pharmacy.model.Drug;
import com.example.pharmacy.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/drugs")
public class DrugController {
    @Autowired private DrugService drugService;

    @GetMapping("/public/list")
    public List<Drug> listAll() {
        return drugService.listAll();
    }

    @GetMapping("/public/search")
    public List<Drug> search(@RequestParam String q) {
        return drugService.searchByName(q);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<?> byId(@PathVariable Long id) {
        return drugService.findById(id).map(d -> ResponseEntity.ok(d)).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/public/name/{name}")
    public ResponseEntity<?> byName(@PathVariable String name) {
        return drugService.findByName(name).map(d -> ResponseEntity.ok(d)).orElse(ResponseEntity.notFound().build());
    }
}
