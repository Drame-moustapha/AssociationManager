package com.associationmanager.section;

import com.associationmanager.association.Association;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "sections")
public class Section {
    @Id private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;
    @Column(nullable = false, length = 120)
    private String name;
    @Column(columnDefinition = "text")
    private String description;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    protected Section() {}
    public Section(Association association, String name, String description) {
        this.id = UUID.randomUUID(); this.association = association;
        this.name = name; this.description = description;
    }
    public UUID getId() { return id; }
    public Association getAssociation() { return association; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
