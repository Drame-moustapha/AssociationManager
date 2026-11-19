package com.associationmanager.security.refresh;

import com.associationmanager.security.authentication.CustomUserDetails;
import com.associationmanager.security.authentication.UserRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RefreshTokenService {
    private final RefreshTokenRepository tokens;
    private final UserRepository users;
    private final java.time.Duration refreshTtl;
    private final SecureRandom random = new SecureRandom();

    public RefreshTokenService(RefreshTokenRepository tokens, UserRepository users,
            com.associationmanager.security.jwt.JwtProperties properties) {
        this.tokens = tokens;
        this.users = users;
        this.refreshTtl = properties.getRefreshTokenTtl();
    }

    @Transactional
    public String create(CustomUserDetails user) {
        byte[] bytes = new byte[48];
        random.nextBytes(bytes);
        String rawToken = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        tokens.save(new RefreshToken(user.getId(), hash(rawToken), OffsetDateTime.now().plus(refreshTtl)));
        return rawToken;
    }

    @Transactional
    public CustomUserDetails rotate(String rawToken) {
        OffsetDateTime now = OffsetDateTime.now();
        String tokenHash = hash(rawToken);
        RefreshToken token = tokens.findByTokenHashAndRevokedAtIsNullAndExpiresAtAfter(tokenHash, now)
                .orElseThrow(InvalidRefreshTokenException::new);

        // A conditional database update makes token consumption atomic: concurrent
        // requests using the same refresh token can have only one successful rotation.
        if (tokens.revokeIfActive(tokenHash, now) != 1) {
            throw new InvalidRefreshTokenException();
        }

        CustomUserDetails user = users.findById(token.getUserId())
                .orElseThrow(InvalidRefreshTokenException::new);
        if (!user.isEnabled()) throw new InvalidRefreshTokenException();
        return user;
    }

    @Transactional
    public void revoke(String rawToken) {
        if (rawToken == null || rawToken.isBlank()) return;
        tokens.findByTokenHashAndRevokedAtIsNullAndExpiresAtAfter(hash(rawToken), OffsetDateTime.now())
                .ifPresent(RefreshToken::revoke);
    }

    private String hash(String token) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8));
            return java.util.HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 non disponible", exception);
        }
    }

    public static class InvalidRefreshTokenException extends RuntimeException {
        public InvalidRefreshTokenException() { super("Jeton de renouvellement invalide ou expiré"); }
    }
}
