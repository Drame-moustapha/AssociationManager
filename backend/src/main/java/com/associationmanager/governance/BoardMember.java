package com.associationmanager.governance;

import com.associationmanager.membership.Member;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "board_members")
public class BoardMember {
    @Id private UUID id;
    @Column(name = "association_id", nullable = false) private UUID associationId;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "mandate_id", nullable = false)
    private BoardMandate mandate;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;
    @Column(nullable = false, length = 100)
    private String title;

    protected BoardMember() {}
    public BoardMember(UUID associationId, BoardMandate mandate, Member member, String title) {
        this.id = UUID.randomUUID(); this.associationId = associationId;
        this.mandate = mandate; this.member = member; this.title = title;
    }
    public UUID getId() { return id; }
    public BoardMandate getMandate() { return mandate; }
    public Member getMember() { return member; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}
