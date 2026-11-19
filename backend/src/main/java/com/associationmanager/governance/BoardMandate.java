package com.associationmanager.governance;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "board_mandates")
public class BoardMandate {
    @Id private UUID id;
    @Column(name = "association_id", nullable = false) private UUID associationId;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;
    @Column(name = "start_date", nullable = false) private LocalDate startDate;
    @Column(name = "end_date", nullable = false) private LocalDate endDate;

    protected BoardMandate() {}
    public BoardMandate(UUID associationId, Board board, LocalDate startDate, LocalDate endDate) {
        this.id = UUID.randomUUID(); this.associationId = associationId;
        this.board = board; this.startDate = startDate; this.endDate = endDate;
    }
    public UUID getId() { return id; }
    public Board getBoard() { return board; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
}
