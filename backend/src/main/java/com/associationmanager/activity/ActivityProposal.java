package com.associationmanager.activity;

import com.associationmanager.membership.Member;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "activity_proposals")
public class ActivityProposal {
    @Id private UUID id;
    @Column(name = "association_id", nullable = false) private UUID associationId;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member proposer;
    @Column(nullable = false, length = 180) private String title;
    @Column(columnDefinition = "text", nullable = false) private String description;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20) private ProposalStatus status;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false) private OffsetDateTime createdAt;
    @Column(name = "reviewed_at") private OffsetDateTime reviewedAt;

    protected ActivityProposal() {}
    public ActivityProposal(UUID associationId, Member proposer, String title, String description) {
        this.id = UUID.randomUUID(); this.associationId = associationId; this.proposer = proposer;
        this.title = title; this.description = description; this.status = ProposalStatus.PENDING;
    }
    public UUID getId() { return id; }
    public UUID getAssociationId() { return associationId; }
    public Member getProposer() { return proposer; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public ProposalStatus getStatus() { return status; }
    public void review(ProposalStatus status, OffsetDateTime reviewedAt) {
        if (status == ProposalStatus.PENDING) throw new IllegalArgumentException("Une proposition doit être approuvée ou rejetée.");
        this.status = status; this.reviewedAt = reviewedAt;
    }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getReviewedAt() { return reviewedAt; }
}
