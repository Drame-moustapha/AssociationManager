package com.associationmanager.security.authentication;

import java.util.UUID;

public record AuthResponse(String accessToken, String refreshToken, String tokenType,
                           long expiresIn, UUID userId, String email, String role, UUID associationId) {
    public static AuthResponse from(CustomUserDetails user, String accessToken, String refreshToken,
                                    long expiresIn) {
        return new AuthResponse(accessToken, refreshToken, "Bearer", expiresIn, user.getId(),
                user.getUsername(), user.getRole(), user.getAssociationId());
    }
}
