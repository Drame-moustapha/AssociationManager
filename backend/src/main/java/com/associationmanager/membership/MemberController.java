package com.associationmanager.membership;

import com.associationmanager.security.authorization.SecurityExpressions;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/associations/{associationId}/members")
public class MemberController {
    private final MemberService service;

    public MemberController(MemberService service) { this.service = service; }

    @PostMapping
    @PreAuthorize("@securityExpressions.canAccessAssociation(#associationId, authentication)")
    public ResponseEntity<MemberResponse> create(@PathVariable("associationId") UUID associationId,
                                                  @Valid @RequestBody MemberRequest request) {
        MemberResponse created = service.create(associationId, request);
        return ResponseEntity.created(URI.create("/api/v1/associations/" + associationId
                + "/members/" + created.id())).body(created);
    }

    @GetMapping
    @PreAuthorize("@securityExpressions.canAccessAssociation(#associationId, authentication)")
    public List<MemberResponse> findAll(@PathVariable("associationId") UUID associationId) {
        return service.findAll(associationId);
    }

    @GetMapping("/{memberId}")
    @PreAuthorize("@securityExpressions.canAccessAssociation(#associationId, authentication)")
    public MemberResponse findById(@PathVariable("associationId") UUID associationId,
                                   @PathVariable("memberId") UUID memberId) {
        return service.findById(associationId, memberId);
    }

    @PutMapping("/{memberId}")
    @PreAuthorize("@securityExpressions.canAccessAssociation(#associationId, authentication)")
    public MemberResponse update(@PathVariable("associationId") UUID associationId,
                                 @PathVariable("memberId") UUID memberId,
                                 @Valid @RequestBody MemberRequest request) {
        return service.update(associationId, memberId, request);
    }

    @DeleteMapping("/{memberId}")
    @PreAuthorize("@securityExpressions.canAccessAssociation(#associationId, authentication)")
    public ResponseEntity<Void> delete(@PathVariable("associationId") UUID associationId,
                                       @PathVariable("memberId") UUID memberId) {
        service.delete(associationId, memberId);
        return ResponseEntity.noContent().build();
    }
}
