package com.associationmanager.activity;

import com.associationmanager.membership.Member;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "activity_comments")
public class ActivityComment {
    @Id private UUID id;
    @Column(name = "association_id", nullable = false) private UUID associationId;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member author;
    @Column(columnDefinition = "text", nullable = false) private String content;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false) private OffsetDateTime createdAt;

    protected ActivityComment() {}
    public ActivityComment(UUID associationId, Activity activity, Member author, String content) {
        this.id = UUID.randomUUID(); this.associationId = associationId;
        this.activity = activity; this.author = author; this.content = content;
    }
    public UUID getId() { return id; }
    public UUID getAssociationId() { return associationId; }
    public Activity getActivity() { return activity; }
    public Member getAuthor() { return author; }
    public String getContent() { return content; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
}
