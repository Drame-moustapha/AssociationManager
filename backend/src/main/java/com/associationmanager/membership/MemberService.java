package com.associationmanager.membership;

import com.associationmanager.association.Association;
import com.associationmanager.association.AssociationRepository;
import com.associationmanager.common.exception.ConflictException;
import com.associationmanager.common.exception.ResourceNotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository members;
    private final AssociationRepository associations;

    public MemberService(MemberRepository members, AssociationRepository associations) {
        this.members = members;
        this.associations = associations;
    }

    public MemberResponse create(UUID associationId, MemberRequest request) {
        Association association = getAssociation(associationId);
        String email = request.email().trim().toLowerCase();
        if (members.existsByAssociationIdAndEmailIgnoreCase(associationId, email)) {
            throw new ConflictException("Cette adresse e-mail est déjà utilisée dans l'association.");
        }
        Member member = new Member(association, request.firstName().trim(), request.lastName().trim(), email,
                request.phone(), request.status() == null ? MemberStatus.ACTIVE : request.status(),
                request.joinedAt() == null ? LocalDate.now() : request.joinedAt());
        return MemberResponse.from(members.save(member));
    }

    @Transactional(readOnly = true)
    public List<MemberResponse> findAll(UUID associationId) {
        getAssociation(associationId);
        return members.findAllByAssociationIdOrderByLastNameAscFirstNameAsc(associationId)
                .stream().map(MemberResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public MemberResponse findById(UUID associationId, UUID memberId) {
        return MemberResponse.from(getMember(associationId, memberId));
    }

    public MemberResponse update(UUID associationId, UUID memberId, MemberRequest request) {
        Member member = getMember(associationId, memberId);
        String email = request.email().trim().toLowerCase();
        if (members.existsByAssociationIdAndEmailIgnoreCaseAndIdNot(associationId, email, memberId)) {
            throw new ConflictException("Cette adresse e-mail est déjà utilisée dans l'association.");
        }
        member.setFirstName(request.firstName().trim());
        member.setLastName(request.lastName().trim());
        member.setEmail(email);
        member.setPhone(request.phone());
        if (request.status() != null) member.setStatus(request.status());
        if (request.joinedAt() != null) member.setJoinedAt(request.joinedAt());
        return MemberResponse.from(members.save(member));
    }

    public void delete(UUID associationId, UUID memberId) {
        members.delete(getMember(associationId, memberId));
    }

    private Association getAssociation(UUID id) {
        return associations.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Association introuvable : " + id));
    }

    private Member getMember(UUID associationId, UUID memberId) {
        return members.findByIdAndAssociationId(memberId, associationId).orElseThrow(() ->
                new ResourceNotFoundException("Membre introuvable dans cette association : " + memberId));
    }
}
