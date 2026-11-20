package com.associationmanager.association;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;
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

@RestController
@RequestMapping("/api/v1/associations")
public class AssociationController {
    private final AssociationService service;

    public AssociationController(AssociationService service) { this.service = service; }

    @PostMapping
    @PreAuthorize("@securityExpressions.isAdmin(authentication)")
    public ResponseEntity<AssociationResponse> create(@Valid @RequestBody AssociationRequest request) {
        AssociationResponse created = service.create(request);
        return ResponseEntity.created(URI.create("/api/v1/associations/" + created.id())).body(created);
    }

    @GetMapping
    @PreAuthorize("@securityExpressions.isAdmin(authentication)")
    public List<AssociationResponse> findAll() { return service.findAll(); }

    @GetMapping("/{id}")
    @PreAuthorize("@securityExpressions.canAccessAssociation(#id, authentication)")
    public AssociationResponse findById(@PathVariable("id") UUID id) { return service.findById(id); }

    @PutMapping("/{id}")
    @PreAuthorize("@securityExpressions.canAccessAssociation(#id, authentication)")
    public AssociationResponse update(@PathVariable("id") UUID id, @Valid @RequestBody AssociationRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@securityExpressions.canAccessAssociation(#id, authentication)")
    public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
