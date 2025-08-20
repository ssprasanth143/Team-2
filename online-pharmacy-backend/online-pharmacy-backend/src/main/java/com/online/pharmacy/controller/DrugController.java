package com.online.pharmacy.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.pharmacy.entity.Drug;
import com.online.pharmacy.repository.DrugRepository;

import lombok.RequiredArgsConstructor;

@RestController @RequestMapping("/drugs") @RequiredArgsConstructor
public class DrugController {
  private final DrugRepository repo = null;

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public Drug create(@RequestBody Drug d){ return repo.save(d); }

  @GetMapping
  public List<Drug> all(){ return repo.findAll(); }

  @GetMapping("/{id}")
  public ResponseEntity<Drug> one(@PathVariable Long id){ return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }

  @GetMapping("/search/{name}")
  public List<Drug> search(@PathVariable String name){ return repo.findByNameContainingIgnoreCase(name); }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Drug> update(@PathVariable Long id, @RequestBody Drug req){
    return repo.findById(id).map(d->{ d.setName((String) req.getName()); d.setDescription((String) req.getDescription()); d.setPrice((Double) req.getPrice()); d.setQuantity((Integer) req.getQuantity()); return ResponseEntity.ok(repo.save(d)); }).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> delete(@PathVariable Long id){
    if(!repo.existsById(id)) return ResponseEntity.notFound().build();
    repo.deleteById(id); return ResponseEntity.ok().build();
  }
}
