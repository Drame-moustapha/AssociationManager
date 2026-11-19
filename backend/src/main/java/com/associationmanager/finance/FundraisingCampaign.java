package com.associationmanager.finance;

import com.associationmanager.association.Association;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "fundraising_campaigns")
public class FundraisingCampaign {
    @Id private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;
    @Column(nullable = false, length = 180) private String title;
    @Column(columnDefinition = "text") private String description;
    @Column(name = "target_amount", nullable = false, precision = 12, scale = 2) private BigDecimal targetAmount;
    @Column(nullable = false, length = 3) private String currency;
    @Column(name = "ends_on") private LocalDate endsOn;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20) private FundraisingStatus status;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false) private OffsetDateTime createdAt;

    protected FundraisingCampaign() {}
    public FundraisingCampaign(Association association, String title, String description,
                               BigDecimal targetAmount, String currency, LocalDate endsOn) {
        this.id = UUID.randomUUID(); this.association = association; this.title = title;
        this.description = description; this.targetAmount = targetAmount;
        this.currency = currency.toUpperCase(java.util.Locale.ROOT); this.endsOn = endsOn;
        this.status = FundraisingStatus.OPEN;
    }
    public UUID getId() { return id; }
    public Association getAssociation() { return association; }
    public String getTitle() { return title; }
    public BigDecimal getTargetAmount() { return targetAmount; }
    public String getCurrency() { return currency; }
    public LocalDate getEndsOn() { return endsOn; }
    public FundraisingStatus getStatus() { return status; }
    public void setStatus(FundraisingStatus status) { this.status = status; }
}
