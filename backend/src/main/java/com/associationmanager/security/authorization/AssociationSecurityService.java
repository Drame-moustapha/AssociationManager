package com.associationmanager.security.authorization;

import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AssociationSecurityService {
    private final PermissionEvaluator permissions;

    public AssociationSecurityService(PermissionEvaluator permissions) { this.permissions = permissions; }

    public boolean canAccess(UUID associationId, Authentication authentication) {
        return permissions.canAccessAssociation(associationId, authentication);
    }
}
