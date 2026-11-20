package com.associationmanager.security.authentication;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<CustomUserDetails, UUID> {
    Optional<CustomUserDetails> findByEmailIgnoreCase(String email);
}
