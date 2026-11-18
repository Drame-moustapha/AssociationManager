package com.associationmanager.membership;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, UUID> {
    List<Member> findAllByAssociationIdOrderByLastNameAscFirstNameAsc(UUID associationId);
    Optional<Member> findByIdAndAssociationId(UUID id, UUID associationId);
    boolean existsByAssociationIdAndEmailIgnoreCase(UUID associationId, String email);
    boolean existsByAssociationIdAndEmailIgnoreCaseAndIdNot(UUID associationId, String email, UUID id);
}
