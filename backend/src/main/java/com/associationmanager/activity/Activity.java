package com.associationmanager.activity;

import com.associationmanager.association.Association;
import com.associationmanager.section.Section;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "activities")
public class Activity {
    @Id private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    private Section section;
    @Column(nullable = false, length = 180) private String title;
    @Column(columnDefinition = "text") private String description;
    @Column(name = "starts_at") private OffsetDateTime startsAt;
    @Column(length = 500) private String location;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20) private ActivityStatus status;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false) private OffsetDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false) private OffsetDateTime updatedAt;

    protected Activity() {}
    public Activity(Association association, Section section, String title, String description,
                    OffsetDateTime startsAt, String location) {
        this.id = UUID.randomUUID(); this.association = association; this.section = section;
        this.title = title; this.description = description; this.startsAt = startsAt;
        this.location = location; this.status = ActivityStatus.PLANNED;
    }
    public UUID getId() { return id; }
    public Association getAssociation() { return association; }
    public Section getSection() { return section; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public OffsetDateTime getStartsAt() { return startsAt; }
    public String getLocation() { return location; }
    public ActivityStatus getStatus() { return status; }
    public void setStatus(ActivityStatus status) { this.status = status; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
}
