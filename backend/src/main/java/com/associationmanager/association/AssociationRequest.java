package com.associationmanager.association;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AssociationRequest(
        @NotBlank @Size(max = 160) String name,
        @Size(max = 5000) String description,
        @Email @Size(max = 254) String email,
        @Size(max = 40) String phone,
        @Size(max = 500) String address) {}
