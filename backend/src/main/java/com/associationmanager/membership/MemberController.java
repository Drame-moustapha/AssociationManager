package com.associationmanager.membership;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<MemberResponse> create(@PathVariable UUID associationId,
                                                  @Valid @RequestBody MemberRequest request) {
        MemberResponse created = service.create(associationId, request);
        return ResponseEntity.created(URI.create("/api/v1/associations/" + associationId
                + "/members/" + created.id())).body(created);
    }

    @GetMapping
    public List<MemberResponse> findAll(@PathVariable UUID associationId) {
        return service.findAll(associationId);
    }

    @GetMapping("/{memberId}")
    public MemberResponse findById(@PathVariable UUID associationId, @PathVariable UUID memberId) {
        return service.findById(associationId, memberId);
    }

    @PutMapping("/{memberId}")
    public MemberResponse update(@PathVariable UUID associationId, @PathVariable UUID memberId,
                                 @Valid @RequestBody MemberRequest request) {
        return service.update(associationId, memberId, request);
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<Void> delete(@PathVariable UUID associationId, @PathVariable UUID memberId) {
        service.delete(associationId, memberId);
        return ResponseEntity.noContent().build();
    }
}
