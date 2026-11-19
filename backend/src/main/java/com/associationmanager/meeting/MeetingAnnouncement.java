package com.associationmanager.meeting;

import com.associationmanager.association.Association;
import com.associationmanager.section.Section;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "meeting_announcements")
public class MeetingAnnouncement {
    @Id private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    private Section section;
    @Column(nullable = false, length = 180) private String title;
    @Column(columnDefinition = "text") private String agenda;
    @Column(name = "starts_at", nullable = false) private OffsetDateTime startsAt;
    @Column(length = 500) private String location;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false) private OffsetDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false) private OffsetDateTime updatedAt;

    protected MeetingAnnouncement() {}
    public MeetingAnnouncement(Association association, Section section, String title, String agenda,
                              OffsetDateTime startsAt, String location) {
        this.id = UUID.randomUUID(); this.association = association; this.section = section;
        this.title = title; this.agenda = agenda; this.startsAt = startsAt; this.location = location;
    }
    public UUID getId() { return id; }
    public Association getAssociation() { return association; }
    public Section getSection() { return section; }
    public String getTitle() { return title; }
    public String getAgenda() { return agenda; }
    public OffsetDateTime getStartsAt() { return startsAt; }
    public String getLocation() { return location; }
}
