package com.associationmanager.association;

import java.time.OffsetDateTime;
import java.util.UUID;

public record AssociationResponse(UUID id, String name, String description, String email,
                                  String phone, String address, OffsetDateTime createdAt,
                                  OffsetDateTime updatedAt) {
    public static AssociationResponse from(Association association) {
        return new AssociationResponse(association.getId(), association.getName(),
                association.getDescription(), association.getEmail(), association.getPhone(),
                association.getAddress(), association.getCreatedAt(), association.getUpdatedAt());
    }
}
