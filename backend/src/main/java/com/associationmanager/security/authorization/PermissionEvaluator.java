package com.associationmanager.security.authorization;

import com.associationmanager.security.authentication.CustomUserDetails;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class PermissionEvaluator {
    public boolean canAccessAssociation(UUID associationId, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || associationId == null) return false;
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof CustomUserDetails user)) return false;

        // Ordinary members are not association administrators. Until member-specific
        // resource permissions exist, only administrators can use association APIs.
        if ("ADMIN".equals(user.getRole())) return true;
        return "ASSOCIATION_ADMIN".equals(user.getRole())
                && associationId.equals(user.getAssociationId());
    }

    public boolean isAdmin(Authentication authentication) {
        return authentication != null && authentication.isAuthenticated()
                && authentication.getAuthorities().stream().anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
    }
}
