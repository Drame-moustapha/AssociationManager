package com.associationmanager.membership;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

public record MemberResponse(UUID id, UUID associationId, String firstName, String lastName,
                             String email, String phone, MemberStatus status, LocalDate joinedAt,
                             OffsetDateTime createdAt, OffsetDateTime updatedAt) {
    public static MemberResponse from(Member member) {
        return new MemberResponse(member.getId(), member.getAssociation().getId(), member.getFirstName(),
                member.getLastName(), member.getEmail(), member.getPhone(), member.getStatus(),
                member.getJoinedAt(), member.getCreatedAt(), member.getUpdatedAt());
    }
}
