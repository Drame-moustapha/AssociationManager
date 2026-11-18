package com.associationmanager.association;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssociationRepository extends JpaRepository<Association, UUID> {
    boolean existsByNameIgnoreCase(String name);
    List<Association> findAllByOrderByNameAsc();
}
