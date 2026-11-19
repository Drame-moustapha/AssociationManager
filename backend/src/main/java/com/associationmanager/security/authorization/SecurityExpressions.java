package com.associationmanager.security.authorization;

import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("securityExpressions")
public class SecurityExpressions {
    private final AssociationSecurityService associations;
    private final PermissionEvaluator permissions;

    public SecurityExpressions(AssociationSecurityService associations, PermissionEvaluator permissions) {
        this.associations = associations;
        this.permissions = permissions;
    }

    public boolean canAccessAssociation(UUID associationId, Authentication authentication) {
        return associations.canAccess(associationId, authentication);
    }

    public boolean isAdmin(Authentication authentication) { return permissions.isAdmin(authentication); }
}
