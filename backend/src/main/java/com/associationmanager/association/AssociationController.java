package com.associationmanager.association;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/associations")
public class AssociationController {
    private final AssociationService service;

    public AssociationController(AssociationService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<AssociationResponse> create(@Valid @RequestBody AssociationRequest request) {
        AssociationResponse created = service.create(request);
        return ResponseEntity.created(URI.create("/api/v1/associations/" + created.id())).body(created);
    }

    @GetMapping
    public List<AssociationResponse> findAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public AssociationResponse findById(@PathVariable UUID id) { return service.findById(id); }

    @PutMapping("/{id}")
    public AssociationResponse update(@PathVariable UUID id, @Valid @RequestBody AssociationRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
