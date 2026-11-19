package com.associationmanager.governance;

import com.associationmanager.association.Association;
import com.associationmanager.section.Section;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "boards")
public class Board {
    @Id private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    private Section section;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BoardType type;
    @Column(nullable = false, length = 160)
    private String name;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    protected Board() {}
    public Board(Association association, Section section, BoardType type, String name) {
        this.id = UUID.randomUUID(); this.association = association; this.section = section;
        this.type = type; this.name = name;
    }
    public UUID getId() { return id; }
    public Association getAssociation() { return association; }
    public Section getSection() { return section; }
    public BoardType getType() { return type; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
