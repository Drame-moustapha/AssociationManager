package com.associationmanager.association;

import com.associationmanager.common.exception.ConflictException;
import com.associationmanager.common.exception.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AssociationService {
    private final AssociationRepository repository;

    public AssociationService(AssociationRepository repository) { this.repository = repository; }

    public AssociationResponse create(AssociationRequest request) {
        if (repository.existsByNameIgnoreCase(request.name().trim())) {
            throw new ConflictException("Une association avec ce nom existe déjà.");
        }
        return AssociationResponse.from(repository.save(new Association(request.name().trim(),
                request.description(), request.email(), request.phone(), request.address())));
    }

    @Transactional(readOnly = true)
    public List<AssociationResponse> findAll() {
        return repository.findAllByOrderByNameAsc().stream().map(AssociationResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public AssociationResponse findById(UUID id) {
        return AssociationResponse.from(getEntity(id));
    }

    public AssociationResponse update(UUID id, AssociationRequest request) {
        Association association = getEntity(id);
        String name = request.name().trim();
        if (!association.getName().equalsIgnoreCase(name) && repository.existsByNameIgnoreCase(name)) {
            throw new ConflictException("Une association avec ce nom existe déjà.");
        }
        association.setName(name);
        association.setDescription(request.description());
        association.setEmail(request.email());
        association.setPhone(request.phone());
        association.setAddress(request.address());
        return AssociationResponse.from(repository.save(association));
    }

    public void delete(UUID id) { repository.delete(getEntity(id)); }

    private Association getEntity(UUID id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Association introuvable : " + id));
    }
}
